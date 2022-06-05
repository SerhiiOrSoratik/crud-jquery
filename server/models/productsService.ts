import {product} from '../modelsDb';
import {Op} from 'sequelize';

export class ProductsModel {

    async getProducts() {
        return await product.findAll();
    }

    async getProductById(id: string) {
        return await product.findOne({
            where: {
                id: id
            }
        });
    }

    async search(searchValue: string) {
        return await product.findAll({
            where: {
                caption: {
                    [Op.like]: searchValue + '%'
                }
            }
        });
    }

    async createProduct(caption: string, price: number, description: string) {
        return await product.create({
            caption: caption,
            availability: true,
            price: price,
            description: description,
        });
    }

    async updateProduct(body: { caption: string, price: number, description: string }, id: string) {
        return await product.update(
            body,
            {where: {id}}
        )
    }

    deleteProduct(id: string) {
        product.destroy({
            where: {
                id: id
            }
        }).then(r => 201);
    }
}
