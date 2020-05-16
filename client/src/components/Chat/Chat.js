import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
import isEqual from 'react-fast-compare';

let socket;

const Chat = ({ location }) => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [imgurl, setImgurl] = useState('');
	const [users, setUsers] = useState([]);
	const [message, setMessage] = useState('');	
	const [messages, setMessages] = useState([]);
	const [userOnWrite, setUserOnWrite] = useState({user: '', text: ''});
	// const ENDPOINT = 'https://your_server.herokuapp.com/'; // ketika mode production
	const ENDPOINT = 'localhost:5000/';

	useEffect(() => {
		// ambil nama dan room dari query string pada url
		let search = location.search; 
		const {name, room, imgurl} = queryString.parse(search);
		socket = io(ENDPOINT);
		setName(name);
		setRoom(room);
		setImgurl(imgurl);

		// emit socket pada event join
		socket.emit('join', { name, room, imgurl }, () => {

		});

		return () => {
			// emit socket pada event disconnect
			socket.emit('disconnect');
			
			// off, socket/remove socket
			socket.off(); 
		}

	}, [ENDPOINT, location.search]);

	useEffect(() => {
		socket.on('message', (message) => {
			// menambahkan log pesan
			setMessages(messages => [...messages, message ]);
			setUserOnWrite({user: '', text: ''});
		});
		
		socket.on("roomData", ({ users }) => {
    	  setUsers(users);
   		});

		socket.on('onWrite', (msg) => {
			setUserOnWrite(msg);
		});

		socket.on('onEndWrite', (msg) => {
			setUserOnWrite({user: '', text: ''});			
		});
		
	}, []);

	useEffect(() => {
		if(message.length > 0) {
			socket.emit('onWrite', () => {
			});
		} else {
			socket.emit('onEndWrite', () => {
			});
		}
	}, [message]);

	// Fungsi untuk menghadle pengiriman pesan
	const sendMessage =(e) => {
		e.preventDefault();

		if(message) {
			socket.emit('sendMessage', message, () => { 
				setMessage('');
			});
		}
	};	

	// Fungsi untuk menghandle saat user sedang menulis
	const onWrite = (e) => {
		setMessage(e);
	};

	return (
		<div className="h-screen outerContainer-custom ">
			<div className="container-custom shadow-2xl bg-transparent">
				<MemoizedInfoBarComponent room={room} imgurl={imgurl} />
				<Messages messages={messages} name={name} onUserWrite={userOnWrite} />
				
				<Input message={message} onWrite={onWrite} sendMessage={sendMessage} />
			</div>
			<MemoizedTextContainerComponent users={users} />
		</div>
	)	
}

export default Chat;

const MemoizedInfoBarComponent = React.memo(InfoBar, isEqual);
const MemoizedTextContainerComponent = React.memo(TextContainer, isEqual);






