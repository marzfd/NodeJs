import app from '../app.js';
import supertest from 'supertest';

const request = supertest(app);

describe("POST /weather", () => {
  it("should return 200", async () => {
    const response = await request.post("/weather")
    .send({
      cityName: "cityName",
      temperature: "temperature"
    });
    expect(response.status).toBe(200);
  });
});