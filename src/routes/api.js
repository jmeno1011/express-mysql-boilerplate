const express = require('express');
const route = express.Router();

const admin = require("firebase-admin");
const serviceAccount = require("../../google-services.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

route.post('/send', (req, res)=>{
  const { title, text, token } = req.body;
  // 직접 토큰 복붙 했던부분
  // let target_token = 
  // // "dqpDiPHVj3FlnloRR5-KpM:APA91bEjHTzSp3VDafbNeEluoQYBT4yZlzUW9BFlbSosIuHGmylMoaKOjG8MSSIG7X_Kws0Z_iXs9rN0j3gjehSgp-OFtoilj4S_HYTdb8ZfaW0QVmxQfpgmpl_5UbN5vM2r8mO4C7UT"
  // "dG08ZiDeBmX-0OPnyapK1X:APA91bHXe-UNGWq6-wthmJs5UC6rz-mXH30avisUVphCNG6QzEWKpIAUVqajUw4-YmzdM_ZOPJNbTIm6pEyaVK6ZSC1TtlaEvggkanl2UWFf4MWZsAWNyh_UgP5GXlSGYdjKDs0Hil7w"
  admin.messaging()
    .sendToDevice(
      [token],
      {
        data:{
          text: text
        },
        notification:{
          title: title,
          body: text
        }
      },
      {
        // Required for background/terminated app state messages on iOS
        // contentAvailable: true,
        // Required for background/terminated app state messages on Android
        priority: "high",
      }
    ).then(response=>{
      if (response.failureCount) {
        console.log("Failed", response.results[0].error);
      } else {
        console.log("Success");
        return res.status(200).send({ msg: "성공" });
      }
    })
})

module.exports = route;
