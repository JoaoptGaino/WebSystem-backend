import { Request, Response } from 'express';
import db from '../database/connection';

export default class ProductsController {

    //Delete product
    async delete(req:Request,res:Response){
        const {id} = req.params;

        const removeProduct = await db('products').where('id',id).delete();
        if(!removeProduct){
            return res.status(401).json({
                message:`Couldn't delete product ${id}`
            });
        }
        return res.status(201).json({
            message:`Deleted product ${id}`
        });
    }


    //Returns a unique product by id
    async unique(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const product = await db('products')
                .select('*')
                .where('id', id);
            product.length > 0 ? res.status(201).json(product) : res.status(404).json({ message: "Couldn't find product" });//ternário que retorna a query
        } catch (err) {
            return res.status(400).json({
                message: `Bad request ${err}`
            });
        }

    }

    //List all products
    async index(req: Request, res: Response) {
        const products = await db('products')
            .select('*');

        return res.status(201).json(products);
    }
    //Create product
    async create(req: Request, res: Response) {
        const {
            descricao,
            preco,
            quantidade
        } = req.body;
        const products = {
            descricao,
            preco,
            quantidade
        };
        const trx = await db.transaction();
        try {
            await trx('products').insert(products);
            await trx.commit();
            return res.status(201).json({
                message: "Product added"
            });
        } catch (err) {
            await trx.rollback();
            return res.status(400).json({
                message: `Product wasn't added because of error ${err}`
            });
        }
    }
}