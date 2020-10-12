import { Request, Response } from 'express'
import { createQueryBuilder } from 'typeorm'

import User from '../entities/User.DataMapper'
import uuid from '../utils/uuid'

export default class UserController {
  static async index(req: Request, res: Response): Promise<Response> {
    const users = await createQueryBuilder()
      .select([
        'users.id',
        'users.name',
        'users.username',
        'users.active',
        'users.createdAt',
        'users.updatedAt'
      ])
      .from(User, 'users')
      .getMany()

    return res.json(users)
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const user = await createQueryBuilder()
      .select([
        'user.id',
        'user.name',
        'user.username',
        'user.active',
        'user.createdAt',
        'user.updatedAt'
      ])
      .from(User, 'user')
      .where('user.id = :id', { id: req.params.id })
      .getOne()

    return res.status(user ? 200 : 404).json(user)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const result = await createQueryBuilder()
      .insert()
      .into(User)
      .values({
        ...req.body,
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning(['id', 'name', 'username', 'active', 'createdAt', 'updatedAt'])
      .execute()

    const user = result.generatedMaps[0]

    return res.status(201).json(user)
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const result = await createQueryBuilder()
      .update(User)
      .set(req.body)
      .where('id = :id', { id: req.params.id })
      .returning(['id', 'name', 'username', 'active', 'createdAt', 'updatedAt'])
      .execute()

    const user = result.raw[0]

    return res.status(user ? 200 : 404).json(user)
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id: req.params.id })
      .execute()

    return res.json(result)
  }
}
