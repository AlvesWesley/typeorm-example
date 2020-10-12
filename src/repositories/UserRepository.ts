import {
  DeepPartial,
  EntityRepository,
  FindConditions,
  Repository
} from 'typeorm'

import User from '../entities/User.DataMapper'

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  async createAndSave(data: DeepPartial<User>): Promise<DeepPartial<User>> {
    const user = this.create(data)
    const registry = await this.save(user)

    const { id, name, username, active, createdAt, updatedAt } = registry

    return {
      id,
      name,
      username,
      active,
      createdAt,
      updatedAt
    }
  }

  async updateAndReturn(
    criteria: FindConditions<User>,
    data: DeepPartial<User>
  ): Promise<User> {
    const result = await this.createQueryBuilder()
      .update(User)
      .set(data)
      .where(criteria)
      .returning(['id', 'name', 'username', 'active', 'createdAt', 'updatedAt'])
      .execute()

    return result.raw[0]
  }
}
