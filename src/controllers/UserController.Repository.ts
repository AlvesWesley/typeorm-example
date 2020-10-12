import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import User from '../entities/User.DataMapper'

export default class UserController {
  static async index(req: Request, res: Response): Promise<Response> {
    return res.json(
      await getRepository(User).find({
        select: ['id', 'name', 'username', 'active', 'createdAt', 'updatedAt']
      })
    )
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const user = await getRepository(User).findOne(req.params.id, {
      select: ['id', 'name', 'username', 'active', 'createdAt', 'updatedAt']
    })

    return res.status(user ? 200 : 404).json(user)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const body: User = req.body
    const repository = getRepository(User)
    const user = repository.create(body)
    const doc = await repository.save(user)

    const { id, name, username, active, createdAt, updatedAt } = doc

    return res.status(201).json({
      id,
      name,
      username,
      active,
      createdAt,
      updatedAt
    })
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const repository = getRepository(User)
    await repository.update(req.params.id, req.body)
    const user = await repository.findOne(req.params.id, {
      select: ['id', 'name', 'username', 'active', 'createdAt', 'updatedAt']
    })

    return res.status(user ? 200 : 404).json(user)
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await getRepository(User).delete(req.params.id)

    return res.json(result)
  }
}
