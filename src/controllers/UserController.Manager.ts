import { Request, Response } from 'express'
import { getManager } from 'typeorm'

import User from '../entities/User.DataMapper'

export default class UserController {
  static async index(req: Request, res: Response): Promise<Response> {
    return res.json(
      await getManager().find(User, {
        select: ['id', 'name', 'username', 'active', 'createdAt', 'updatedAt']
      })
    )
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const user = await getManager().findOne(User, req.params.id, {
      select: ['id', 'name', 'username', 'active', 'createdAt', 'updatedAt']
    })

    return res.status(user ? 200 : 404).json(user)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const manager = getManager()
    const user = manager.create(User, req.body)
    const doc = await manager.save(User, user)

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
    const manager = getManager()
    await manager.update(User, req.params.id, req.body)
    const user = await manager.findOne(User, req.params.id, {
      select: ['id', 'name', 'username', 'active', 'createdAt', 'updatedAt']
    })

    return res.status(user ? 200 : 404).json(user)
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await getManager().delete(User, req.params.id)

    return res.json(result)
  }
}
