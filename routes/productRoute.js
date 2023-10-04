import express from 'express'
import { getAllProductsData, registerProduct, searchProductById, updateProduct, deleteProduct } from '../controllers/productController.js'

const route = express.Router()

route.post('/register-product', registerProduct)
route.get('/all-products', getAllProductsData)
route.get('/search-product/:id', searchProductById)
route.put('/update-product/:id', updateProduct)
route.delete('/delete-product/:id', deleteProduct)

export default route