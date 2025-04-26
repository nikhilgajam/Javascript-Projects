import { asyncHandler } from '../utils/asyncHandler.js';
import { ErrorResponse } from '../utils/ErrorResponse.js';
import { SuccessResponse } from '../utils/SuccessResponse.js';
import gTTS from 'gtts';
import path from 'path';
import https from 'https';
import fs from 'fs';
import nodemailer from 'nodemailer';
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const convertTextToSpeechDownload = asyncHandler(async (req, res, next) => {
  const { text = '' } = req?.body;

  if (!text) {
    throw new ErrorResponse(400, 'Text is required.');
  }

  try {
    const gtts = new gTTS(text, 'en', { agent: httpsAgent });
    const filePath = path.join(`${process.cwd()}/temp`, `speech-${Date.now()}.mp3`);

    // Save the MP3 file
    gtts.save(filePath, (err) => {
      if (err) {
        console.error('Error saving MP3 file:', err);
        return reject(new ErrorResponse(500, 'Failed to generate MP3 file.'));
      }
      res.sendFile(path.resolve(filePath), (err) => {
        if (err) {
          console.error('Error sending MP3 file:', err);
          next(new ErrorResponse(500, 'Failed to send MP3 file.'));
        }
      });
    });
  } catch (error) {
    console.error('Error generating speech:', error);
    throw new ErrorResponse(500, 'Error converting text to speech.');
  }
});

const convertTextToSpeechEmail = asyncHandler(async (req, res, next) => {
  const { text = '', email = '' } = req?.body;

  if (!text) {
    throw new ErrorResponse(400, 'Text is required.');
  }

  try {
    const gtts = new gTTS(text, 'en', { agent: httpsAgent });
    const filePath = path.join(`${process.cwd()}/temp`, `speech-${Date.now()}.mp3`);

    // Save the MP3 file
    gtts.save(filePath, (err) => {
      if (err) {
        console.error('Error saving MP3 file:', err);
        return reject(new ErrorResponse(500, 'Failed to generate MP3 file.'));
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'email-address',
          pass: 'password',
        },
      });

      const mailOptions = {
        from: 'email-address',
        to: email,
        subject: 'Your Text-to-Speech MP3 File',
        text: 'Please find the attached MP3 file generated from your text.',
        attachments: [
          {
            filename: path.basename(filePath),
            path: filePath,
          },
        ],
      };

      transporter.sendMail(mailOptions);

      // Respond to the client
      res.status(200).json(new SuccessResponse(200, 'MP3 file sent to your email successfully.'));
    });
  } catch (error) {
    console.error('Error generating speech:', error);
    throw new ErrorResponse(500, 'Error converting text to speech.');
  }
});

export {
  convertTextToSpeechDownload,
  convertTextToSpeechEmail,
};
