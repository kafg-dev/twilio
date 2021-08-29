import React, {useEffect} from 'react';
import ParticipantsSection from './ParticipantsSection/ParticipantsSection';
import VideoSection from './VideoSection/VideoSection';
import ChatSection from './ChatSection/ChatSection';
import {connect} from 'react-redux';
import { setTwilioAccessToken } from '../store/actions';
import { getTokenFromTwilio } from '../utils/twilioUtils';
import './RoomPage.css';

const RoomPage = (props) => {

    const {identity,setTwilioAccessTokenAction} = props;

    useEffect(() => {
        getTokenFromTwilio(setTwilioAccessTokenAction,identity);
    }, []);

    return (
        <div className='room_container'>
            <ParticipantsSection/>
            <VideoSection/>
            <ChatSection/>
        </div>
    );
};

const mapToStoreStateProps = (state) => {
    return {
        ...state,
    }
}

const mapActionsToProps = (dispatch) => {
    return{
        setTwilioAccessTokenAction: (token) => dispatch(setTwilioAccessToken(token)),
    }
}

export default connect(mapToStoreStateProps,mapActionsToProps)(RoomPage);