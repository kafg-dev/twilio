import React from 'react';

const RoomNotFoundMessage = ({showRomNotFoundMessage}) => {
    return (
        <div className='room_not_found_container'>
        {showRomNotFoundMessage && (
            <p className="room_not_found_paragraph">
                Room not found. Please try again.
            </p>
        )}  
        </div>
    );
};

export default RoomNotFoundMessage;