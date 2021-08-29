import React from 'react';
import './IntroductionPage.css';
import logo from '../resources/images/logo.png';
import ConnectingButtons from './ConnectingButtons';


const IntoductionPage = () => {
    return (
        <div className="introduction_page_container">
        <div className="introduction_page_panel">
            <img src={logo} className="introduction_page_image" alt="logo"/>
        <ConnectingButtons/>
        </div>
      </div>
    );
};

export default IntoductionPage;