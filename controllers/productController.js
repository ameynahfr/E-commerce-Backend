import { productModel } from '../models/productModel.js'

//Register new Product

export const registerProduct = async (req, res) => {
    try {
        const { title, description, price, category, brand, inventory, ratings } = req.body
        if(!title || !description || !price || !category){
            return res.status(400).json({message : "Please provide required information"})
        }

        const product = new productModel(
            {
                title, 
                description, 
                price, 
                category, 
                brand, 
                inventory, 
                ratings
            }
        ) 

        res.status(200).json({message: "Product registered Successfully"})
        await product.save()

        
        
    } catch (error) {
        res.status(404).json({message: error.message})
        
    }
}

//Get all product's data

export const getAllProductsData =  async (req,res)=>{
    try {
        const product = await productModel.find()
    if(!product) {
        return res.status(400).send("No product found")
    }
    return res.status(201).json(product);
    
    } catch (error) {
        return res.status(404).json({message: error.message})
    }


}

//Search product by id

export const searchProductById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await productModel.findById(id);
        if(!product){
            return res.status(400).json({message: "Product not found"})
        }
        return res.status(200).json(product);
      }
  
      catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  //Update a product

  export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        let product = await productModel.findById(id)
        if(!product){
            return res.status(400).json({message: "Product not found"})
        }

        product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            useFindAndModify: false,
            runValidators: true
        })

        return res.status(200).json({message: "Product successfully updated", product})
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
        
    }
  }

  //Delete a product

  export const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      let product = await productModel.findById(id);
      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }
  
      await productModel.findByIdAndDelete(id);
  
      return res.status(200).json({ message: "Product successfully deleted" });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  