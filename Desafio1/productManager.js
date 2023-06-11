class ProductManager{

    constructor () {
        this.products  = []
    }
    
    getProducts = () => { return this.products }

    getId = () => {
        const count = this.products.length
        const id  = (count > 0) ? this.products[count -  1].id + 1 : 1
        return id
    }
     
    getProductsById = (idProduct) => {
        const logProduct = producto => producto.id == idProduct
        const arrProducts = this.products.some(logProduct)
        arrProducts ? console.log(this.products[idProduct -1].title) : console.log('Not fount')
        
    }
    
    addProduct = (title, description, price, thumbnail, code, stock) => {
        for (let i = 0; i < this.products.length; i++) { 
            if(this.products[i].code === code){
            return console.log(`El code ya existe ${code} `)     
            }
        }
        const newProduct = { 
            id: this.getId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock 
            }
        
        if (!Object.values(newProduct).includes(undefined)){
            this.products.push({id: this.getId(), ...newProduct})
        }else{
            console.log('Todos los campos son requeridos')
        }
    }
    
}
    const manager = new ProductManager()
    manager.addProduct('Manzana','Fruta',10 ,'www.manzana.com.ar', 12, 320)
    manager.addProduct('Banana','Fruta',15 ,'www.banana.com.ar', 14, 120)
    manager.addProduct('Naranja','Fruta',22 ,'www.naranja.com.ar', 12, 50)
    manager.addProduct('Tomate','Verdura' ,8 ,'www.tomate.com.ar', 15)

    
    manager.getProductsById(1)
    manager.getProductsById(5)
    manager.getProductsById(4)
    console.log(manager.getProducts())
    