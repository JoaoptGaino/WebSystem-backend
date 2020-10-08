import { Request, Response } from 'express';
import db from '../database/connection';



export default class UsersController {

    //Show all users
    async index(req: Request, res: Response) {
        const users = await db('users')
            .select('*');

        return res.json(users);
    }


    //Create the user.
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
        await db.select("username")
            .from('users')
            .where('username', user.username)
            .andWhere('email', user.email)
            .then(async usuario => {
                if (usuario.length === 0) {
                    try {
                        await trx('users').insert(user);
                        await trx.commit();
                        return res.status(201).send();
                    } catch (er) {
                        await trx.rollback();
                        return res.status(400).json({
                            error: `error ${er}`
                        });
                    }
                }
                return res.status(401).json({
                    message: "Erro ao inserir"
                })
            })
        /* await trx('users').insert(user);
        await trx.commit();
        return res.status(201).send(); */

    }
}