import React from 'react'
import closeIcon from '../../icons/closeIcon.png';

export default function InfoBar({ room, imgurl }) {
	return (
		<div className="infoBar-custom">
			<div className="leftInnerContainer-custom">
				{(<img className="onlineIcon-custom object-cover h-10 w-10 rounded-full" src={imgurl.replace('?token=', '&token=').replace("/quick-chatting/", "/quick-chatting%2F")} alt="online image" />)}
				<h3 className="font-bold text-xl">{room.replace('_', ' ')}</h3>
			</div>
			<div className="rightInnerContainer-custom">
				<a href="/"><img src={closeIcon} alt="close image" /></a>
			</div>			
		</div>
	)
}
