import { getManager } from 'typeorm'

export const id = '5a0a1b2a-66f5-4ed6-859b-8f411d9ce170'

export const userData = {
  name: 'John Doe',
  username: 'john',
  password: 'password',
  active: true
}

export function createUser(): Promise<any> {
  const user = [
    id,
    userData.name,
    userData.username,
    userData.password,
    userData.active,
    new Date(), // createdAt
    new Date() // updatedAt
  ]

  const sql = `INSERT INTO USERS 
  (id, name, username, password, active, "createdAt", "updatedAt") VALUES 
  ($1, $2, $3, $4, $5, $6, $7)`

  return getManager().query(sql, user)
}

export function clearTableUser(): Promise<any> {
  return getManager().query('DELETE FROM USERS')
}
