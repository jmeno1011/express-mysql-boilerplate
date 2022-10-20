const express = require('express');
const logger = require('../config/winston');
const { authenticateAccessToken } = require('../models/jwt');
const route = express.Router();
const admin = require("firebase-admin");
const serviceAccount = require("../../google-services.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

route.get('/payload', (req, res) => {
  const id = req.decoded.id;
  return res
    .status(200)
    .send({ msg: '로그인 된 상태입니다.', data: { id: id } });
});

route.post('/send', (req, res)=>{
  const { title, text } = req.body;
  let target_token = "ewwbk53vtkSHgvaYILwjkO:APA91bFzJm2u2Bb-ebZqKRWwreTaQ0p7qEc5ZmzOEoQsEM6vv_D0eS08HGvF13WgtT8vsQoyeYuUkHB6uFTuKirS7uWUNH-r6u5UNGzXePAP0EWflyXz2wVzP4-6_-XuAbw8abXnSldO"
  admin.messaging()
    .sendToDevice(
      [target_token],
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
