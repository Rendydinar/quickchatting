import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { storage } from '../../firebase'; 
import defaultUserImg from '../../icons/defaultUser.png';
 
const Join = () => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');
	const [imgurl, setImgUrl] = useState(defaultUserImg);
	const [isLoadingUpload, setIsLoadingUpload] = useState(false);
	const [progress, setProgress] = useState(0);
	
	const handleChangeName = e => {
		let nameRex = e.target.value.replace(' ', '_');
		setName(nameRex)
	}

	const handleChangeRoom = e => {
		let roomRex = e.target.value.replace(' ', '_');
		setRoom(roomRex)
	}

	const handleChangeImageProfile = e => {
		if(e.target.files[0]) {
			setIsLoadingUpload(true);
			const img = e.target.files[0];
			// API STORAGE FIREABASE UNTUK MEMBUAT DIREKTORI/PENYIMPANA FILE
			const uploadTask = storage.ref(`quickchatting/${img.name}`).put(img);

			// event uploadTask
			uploadTask.on('state_changed', 
			(snapshot) => {
				// progress function .... / proses upload
				const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
				// set progress saat upload file 
				// berfungsi untuk memberikan proses upload file kepada user
				setProgress(progress);
			}, (error) => {
				// error function / error saat upload
				console.log(error);
			}, 
			() => {
				// comlete function/callback saat berhasil simpan file di storage firebase
				// API STORAGE FIREBASE UNTUK MENGAMBIL FILE YANG SUDAH DISIMPAN DIDALAM STORAGE FIBASE DENGAN URL
				storage.ref('quickchatting').child(img.name).getDownloadURL().then(url => {
					setImgUrl(`${url.replace("&token=", "?token=")}`);
					setIsLoadingUpload(false);
				})
			});
		}
	}

	return (                     
		<div className="flex items-center min-h-screen w-full bg-login-custom">
			<div className="w-full rounded shadow-2xl p-8 m-4 md:max-w-sm md:mx-auto">
			  <form className="w-full bg-transparent mb-4" >
				<div className="max-w-sm text-center overflow-hidden">
				  {isLoadingUpload === false ? (<img className="h-32 w-1/2 object-cover mx-auto rounded-full mb-4" src={imgurl.replace("?token=", "&token=")} alt="Sunset in the mountains" />) : (<progress className="text-customColor" value={progress} max="100" /> )}				  
					<div className="flex w-auto h-auto items-center justify-center bg-grey-lighter">
					    <label className="w-32 flex items-center px-2 py-2 text-blue rounded-lg tracking-wide font-bold border border-blue cursor-pointer">
					        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
					            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
					        </svg>
					        <span className="text-xs mr-2">Unggah Foto</span>
					        <input type='file' className="hidden" onChange={handleChangeImageProfile} />
					    </label>
					</div>
				</div>
			    <div className="mb-4">
			      <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="username">
			        Nama
			      </label>
			      <input 
			      	className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" 
			      	id="username" 
			      	type="text" 
			      	placeholder="Nama Anda..." 
			      	onChange={handleChangeName}
			      />
			    </div>
			    <div className="mb-6">
			      <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="room">
			        Room
			      </label>
			      <input 
			      	className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" 
			      	id="room" 
			      	type="text" 
			      	placeholder="Masukan Room..." 
			      	onChange={handleChangeRoom}
			      />
			      <p className="text-black text-xs italic">Pilih room yang sama dengan teman anda.</p>
			    </div>
			    <div className="flex items-center justify-center">
			      <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}&imgurl=${imgurl.replace("?token=", "&token=")}`}>
			        <button 
			        	className="bg-transparent shadow-md text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
			        	type="submit
						disabled={isLoadingUpload}
		        	">
			        Masuk
			        </button>
			      </Link>
			    </div>
			  </form>
			  <p className="w-full text-center text-black text-xs">
			    &copy;{new Date().getFullYear()} Waingapu Developer. All rights reserved.
			  </p>
			</div>
		</div>
	)	
}
export default Join;


