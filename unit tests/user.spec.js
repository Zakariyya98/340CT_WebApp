
'use strict'

const mock = require('mock-fs')
const fs = require('fs')

const Accounts = require('../modules/user.js')
const Products = require('../modules/computers.js')
const Cart = require('../modules/shoppingcart.js')

describe('register()', () => {

	test('register a valid account', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		// eslint-disable-next-line max-len
		const register = await account.register('doej', 'password', '1 Gosford Street' , 'Coventry', 'England', 'CV1 1SA')
		expect(register).toBe(true)
		done()
	})

	test('register a duplicate username', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password', 'null' , 'null', 'null', 'null')
		await expect( account.register('doej', 'password' , 'null', 'null', 'null' ,'null') )
			.rejects.toEqual( Error('username "doej" already in use') )
		done()
	})

	test('error if blank username', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('', 'password', '1 Gosford Street' , 'Coventry', 'England', 'CV1 1SA') )
			.rejects.toEqual( Error('Missing Username') )
		done()
	})

	test('error if blank password', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('doej', '', '1 Gosford Street' , 'Coventry', 'England', 'CV1 1SA') )
			.rejects.toEqual( Error('Missing Password') )
		done()
	})

})

describe('uploadPicture()', () => {
	afterEach(() => {
		mock.restore()
	})

	test('upload picture', async done => {
		expect.assertions(1)
		mock({
			'DELLXPS.png': Buffer.from([1,6,7,3]),
			'public/avatars/': {}

		})

		const system = await new Products()
		await system.uploadpicture('DELLXPS.png', 'Dell.png')
		let result = false
		if(await fs.existsSync('public/avatars/Dell.png')) {
			result = true
		}
		expect(result).toBe(true)
		done()

	})
	// this would have to be done by mocking the file system
	// perhaps using mock-fs?
})

describe('login()', () => {
	test('log in with valid credentials', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password','1 Gosford Street' , 'Coventry', 'England', 'CV1 1SA')
		const valid = await account.login('doej', 'password')
		expect(valid).toBe(true)
		done()
	})

	test('invalid username', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password',' 1 Gosford Street' , 'Coventry', 'England', 'CV1 1SA')
		await expect( account.login('roej', 'password','1 Gosford Street' , 'Coventry', 'England', 'CV1 1SA') )
			.rejects.toEqual( Error('username "roej" not found') )
		done()
	})

	test('invalid password', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password', '1 Gosford Street' , 'Coventry', 'England', 'CV1 1SA')
		await expect( account.login('doej', 'bad') )
			.rejects.toEqual( Error('invalid password for account "doej"') )
		done()
	})

})

describe('Adding to a Database',() => {

	test('add to database', async done => {
		expect.assertions(1)
		const Product = await new Products()
		const addproduct = await Product.addtodb('Dell XPS', '£300', 'null', 'This is a laptop')
		expect(addproduct).toBe(true)
		done()
	})

	test('error if no name', async done => {
		expect.assertions(1)
		const Product = await new Products()
		await expect(Product.addtodb('', '£300', 'null', 'This is a laptop'))
			.rejects.toEqual(Error('Missing Product Name'))
		done()

	})

	test('error if no price', async done => {
		expect.assertions(1)
		const Product = await new Products()
		await expect(Product.addtodb('Dell XPS', '', 'null', 'This is a Laptop'))
			.rejects.toEqual(Error('Missing Product Price'))
		done()

	})
	//Picture will need a different test which should return true when a picture is uploaded
	//test('error if no picture', async done => {
	//expect.assertions(1)
	//const Product = await new Products()
	//await expect(Product.addtodb('Dell XPS', '£300', '', 'This is a Laptop'))
	//.rejects.toEqual(Error('Missing Product Picture'))
	//done()

	//})

	test('error if no description', async done => {
		expect.assertions(1)
		const Product = await new Products()
		await expect(Product.addtodb('Dell XPS', '£300', 'null', ''))
			.rejects.toEqual(Error('Missing Product Description'))
		done()

	})


})

describe('Adding to the shopping cart', () => {

	test('Item added to database', async done => {
		expect.assertions(1)
		const cart = await new Cart()
		await expect(cart.addtoCart('Quantity', ''))
			.rejects.toEqual(Error('Item not added to cart'))
		done()
	})

})

describe('Supplying Delivery Address', () => {

	test('Address Line 1 not supplied', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('Zak', 'admin', '' , 'Coventry', 'England', 'CV1 1SA'))
			.rejects.toEqual( Error('Missing Address Line 1'))
		done()
	})


	test('City not supplied', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('Zak', 'admin', '1 Gosford Street' , '', 'England', 'CV1 1SA') )
			.rejects.toEqual( Error('Missing City'))
		done()
	})

	test('Country not Supplied', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('Zak', 'admin', '1 Gosford Street' , 'Coventry', '', 'CV1 1SA') )
			.rejects.toEqual( Error('Missing Country'))
		done()
	})

	test('Post Code not Supplied', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('Zak', 'admin', '1 Gosford Street' , 'Coventry', 'England', '') )
			.rejects.toEqual( Error('Missing Post Code'))
		done()
	})

})
