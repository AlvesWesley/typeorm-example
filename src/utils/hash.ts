import bcryptjs from 'bcryptjs'

function bcrypt(password: string): string {
  return bcryptjs.hashSync(password, bcryptjs.genSaltSync())
}

export default {
  bcrypt
}
