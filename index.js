const PORT = 8000
const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")

const app = express()

app.get("/", (req, res) => {
	res.json("Welcome to the Crypto API !")
})

app.get("/news", (req, res) => {
	res.json("Crypto NEWS !")
})

app.get("/news/catalog", (req, res) => {
	res.json("NEWS Catalog !")
})

app.listen(PORT, () => {
	console.log("Server listening on port: ", PORT)
})
