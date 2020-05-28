const request = require('supertest')
const app = require('../../app')
const newTodo = require('../mock-data/new-todo.json')
const endpointUrl = '/todos/'
let firstTodo
describe(endpointUrl, () => {
  it('GET ' + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl)

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy()
    firstTodo = response.body[0]
  });
  it('GET by id' +endpointUrl +  ':todoId', async () => {
    const response = await request(app).get(endpointUrl + firstTodo._id)
    expect(response.status).toBe(200)
    expect(response.body.title).toBe(firstTodo.title)
  });
  it('should fail GET by id' +endpointUrl +  ':todoId ', async () => {
    const response = await request(app).get(endpointUrl + '5ecbc4e14379782c8b708aaa')
    expect(response.status).toBe(404)
    expect(response.body).toEqual({})
  });
  it('POST' +  endpointUrl, async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send(newTodo)

    expect(response.status).toBe(201)
    expect(response.body.title).toBe(newTodo.title)
    expect(response.body.done).toBe(newTodo.done)
  });

  it('should return 500 on malformed data with POST' + endpointUrl,async () => {
    const response = await request(app).post(endpointUrl).send({title: 'ssss'})
    expect(response.status).toBe(500)
    expect(response.body).toStrictEqual({message: "Todo validation failed: done: Path `done` is required."})
  });
  
});

