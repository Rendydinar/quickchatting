const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const { linkDetection } = require('./utils');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Allow CORS Socket
io.set('origins', '*:*');

//saat user berhasil terhubung 
io.on('connection', (socket) => {

  // socket join event	
  socket.on('join', ({ name, room, imgurl }, callback) => {
  	const { error, user } = addUser({ id: socket.id, name, room, imgurl });

  	if(error) return callback(error);

  	// kirim pesan pada socket event message 
  	socket.emit('message', { user: 'bot', text: `${user.name}, Selamat datang di room ${user.room}` });
  	// broadcast pesan berdasarkan room pada socket event message
  	socket.broadcast.to(user.room).emit('message', { user: 'bot', text: `${user.name} telah bergabung!` })

    // tambahkan user 
  	socket.join(user.room);  

    io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

  	callback();
  });

  // socket sendMessage event
  socket.on('sendMessage', (message, callback) => {
    // mencari apakah pesan berupa link atau tidak
    const urls = linkDetection(message);
    // jika ditemukan pesan berupa link
    if(urls) {
      // bungkus pesan tersebut kedalam tag a html
      for (let i = 0, il = urls.length; i < il; i++) {  
        let href = `<a href="${urls[i]}" target="_blank" rel="noopener">${urls[i]}</a>`
        message = message.replace(urls[i], href);
      } 
    }

    // cari user berdasarkan id socket
  	const user = getUser(socket.id); 
    // kirim pesan ke room spesifik pada socket event message
    io.to(user.room).emit('message', { user: user.name, text: message });
    // kirim data daftar user pada spesifik room ke room spesifik pada socket event roomData
    io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

    callback();
  });

  /**
   * Ketika user refresh, socketnya akan dihapus kemudian dibuat socket barunya.
   * Dengan hal ini user terlihat tidak harus tersambung ulang sebagai user baru ketika melakukan refresh (Berlaku saat develop)
   * Socket event disconnect
   */
  socket.on('disconnect', () => {
    // remove user berdasarkan id socket
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'bot', text: `${user.name} meninggalkan room`} );
    }
  });

  /**
   * Socket event onWrite
   * Event saat pengguna sedang menuliskan pesan
   */
  socket.on('onWrite', () => {
    // cari user berdasarkan id socket
    const user = getUser(socket.id);
    socket.broadcast.to(user.room).emit('onWrite', { user: 'bot', text: `${user.name} ...` });
  });

  /**
   * Socket event onEndWrite
   * Event saat pengguna telah menuliskan pesan
   */
  socket.on('onEndWrite', () => {
    // cari user berdasarkan id socket
    const user = getUser(socket.id);
    socket.broadcast.to(user.room).emit('onEndWrite', { user: 'bot', text: `${user.name} ...` });
  })

});

// route
app.use(router);

// Allow Express App CORD
app.use(cors());

// listen
server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
})













  







