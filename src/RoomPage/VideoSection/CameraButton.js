import React , {useState} from 'react';
import CameraButtonImg from '../../resources/images/camera.svg';
import CameraButtonImgOff from '../../resources/images/cameraOff.svg';

const CameraButton = () => {

    const [isLocalVideoTrackDisabled,setIsLocalVideoTrack] = useState(false);
    const handleCameraButtonPressed = () => {
        isLocalVideoTrackDisabled ? startVideo() : stopVideo();
        setIsLocalVideoTrack(!isLocalVideoTrackDisabled);
    }

    const startVideo = () => {
        //stream camera
    }

    const stopVideo = () => {
        //stop camera
    }

    return <div className='video_button_container'>
        <img src={isLocalVideoTrackDisabled ? CameraButtonImgOff : CameraButtonImg}
        alt="camera"
        onClick={handleCameraButtonPressed}
        className="video_button_image"
         />   
        </div>;
    
};

export default CameraButton;