import chai, { expect } from 'chai'
import chaiHTTP from 'chai-http'

import App from '../../src/app'
import Database from '../../src/database'
import dbConfig from '../../src/config/database'
import { clearTableUser, createUser, userData, id } from '../resources/seeder'

chai.use(chaiHTTP)

const url = '/v1/custom-repository/user'

describe('Using custom repository', () => {
  beforeEach(async () => {
    await Database.init(dbConfig)
    await clearTableUser()
  })

  it('index', async () => {
    await createUser()
    const app = await App.startServer()
    const response = await chai.request(app).get(url)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.a('array')
    expect(response.body[0].id).to.be.a('string')
    expect(response.body[0].name).to.be.a('string')
    expect(response.body[0].username).to.be.a('string')
    expect(response.body[0]).to.not.has.property('password')
    expect(response.body[0].active).to.be.a('boolean')
    expect(response.body[0].createdAt).to.be.a('string')
    expect(response.body[0].updatedAt).to.be.a('string')
  })

  it('show', async () => {
    await createUser()
    const app = await App.startServer()
    const response = await chai.request(app).get(`${url}/${id}`)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.a('object')
    expect(response.body.id).to.be.equal(id)
    expect(response.body.name).to.be.a('string')
    expect(response.body.username).to.be.a('string')
    expect(response.body).to.not.has.property('password')
    expect(response.body.active).to.be.a('boolean')
    expect(response.body.createdAt).to.be.a('string')
    expect(response.body.updatedAt).to.be.a('string')
  })

  it('create', async () => {
    const app = await App.startServer()
    const response = await chai.request(app).post(url).send(userData)

    expect(response.status).to.be.equal(201)
    expect(response.body).to.be.a('object')
    expect(response.body.id).to.be.a('string')
    expect(response.body.name).to.be.a('string')
    expect(response.body.username).to.be.a('string')
    expect(response.body).to.not.has.property('password')
    expect(response.body.active).to.be.a('boolean')
    expect(response.body.createdAt).to.be.a('string')
    expect(response.body.updatedAt).to.be.a('string')
  })

  it('update', async () => {
    await createUser()
    const update = { name: 'New Name' }
    const app = await App.startServer()
    const response = await chai.request(app).put(`${url}/${id}`).send(update)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.a('object')
    expect(response.body.id).to.be.a('string')
    expect(response.body.name).to.be.a('string')
    expect(response.body.username).to.be.a('string')
    expect(response.body).to.not.has.property('password')
    expect(response.body.active).to.be.a('boolean')
    expect(response.body.createdAt).to.be.a('string')
    expect(response.body.updatedAt).to.be.a('string')
    expect(response.body.name).to.be.equal(update.name)
  })

  it('delete', async () => {
    await createUser()
    const app = await App.startServer()
    const response = await chai.request(app).delete(`${url}/${id}`)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.a('object')
    expect(response.body).to.has.property('raw')
    expect(response.body.affected).to.be.a('number')
  })
})
