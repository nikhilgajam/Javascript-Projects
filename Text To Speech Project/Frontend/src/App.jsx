import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [submittedText, setSubmittedText] = useState([]);

  const handleButtonClick = () => {
    if (inputText.trim() !== '') {
      setSubmittedText([...submittedText, inputText]);
      setInputText('');
    }
  };

  const handleDownloadButton = async (text) => {
    try {
      const response = await axios.post(`http://localhost:9999/api/v1/convert/convertTextToSpeechDownload`,
        { text },
        { responseType: 'blob' }
      );

      console.log(">>>>Download", response);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${text}.mp3`); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Error downloading file");
      console.error('Error downloading the file:', error);
    }
  };

  const handleEmailButton = async (text) => {
    try {
      const email = prompt("Please enter the email address to send the audio file to:");
      if (!email) {
        alert("Email address is required.");
        return;
      }
      const response = await axios.post(`http://localhost:9999/api/v1/convert/convertTextToSpeechEmail`,
        { text, email },
      );

      console.log(">>>>Email", response);
      alert("Email sent successfully!\n" + JSON.stringify(response.data));
    } catch (error) {
      alert("Error sending email");
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <>
      <div style={{ padding: '20px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text here"
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={handleButtonClick} style={{ padding: '5px 10px' }}>
          Submit
        </button>
      </div>
      <div style={{ padding: '20px' }}>
        {submittedText.map((text, index) => (
          <div key={index} style={{ margin: '5px 0', padding: '10px', border: '1px solid #eee' }}>
            {text}
            <br /><br />
            <button
              onClick={() => handleDownloadButton(text)}
              style={{ marginLeft: '10px', padding: '5px 10px' }}
            >
              Download
            </button>
            <button
              onClick={() => handleEmailButton(text)}
              style={{ marginLeft: '10px', padding: '5px 10px' }}
            >
              Send Email
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
