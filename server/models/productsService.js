const model = require('../modelsDb');
const {Op} = require("sequelize");

class productsModel {

    async getProducts() {
        return await model.product.findAll();
    }

    async getProductById(id) {
        return await model.product.findOne({
            where: {
                id: id
            }
        });
    }

    async search(searchValue) {
        return await model.product.findAll({
            where: {
                caption: {
                    [Op.like]: searchValue + '%'
                }
            }
        });
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
