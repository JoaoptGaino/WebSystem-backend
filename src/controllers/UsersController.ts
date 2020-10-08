import { Request, Response } from 'express';
import db from '../database/connection';



export default class UsersController {
    async create(req: Request, res: Response) {
        const {
            cnpj,
            username,
            userpass,
            email
        } = req.body;
        const trx = await db.transaction();

        const user = {
            cnpj,
            username,
            userpass,
            email
        }

        try {
            await trx('users').insert(user);
            await trx.commit();
            return res.status(201).send();
        }catch(err){
            await trx.rollback();
            return res.status(400).json({
                error:`Error, ${err}`
            });
        }
    }
}