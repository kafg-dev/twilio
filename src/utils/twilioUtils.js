import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import {store} from '../store/store';
import {
    connect,
    LocalAudioTrack,
    LocalVideoTrack,
    LocalDataTrack
} from 'twilio-video';
import { setShowOverlay } from '../store/actions';

const audioConstraints = {
    video : false,
    audio:true
}

const videoConstraints = {
    audio : true,
    video:{
        width:640,
        height: 480
    }
}



export const getTokenFromTwilio = async (setAccessToken,identity) => {
    const randomId = uuidv4();

    console.log(identity);

    const response = await axios.get(
        `http://localhost:5000/api/token-service?identity=${randomId}${identity}`
    );

    const data = response.data;

    if (data.accessToken) {
        setAccessToken(data.accessToken);
    }
};

export const connectToRoom = async (accessToken,roomId = 'test-room', setRoom) => {
    const onlyWithAudio = store.getState().connectOnlyWithAudio;
    const constraints = onlyWithAudio ? audioConstraints : videoConstraints;

    navigator.mediaDevices.getUserMedia(constraints).then(async (stream) => {
        let tracks;
        //create datatrack for messges
        const audioTrack = new LocalAudioTrack(stream.getAudioTracks()[0]);

        let videoTrack;

        if(!onlyWithAudio) {
            videoTrack = new LocalVideoTrack(stream.getVideoTracks()[0]);
            tracks = [audioTrack,videoTrack]
        } else {
            tracks = [audioTrack]
        }

        const room = await connect(accessToken, {
            name:roomId,
            tracks
        });

        console.log('successfully connected w/ twilio');
        console.log(room);
        setRoom(room);
        store.dispatch(setShowOverlay(false));

    }).catch((err) => {
        console.log('Error occured when trying yo get an access to local devices');
        console.log(err);
    })
};

export const checkIfRoomExists = async (roomId) => {
    const response = await axios.get(
        `http://localhost:5000/api/room-exists?roomId=${roomId}`
    );

    return response.data.roomExists;
}