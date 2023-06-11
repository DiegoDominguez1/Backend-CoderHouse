    const fs = require('fs')

    class ProductManager {
    
        constructor(path) {
            this.path = path
            this.products  = []
        }
    
        read = () => {
            if (fs.existsSync(this.path)) {
                return fs.promises.readFile(this.path, 'utf-8').then(r => JSON.parse(r))
            } else return []
        }
        
        static id = 0
    
        addProduct = async (title, description, price, thumbnail, code, stock) => {
            ProductManager.id++    
            let newProduct = {
                    id: ProductManager.id,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock 
                    }
                    this.products.push(newProduct)
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products))
        }
    
        getProducts = async () => { 
            let getRespuesta = await this.read()
            console.log(getRespuesta)
        }
    
         getProductsById = async (id) => {     
            let logProduct = await this.read()
            let filtroProd = logProduct.find(producto => producto.id === id)
            filtroProd != undefined ? console.log(filtroProd) : console.log('Not fount')
        }
    
        deleteProductById = async (id) => {
            let readProduct = await this.read()
            let deleteProduct = readProduct.filter(producto => producto.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(deleteProduct))
        }
    
        updateProduct = async ({id, ...producto}) => {
            await this.deleteProductById(id)
            let allProduct = await this.read()
            let modProduct =[{id, ...producto}, ...allProduct]
            await fs.promises.writeFile(this.path, JSON.stringify(modProduct))
        }
    
    }
    
    
    const manager = new ProductManager('db.json')
    
    manager.addProduct('Manzana','Fruta',10 ,'www.manzana.com.ar', 12, 320)
    manager.addProduct('Banana','Fruta',15 ,'www.banana.com.ar', 14, 120)
    manager.addProduct('Naranja','Fruta',22 ,'www.naranja.com.ar', 12, 50)
    
    manager.getProducts()
    // manager.getProductsById(2)
    // manager.deleteProductById(3)
    // manager.updateProduct({
    //     id:2,
    //     title: 'Banana',
    //     description: 'Fruta',
    //     price: 23,
    //     thumbnail: 'www.banana.com.ar',
    //     code: 14,
    //     stock: 300
    //     })
