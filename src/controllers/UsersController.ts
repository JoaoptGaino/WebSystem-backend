import { Request, Response } from 'express';
import { cnpj as c } from 'cpf-cnpj-validator';
import db from '../database/connection';



export default class UsersController {
    async howMany(req:Request,res:Response){
        const users = await db('users').count('* as total');
        return res.json(users);
    }


    //Update user
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const {
            username,
            cnpj,
            email
        } = req.body;
        //const validCNPJ = c.isValid(cnpj);
        const updateUser = await db('users')
            .where('id', id)
            .update({ username, cnpj, email });
        return res.json({
            message: "Updated",
            updateUser
        });
    }
    //Delete user
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const removeUser = await db('users')
            .where('id', id)
            .delete();
        if (!removeUser) {
            return res.status(400).json({
                message: "Error finding user",
            });
        }
        return res.json({
            "Message": 'Deleted',
            removeUser
        })
    }
    //Login
    async login(req: Request, res: Response) {
        const {
            username,
            userpass
        } = req.body;

        const logou = await db('users')
            .select('*')
            .where('username', username)
            .andWhere('userpass', userpass)

        if (logou.length > 0) {
            return res.status(201).json({ message: `Seja bem vindo, ${username}` });
        }
        else {
            return res.status(401).json({ message: `Usuario errado` });
        }

    }

    //Show all users
    async index(req: Request, res: Response) {
        const users = await db('users')
            .select('*');

        return res.json(users);
    }
    //Create the user.
    async create(req: Request, res: Response) {
        //const num = '12252926000153';

        const {
            cnpj,
            username,
            userpass,
            email
        } = req.body;
        const validCNPJ = c.isValid(cnpj);
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
                if (usuario.length === 0 && validCNPJ === true) {
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
    }
}