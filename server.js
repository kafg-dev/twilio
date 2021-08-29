const express = require('express');
const path =require('path');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname,'build')));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'build','index.html')); 
})

const twilioAccountSid='ACc26f98fbdea288ce911e3f04afeecb7f';
const twilioAuthToken='0846831976a41d4cb981a40a01c7d6fb';
const twilioApiKey='SK29cca639462fc9d28c1c00c35c5fa222';
const twiliApiSecret='TpVFoSOlDUyxOvgrFl8mQBERUTWY6CIH';

app.get('/api/token-service',  (req,res) => {
    const AccessToken = require('twilio').jwt.AccessToken;

    const VideoGrant = AccessToken.VideoGrant;

    const videoGrant = new VideoGrant();

    const {identity} = req.query;

    //create accesstoken which we will sign with twilio
    const token = new AccessToken(
        twilioAccountSid,
        twilioApiKey,
        twiliApiSecret,
        { identity: identity }
    )

    token.addGrant(videoGrant);

    const accessToken = token.toJwt();
    res.send({
        accessToken:accessToken
    });

});

app.get("/api/room-exists", (req, res) => {
    const { roomId } = req.query;
  
    const client = require("twilio")(twilioAccountSid, twilioAuthToken);
  
    client.video
      .rooms(roomId)
      .fetch()
      .then((room) => {
        if (room) {
          res.send({
            roomExists: true,
            room,
          });
        } else {
          res.send({
            roomExists: false,
          });
        }
      })
      .catch((err) => {
        res.send({
          roomExists: false,
          err,
        });
      });
  });



app.listen(process.env.PORT || 5000, (port) => {
    console.log('Server started');
});