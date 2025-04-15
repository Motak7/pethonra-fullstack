// backend/src/controllers/productController.ts
import { Request, Response } from 'express';
import * as ProductService from '../services/productService';

export const listProducts = async (req: Request, res: Response) => {
   // ... (lógica similar a listPets, chamando findAllProducts) ...
    try {
        const products = await ProductService.findAllProducts();
        res.status(200).json(products);
    } catch (error) { res.status(500).json({ message: "Erro interno ao buscar produtos." }); }
};

export const getProductDetails = async (req: Request, res: Response) => {
    // ... (lógica similar a getPetDetails, chamando findProductById) ...
    const { id } = req.params;
    try {
        const product = await ProductService.findProductById(id);
        if (!product) { return res.status(404).json({ message: "Produto não encontrado." }); }
        res.status(200).json(product);
    } catch (error) { res.status(500).json({ message: "Erro interno ao buscar detalhes do produto." }); }
};

export const createNewProduct = async (req: Request, res: Response) => {
   // ... (lógica similar a createNewPet, chamando createProduct) ...
   // !! ADICIONAR VALIDAÇÃO DE req.body !!
   const productData: ProductService.ProductCreateInput = req.body;
    if (!productData.name || !productData.price || !productData.sku || productData.stock == null) {
        return res.status(400).json({ message: "Nome, preço, SKU e estoque são obrigatórios." });
    }
   try {
       const newProduct = await ProductService.createProduct(productData);
       res.status(201).json(newProduct);
   } catch (error) { res.status(500).json({ message: "Erro interno ao criar produto." }); }
};

export const updateExistingProduct = async (req: Request, res: Response) => {
   // ... (lógica similar a updateExistingPet, chamando updateProduct) ...
    // !! ADICIONAR VALIDAÇÃO DE req.body !!
    const { id } = req.params;
    const productData: ProductService.ProductUpdateInput = req.body;
    try {
        const updatedProduct = await ProductService.updateProduct(id, productData);
        res.status(200).json(updatedProduct);
    } catch (error) {
        if (error instanceof Error && error.message.includes("não encontrado")) { return res.status(404).json({ message: error.message }); }
        res.status(500).json({ message: "Erro interno ao atualizar produto." });
    }
};

export const deleteExistingProduct = async (req: Request, res: Response) => {
    // ... (lógica similar a deleteExistingPet, chamando deleteProduct) ...
    const { id } = req.params;
    try {
        await ProductService.deleteProduct(id);
        res.status(204).send();
    } catch (error) {
         if (error instanceof Error && error.message.includes("não encontrado")) { return res.status(404).json({ message: error.message }); }
        res.status(500).json({ message: "Erro interno ao deletar produto." });
    }
};