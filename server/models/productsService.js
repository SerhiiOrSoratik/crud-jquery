const model = require('../modelsDb');

class productsModel {

    getProducts() {
        return model.product.findAll();
    }

    async createProduct(req) {
        return await model.product.create({
            caption: req.body.caption,
            availability: true,
            price: req.body.price,
            description: req.body.description,
        });
    }

    async updateProduct(req) {
        return await model.product.update(
            req.body,
            {where: {id: req.params.id}}
        )
    }

    deleteProduct(id) {
        model.product.destroy({
            where: {
                id: id
            }
        });
        return 201;
    }
}

module.exports = new productsModel()
