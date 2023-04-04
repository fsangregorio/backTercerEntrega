
import express from 'express'
import ProductManager  from '../productManager.js';

const app = express()
const productos = new ProductManager();

app.use(express.urlencoded({extended : true}));

app.get ('/products', async(req, res)=>{
    const limit = req.query;
    const number = parseInt(limit.limit);
    const products = await productos.getProducts() 

    if (isNaN(number)){
        res.send(products)   
    }else{
        const filterProducts = products.slice(0, number)
        res.send(filterProducts);}
});

app.get ('/products/:pid', async (req, res)=>{
    const pid = req.params.pid;
    const product = await productos.getProductById(pid); 
    if (!product) {
        res.send({error:"Product not found"})
    }
 
    res.send (product)
});

app.listen(8088, () => {
console.log('Server listens to port 8088');
});

