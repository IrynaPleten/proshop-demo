import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'Admin User',
		email: 'admin@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Ihor Hnennyi',
		email: 'ihorhnennyi@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
	},
	{
		name: 'John Doe',
		email: 'john@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
	},
]

export default users
