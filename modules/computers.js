'use strict'

const sqlite = require('sqlite-async')

module.exports = class Systems {
// This will create the new products.db Database and the Table within the database.
	constructor(dbProducts = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbProducts)
			// eslint-disable-next-line max-len
			const sql = 'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price TEXT, picture TEXT, desc TEXT);'
			await this.db.run(sql)
			return this
		})()


	}
	// eslint-disable-next-line complexity
	async addtodb(name, price, picture, desc) {
		try{
			if(name.length === 0) throw new Error('Missing Product Name')
			if(price.length === 0) throw new Error('Missing Product Price')
			if(picture.length === 0) throw new Error('Missing Product Image')
			if(desc.length === 0) throw new Error('Missing Product Description')
			let sql = `SELECT COUNT(id) as records FROM products WHERE name="${name}"`
			sql = `INSERT INTO products(name, price, picture, desc) VALUES("${name}", "${price}","${picture}","${desc}")`
			await this.db.run(sql)
			return true

		}catch (err) {
			throw err
		}

	}


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
