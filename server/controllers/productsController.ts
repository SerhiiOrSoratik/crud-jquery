import {ProductsModel} from "../models/productsService";
const productModel = new ProductsModel();

export class Products {

    async getProducts(req: any, res: any) {
        try {
            const products = await productModel.getProducts();
            res.status(200);
            res.json(products);
        } catch (e) {
            console.log(e);
            res.status(400);
            res.end('Bad request');
        }
    }

    async getProductById(req: any, res: any) {
        try {
            const products = await productModel.getProductById(req.params.id);
            res.status(200);
            res.json(products);
        } catch (e) {
            console.log(e);
            res.status(400);
            res.end('Bad request');
        }
    }

    async search(req: any, res: any) {
        try {
            const products = await productModel.search(req.params.searchValue);
            res.status(200);
            res.json(products);
        } catch (e) {
            console.log(e);
            res.status(400);
            res.end('Bad request');
        }
    }


    async createProduct(req: any, res: any) {
        try {
            const {caption, price, description} = req.body
            const newProduct = await productModel.createProduct(caption, price, description);
            res.status(201);
            res.json(newProduct);
        } catch (e) {
            console.log(e);
            res.status(400);
            res.end('Bad request');
        }
    }

    async updateProduct(req: any, res: any) {
        try {
            res.json(await productModel.updateProduct(req.body, req.params.id));
            res.status(200);
        } catch (e) {
            console.log(e);
            res.status(400);
            res.end('Bad request');
        }
    }

    async deleteProduct(req: any, res: any) {
        try {
            const id = req.params.id;
            res.status(productModel.deleteProduct(id));
            res.end();
        } catch (e) {
            console.log(e);
            res.status(400);
            res.end('Bad request');
        }

    }

}
