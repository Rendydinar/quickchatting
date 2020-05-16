import React from 'react'
import parse from 'html-react-parser';

export default function Message({ message, name}) {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(message.user === trimmedName) {
  	isSentByCurrentUser = true;  	
  }

  return (
  	isSentByCurrentUser
  	  ? (
  	  	<div className="messageContainer-custom justifyEnd-custom">
  	  	  <p className="sentText-custom pr-10-custom">{trimmedName.replace(' ', '_')}</p>
  	  	  <div className="messageBox-custom backgroundBlue-custom">
  	  	  	<p className="messageText-custom text-base colorWhite-custom">{parse(message.text)}</p>
  	  	  </div>
  	  	</div>
  	  )
  	  : (
  	  	<div className="messageContainer-custom justifyStart-custom">
  	  	  <div className="messageBox-custom backgroundBlue-custom">
  	  	  	<p className="messageText-custom text-base colorWhite-custom">{parse(message.text)}</p>
  	  	  </div>
  	  	  <p className="sentText-custom pl-10-custom">{message.user.replace(' ', '_')}</p>
  	  	</div>
  	  )
  )
}


