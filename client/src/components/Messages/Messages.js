import React from 'react'
import Message from './Message/Message'
import ScrollBottom from 'react-scroll-to-bottom'

export default function Messages({messages, name , onUserWrite}) {
  return (
  	<ScrollBottom className="messages-custom">	
  		{messages.map((message, i) => (
  			<div key={i}><Message message={message} name={name}/></div>
  		))}	

  		{
  			onUserWrite.text.length > 0 ? (
		  	  	<div className="messageContainer-custom justifyStart-custom">
		  	  	  <div className="messageBox-custom backgroundBlue-custom">
		  	  	  	<p className="messageText-custom text-base colorWhite-custom">{onUserWrite.text}</p>
		  	  	  </div>
		  	  	  <p className="sentText-custom pl-10-custom">{onUserWrite.user}</p>
		  	  	</div>
  			) : ''
  		}
	</ScrollBottom>
  )
}