'use strict'

const sqlite = require('sqlite-async')


module.exports = class Systems {

	constructor(dbProducts = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbProducts)
			// eslint-disable-next-line max-len
			const sql = 'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price TEXT, picture TEXT, desc TEXT);'
			await this.db.run(sql)
			return this
		})()

	}

	async search(userinp) {
		try{
			const sql = `SELECT name as name FROM products WHERE name="${userinp}";`
			const data = await this.db.get(sql)
			return data
		} catch(err) {
			throw err
		}
	}
}

// const dbProducts = new sqlite3.Database('products.db', err => {
// 	if (err) return console.error(err.message)
// 	// eslint-disable-next-line max-len
// 	const sql = 'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price TEXT, picture TEXT, desc TEXT)'
// 	console.log(sql)
// 	dbProducts.run(sql)
// })
