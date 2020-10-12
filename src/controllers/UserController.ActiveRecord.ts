import { Request, Response } from 'express'

import User from '../entities/User.ActiveRecord'

export default class UserController {
  static async index(req: Request, res: Response): Promise<Response> {
    const users = await User.find({
      select: ['id', 'name', 'username', 'active', 'createdAt', 'updatedAt']
    })

    return res.json(users)
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const user = await User.findOne(req.params.id, {
      select: ['id', 'name', 'username', 'active', 'createdAt', 'updatedAt']
    })

    return res.status(user ? 200 : 404).json(user)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const body: User = req.body
    const user = User.create(body)
    const doc = await User.save(user)

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
    await User.update(req.params.id, req.body)
    const user = await User.findOne(req.params.id, {
      select: ['id', 'name', 'username', 'active', 'createdAt', 'updatedAt']
    })

    return res.status(user ? 200 : 404).json(user)
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await User.delete(req.params.id)

    return res.json(result)
  }
}
