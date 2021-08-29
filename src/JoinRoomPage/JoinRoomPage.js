import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setIsRoomHost } from '../store/actions';
import JoinRoomTitle from './JoinRoomTitle';
import JoinRoomContent from './JoinRoomContent';
import LoadingOverlay from './LoadingOverlay';
import './JoinRoomPage.css';


const JoinRoomPage = (props) => {
    const { setIsRoomHostAction, isRoomHost } = props;

    const search = useLocation().search;

    useEffect(() => {
        const isRoomHost = new URLSearchParams(search).get("host");
        if(isRoomHost) {
            //change information about it in store
            setIsRoomHostAction(true); 
        }
    }, []);

    const [showLoadingOverlay,setShowLoadingOverlay] = useState(false);

    return <div className='join_room_page_container'>
        <div className='join_room_page_panel'>
            <JoinRoomTitle isRoomHost={isRoomHost}/>
            <JoinRoomContent setShowLoadingOverlay={setShowLoadingOverlay}/>
            {showLoadingOverlay && <LoadingOverlay/>}
        </div>
        </div>;
 
};

const mapStoreStateProps = (state) => {
    return {
        ...state,
     };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setIsRoomHostAction : (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
    }
}

export default connect(mapStoreStateProps,mapDispatchToProps)(JoinRoomPage);