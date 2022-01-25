const PORT = 8000
const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")

const app = express()
// NFT top sales https://www.nft-stats.com/top-sales/7d
// https://www.nbcnews.com/tech-media
// https://www.theverge.com/tech
// ONLY NFT https://cointelegraph.com/tags/nft - (unstable)
const newspapers = [
	{
		name: "Coindesk",
		address: "https://www.coindesk.com/tech",
		urlRootFormation: "https://www.coindesk.com",
	},
	{
		name: "CoinTelegraph",
		address: "https://cointelegraph.com/tags/nft",
		urlRootFormation: "https://cointelegraph.com",
	},
	{ name: "BBC", address: "https://www.bbc.com/news/technology" },
	{ name: "The Guardian", address: "https://www.theguardian.com/uk/technology" },
	{ name: "USA Today", address: "https://www.usatoday.com/tech" },

	{
		name: "Independent",
		address: "https://www.independent.co.uk/tech?CMP=ILC-refresh",
		urlRootFormation: "https://www.independent.co.uk",
	},

	{
		name: "Crypto news",
		address: "https://cryptonews.com",
		textSource: "article__title",
		textLocation: "h4",
	},
]
const articles = []
const NFTArticles = []

newspapers.forEach((source) => {
	console.log(source)
	axios.get(source.address).then((response) => {
		const html = response.data
		const $ = cheerio.load(html)
		const searchQuery = source.textSource
			? `a:contains("${source.textLocation}")`
			: 'a:contains("NFT")'
		console.log(searchQuery)
		$(searchQuery, html).each(function () {
			const title = source.textLocation
				? $(this).attr(source.textLocation)
				: $(this).text()

			// URL generation and formatting
			const url = $(this).attr("href")
			const parsedSource = `${source.address}${url}`
			const formattedUrl = source.urlRootFormation
				? `${source.urlRootFormation}${url}`
				: parsedSource
			NFTArticles.push({ title, url: formattedUrl, source: source.name })
		})
	})
})

app.get("/", (req, res) => {
	res.json("Welcome to the Crypto API !")
})

app.get("/news", (req, res) => {
	res.json(NFTArticles)
})

// app.get("/news/catalog", (req, res) => {
// 	res.json("NEWS Catalog !")
// })

app.listen(PORT, () => {
	console.log("Server listening on port: ", PORT)
})
