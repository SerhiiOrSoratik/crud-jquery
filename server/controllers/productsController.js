const productModel = require('../models/productsService');

class Products {

    async getProducts(req, res) {
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

    async getProductById(req, res) {
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

    async search(req, res) {
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


    async createProduct(req, res) {
        try {
            const newProduct = await productModel.createProduct(req, res);
            res.status(201);
            res.json(newProduct);
        } catch (e) {
            console.log(e);
            res.status(400);
            res.end('Bad request');
        }
    }

    async updateProduct(req, res) {
        try {
            res.json(await productModel.updateProduct(req));
            res.status(200);
        } catch (e) {
            console.log(e);
            res.status(400);
            res.end('Bad request');
        }
    }

    async deleteProduct(req, res) {
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

module.exports = new Products();
