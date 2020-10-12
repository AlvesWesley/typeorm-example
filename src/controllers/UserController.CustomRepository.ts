import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import UserRepository from '../repositories/UserRepository'

export default class UserController {
  static async index(req: Request, res: Response): Promise<Response> {
    const users = await getCustomRepository(UserRepository).find({
      select: ['id', 'name', 'username', 'active', 'createdAt', 'updatedAt']
    })

    return res.json(users)
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const user = await getCustomRepository(UserRepository).findOne(
      req.params.id,
      { select: ['id', 'name', 'username', 'active', 'createdAt', 'updatedAt'] }
    )

    return res.status(user ? 200 : 404).json(user)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const user = await getCustomRepository(UserRepository).createAndSave(
      req.body
    )

    return res.status(201).json(user)
  }

  static async update(req: Request, res: Response): Promise<Response> {
    const user = await getCustomRepository(UserRepository).updateAndReturn(
      { id: req.params.id },
      req.body
    )

    return res.status(user ? 200 : 404).json(user)
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await getCustomRepository(UserRepository).delete(
      req.params.id
    )

    return res.json(result)
  }
}
