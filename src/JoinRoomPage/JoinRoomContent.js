import React, {useState} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setConnectOnlyWithAudio, setIdentity, setRoomId } from '../store/actions';
import JoinRoomInputs from './JoinRoomInputs';
import OnlyWithAudioCheckbox from './OnlyWithAudioCheckbox';
import RoomNotFoundMessage from './RoomNotFoundMessage';
import JoinRoomButtons from './JoinRoomButtons';
import {v4 as uuidv4} from 'uuid';
import { checkIfRoomExists } from '../utils/twilioUtils';

const JoinRoomContent = (props) => {

    const {isRoomHost,setConnectOnlyWithAudioAction,connectOnlyWithAudio,setRoomIdAction, setIdentityAction,setShowLoadingOverlay, } = props;

    const [roomIdValue,setRoomIdValue] = useState("");
    const [nameValue,setNameValue] = useState("");
    const [showRomNotFoundMessage,setShowRomNotFoundMessage]=useState(false);

    const history = useHistory();

    const handleJoinToRoom = async () => {
       setIdentityAction(nameValue);
       if(!isRoomHost) {
           //check if room exist and if yes join
           setShowLoadingOverlay(true);
          const roomExists = await checkIfRoomExists(roomIdValue); 
          setShowLoadingOverlay(false);
          if (roomExists) {
            setRoomIdAction(roomIdValue);
            history.push("/room");
          } else {
              setShowRomNotFoundMessage(true);
          }
       } else {
           setRoomIdAction(uuidv4());
           history.push('/room'); 
       }
    }

    return (
        <>
            <JoinRoomInputs
                roomIdValue = {roomIdValue}
                setRoomIdValue = {setRoomIdValue}
                nameValue = {nameValue}
                setNameValue = {setNameValue}
                isRoomHost={isRoomHost}

            />
            <OnlyWithAudioCheckbox
                setConnectOnlyWithAudio={setConnectOnlyWithAudioAction}
                connectOnlyWithAudio={connectOnlyWithAudio}
            />
            <RoomNotFoundMessage showRomNotFoundMessage={showRomNotFoundMessage}
            />
            <JoinRoomButtons
                isRoomHost={isRoomHost} 
                handleJoinToRoom={handleJoinToRoom}
            />
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return{
        setConnectOnlyWithAudioAction: (onlyWithAudio) => 
        dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
        setIdentityAction:(identity) => dispatch(setIdentity(identity)),
        setRoomIdAction:(id) => dispatch(setRoomId(id))
    };
};

const mapStoreStateProps = (state) => {
    return {
        ...state,
    };
}

export default connect(mapStoreStateProps,mapDispatchToProps)(JoinRoomContent);