let users = [];

/**
 * Fungsi menambahkan user
 * Jika nama user sudah ada, user tidak akan ditambah
 * Jika nama user belum ada, user akan ditambah
 * Mengembalikan pesan erorr atau object array user
 */
const addUser = ({ id, name, room, imgurl }) => {
	name = name.trim().toLowerCase();
	room = room.trim().toLowerCase();

	const existingUser = users.find((user) => user.room === room && user.name === name);

	if(existingUser) {
		return {
			error: 'Nama Pengguna Sudah Digunakan'
		};
	}

	const user = { id, name, room, imgurl };

	users.push(user);

	console.log(user);

	return { user };
}

/**
 * Fungsi untuk meremove user
 * Jika id user ditemukan, user akan di remove
 */
const removeUser = (id) => {
	const index = users.findIndex((user) => user.id === id);

	if(index !== -1) {
		return users.splice(index, 1)[0];
	}
}

/**
 * Fungsi untuk mencari user berdasarkan id
 */
const getUser = (id) => users.find((user) => user.id === id); 

/**
 * Fungsi untuk mencari user berdasarkan room
 */
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };

