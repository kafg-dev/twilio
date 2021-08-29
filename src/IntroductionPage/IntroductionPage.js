import React, { useEffect } from 'react';
import './IntroductionPage.css';
import logo from '../resources/images/logo.png';
import { connect } from 'react-redux';
import ConnectingButtons from './ConnectingButtons';
import { setIsRoomHost } from '../store/actions';


const IntoductionPage = ({setIsRoomHostAction}) => {
    //set roomhost to false whenever we go to introduction page
    useEffect(() => {
        setIsRoomHostAction(false);
    })
    return (
        <div className="introduction_page_container">
        <div className="introduction_page_panel">
            <img src={logo} className="introduction_page_image" alt="logo"/>
        <ConnectingButtons/>
        </div>
      </div>
    );
};

const mapDispatchToProps =(dispatch) => {
    return {
        setIsRoomHostAction : (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
    }
}

export default connect(null, mapDispatchToProps)(IntoductionPage);