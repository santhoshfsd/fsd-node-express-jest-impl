const request = require('supertest')
const app = require('../../src/app')
const newToDo = require('../mock-data/todo.json');

const endpointurl = '/todos/'

describe('integration test', () => {
    it('create todo int test' + endpointurl, async () => {
        const response = await request(app).post(endpointurl).send(newToDo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBeDefined();

    });

    it('get todo int test' + endpointurl, async () => {
        const response = await request(app).get(endpointurl).send();
        expect(response.statusCode).toBe(200);
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].status).toBeDefined();
    });

    it('Shoud throw err 500 malformed data' + endpointurl, async () => {
        const response = await request(app).post(endpointurl).send({ title: "property missing" });
        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({ message: "ToDo validation failed: status: Path `status` is required." })
    });
});

afterAll(() => {

})