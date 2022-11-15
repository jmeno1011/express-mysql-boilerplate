const express = require('express');
const route = express.Router();

const admin = require("firebase-admin");
const serviceAccount = require("../../google-services.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

route.post('/send', (req, res)=>{
  const { title, text, token } = req.body;
  // 직접 토큰 복붙하는 곳
  // let target_token = ""
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
