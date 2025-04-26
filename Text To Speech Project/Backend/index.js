import dotenv from "dotenv";
import { app } from "./src/app.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./.env" });
}

if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.PORT || 9000, () => {
    console.log(`\n ⚙️ Server is running at port : ${process.env.PORT} 🚀 \n`);
  });
}

export default app;
/*
curl --location 'localhost:9999/api/v1/convert/convertTextToSpeechDownload' \
--form 'text="This is a super thing you know"'
*/
