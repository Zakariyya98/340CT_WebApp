/* eslint-disable complexity */
'use strict'

const sqlite = require('sqlite-async')
const mime = require('mime-types')
const fs = require('fs-extra')

module.exports = class Systems {
// This will create the new products.db Database and the Table within the database.
	constructor(dbProducts = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbProducts)
			// eslint-disable-next-line max-len
			const sql = 'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price TEXT, picture TEXT, desc TEXT, op1 TEXT, op2 TEXT, op3 TEXT, op1tot TEXT, op2tot TEXT, op3tot TEXT, picture2 TEXT);'
			await this.db.run(sql)
			return this
		})()


	}
	// eslint-disable-next-line complexity
	// eslint-disable-next-line max-lines-per-function
	// eslint-disable-next-line max-params
	async addtodb(name, price, picture, desc, op1, op2, op3, op1tot, op2tot, op3tot, picture2) {
		try{
			if(name.length === 0) throw new Error('Missing Product Name')
			if(price.length === 0) throw new Error('Missing Product Price')
			//if(picture.length === 0) throw new Error('Missing Product Image')
			if(desc.length === 0) throw new Error('Missing Product Description')
			let sql = `SELECT COUNT(id) as records FROM products WHERE name="${name}"`
			// eslint-disable-next-line max-len
			sql = `INSERT INTO products(name, price, picture, desc, op1, op2, op3, op1tot, op2tot, op3tot, picture2) 
				   VALUES("${name}", "${price}","avatars/${picture}","${desc}", "${op1}","${op2}","${op3}","${op1tot}","${op2tot}","${op3tot}", "avatars/${picture2}")`
			await this.db.run(sql)
			return true

		}catch (err) {
			throw err
		}

	}

	async uploadpicture(path, name) {
		await fs.copy(path, `public/avatars/${name}`)
		//await fs.copy(path, `public/avatars/${picture2}`)
	}


	//async updatedb(name, price, picture, desc){
		//try{
			//if
		//}catch (err){
			//throw err
		//}
	//}


//This is a search feature for the database.
	//async search(userinp) {
		//try{
			//const sql = `SELECT name as name FROM products WHERE name="${userinp}";`
			//const data = await this.db.get(sql)
			//return data
		//} catch(err) {
			//throw err
		//}
	//}
}

// const dbProducts = new sqlite3.Database('products.db', err => {
// 	if (err) return console.error(err.message)
// 	// eslint-disable-next-line max-len
// 	const sql = 'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price TEXT, picture TEXT, desc TEXT)'
// 	console.log(sql)
// 	dbProducts.run(sql)
// })
