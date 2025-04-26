import { Router } from 'express';
import { convertTextToSpeechDownload, convertTextToSpeechEmail } from '../controllers/convert.controllers.js';
import multer from 'multer';

const router = Router();
const upload = multer();

// Public Routes
router.route('/convertTextToSpeechDownload').post(upload.none(), convertTextToSpeechDownload);
router.route('/convertTextToSpeechEmail').post(upload.none(), convertTextToSpeechEmail);

export default router;
