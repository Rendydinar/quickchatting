import React from 'react'

export default function Input({ message, onWrite, sendMessage, loadingSendMsg }) {
	return (
		<div>
			<form className="form-custom">
				<textarea 
				  rows="1"
				  className="input-custom bg-transparent text-base text-white p-4"
				  type="text"
				  placeholder="Tulis pesan..."
				  value={message}
				  onChange={(e) => onWrite(e.target.value)}
				></textarea>
				<button 
				  className="sendButton-custom" 
				  onClick={(e) => sendMessage(e)}
				  disabled={loadingSendMsg}
				>Kirim</button>
			</form>
		</div>
	)
}
 