'use strict'

const sqlite = require('sqlite-async')

module.exports = class Cart {
	constructor(dbCart = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbCart)
			const sql = 'CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price TEXT, op1 TEXT DEFAULT "N/A" , op1tot TEXT, op2 TEXT DEFAULT "N/A", op2tot TEXT, op3 TEXT DEFAULT "N/A", op3tot TEXT);'
			await this.db.run(sql)
			return this
		})()
	}

	// eslint-disable-next-line max-params
	async addtoCart(name, price, op1, op1tot, op2, op2tot, op3, op3tot, picture) {
		try{
			let sql = `SELECT COUNT(id) as records FROM cart WHERE name="${name}"`
			// eslint-disable-next-line max-len
			sql = `INSERT INTO cart(name, price, op1, op1tot, op2, op2tot, op3, op3tot, picture) VALUES("${name}", "${price}", "${op1}","${op1tot}","${op2}","${op2tot}","${op3}","${op3tot}", "${picture}")`
			await this.db.run(sql)
			//return true

		}catch (err) {
			throw err
		}
	}


	async removefromCart(id) {
		try{
			let sql = `SELECT COUNT(id) as records FROM cart WHERE id="${id}"`
			sql = `DELETE FROM cart WHERE id ="${id}"`
			await this.db.run(sql)
			return true
		}catch (err) {
			//throw err
		}
	}
}
