
'use strict'

const Accounts = require('../modules/user.js')
const Products = require('../modules/computers.js')
const Cart = require('../modules/shoppingcart.js')

describe('register()', () => {

	test('register a valid account', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		const register = await account.register('doej', 'password')
		expect(register).toBe(true)
		done()
	})

	test('register a duplicate username', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password')
		await expect( account.register('doej', 'password') )
			.rejects.toEqual( Error('username "doej" already in use') )
		done()
	})

	test('error if blank username', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('', 'password') )
			.rejects.toEqual( Error('missing username') )
		done()
	})

	test('error if blank password', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await expect( account.register('doej', '') )
			.rejects.toEqual( Error('missing password') )
		done()
	})

})

describe('uploadPicture()', () => {
	// this would have to be done by mocking the file system
	// perhaps using mock-fs?
})

describe('login()', () => {
	test('log in with valid credentials', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password')
		const valid = await account.login('doej', 'password')
		expect(valid).toBe(true)
		done()
	})

	test('invalid username', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password')
		await expect( account.login('roej', 'password') )
			.rejects.toEqual( Error('username "roej" not found') )
		done()
	})

	test('invalid password', async done => {
		expect.assertions(1)
		const account = await new Accounts()
		await account.register('doej', 'password')
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
		await expect(cart.addtoCart('Dell XPS,', '£300'))
			.rejects.toEqual(Error('Item not added to cart'))
		done()
	})

})
