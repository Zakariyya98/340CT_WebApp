#!/usr/bin/env node

//Routes File

'use strict'

/* MODULE IMPORTS */
const Koa = require('koa');
const Router = require('koa-router')
const views = require('koa-views')
const staticDir = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')({multipart: true, uploadDir: '.'})
const session = require('koa-session')
const sqlite = require('sqlite-async')
//const jimp = require('jimp')

/* IMPORT CUSTOM MODULES */
const User = require('./modules/user')
const Systems = require('./modules/computers')
const app = new Koa()
const router = new Router()

/* CONFIGURING THE MIDDLEWARE */
app.keys = ['darkSecret']
app.use(staticDir('public'))
app.use(bodyParser())
app.use(session(app))
app.use(views(`${__dirname}/views`, { extension: 'handlebars' }, {map: { handlebars: 'handlebars' }}))

const defaultPort = 8080
const port = process.env.PORT || defaultPort 
const dbName = 'website.db'	
const dbProducts = 'products.db'

/**
 * The secure home page.
 *
 * @name Home Page
 * @route {GET} /
 * @authentication This route requires cookie-based authentication.
 */
router.get('/', async ctx => {
	try {
		if(ctx.session.authorised !== true) return ctx.redirect('/login?msg=you need to log in')
		const data = {}
		if(ctx.query.msg) data.msg = ctx.query.msg
		await ctx.render('index')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

/**
 * The user registration page.
 *
 * @name Register Page
 * @route {GET} /register
 */
router.get('/register', async ctx => await ctx.render('register'))

/**
 * The script to process new user registrations.
 *
 * @name Register Script
 * @route {POST} /register
 */
router.post('/register', koaBody, async ctx => {
	try {
		// extract the data from the request
		const body = ctx.request.body
		console.log(body)
		// call the functions in the module
		const user = await new User(dbName)
		await user.register(body.user, body.pass)
		// await user.uploadPicture(path, type)
		// redirect to the home page
		ctx.redirect(`/?msg=new user "${body.name}" added`)
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.get('/login', async ctx => {
	const data = {}
	if(ctx.query.msg) data.msg = ctx.query.msg
	if(ctx.query.user) data.user = ctx.query.user
	await ctx.render('login', data)
})

router.post('/login', async ctx => {
	try {
		const body = ctx.request.body
		const user = await new User(dbName)
		await user.login(body.user, body.pass)
		ctx.session.authorised = true
		return ctx.redirect('/home')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})

router.get('/logout', async ctx => {
	ctx.session.authorised = null
	ctx.redirect('/?msg=you are now logged out')
})
//delete the eslint disable once fixed later on
// eslint-disable-next-line max-lines-per-function
router.get('/home', async ctx => {
	try {
		console.log('/')
		//await ctx.render('home')
		//Code below is for searching a product// It works
		//const sql = 'Dell'
		//const products = await new Systems(dbProducts)
		//const data = await products.search(sql)
		//await products.close()
		//console.log(data.name)
		//"Leave this code for now"
		const sql = 'SELECT id, name, desc FROM products;'
		const db = await sqlite.open(dbProducts)
		const data = await db.all(sql)
		await db.close()
		console.log(data)
		await ctx.render('home', {title: 'Popular right now', name: data, desc: data})
	} catch(err) {
		ctx.body = err.message
	}
})

router.get('/productadd', async ctx => await ctx.render('productadd'))

router.post('/productadd', async ctx => {
	try {
		// extract the data from the request
		const body = ctx.request.body
		console.log(body)
		// call the functions in the module
		const system = await new Systems(dbProducts)
		await system.addtodb(body.name, body.price, body.picture, body.desc)
		// redirect to the home page
		ctx.redirect('/home')
	} catch(err) {
		await ctx.render('error', {message: err.message})
	}
})


app.use(router.routes())
module.exports = app.listen(port, async() => console.log(`listening on port ${port}`))
