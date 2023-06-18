const express = require("express") 
const ProductManager = require("./productManager.js") 

const app = express()
app.use(express.urlencoded({extended : true}))

const manager = new ProductManager('db.json')
const readProducts = manager.read()

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Express por Local Host ${server.address().port}`)
})

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit)
    if (!limit) return res.send(await readProducts)
    let allPro = await readProducts
    let limitProduct = allPro.slice(0, limit)
    res.send(limitProduct)
})


app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    let allProd = await readProducts
    let productById = allProd.find(product => product.id === id)
    res.send(productById)
})
server.on("error", (error) => console.log(`Error del servidor ${error}`))