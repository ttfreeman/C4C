const supertest = require("supertest");
const app = require("../app");
const API = require("../utilities/get-api");

describe("all api tests", () => {
  test("Should return recent data", async () => {
    const response = await supertest(app).get("/api/recent").expect(200);

    const { data } = response.body;
    expect(data).not.toBeNull();
    expect(data.ALL.length).toBe(15);
    expect(data.VEHICLE.length).toBe(15);
    expect(data.FOOD.length).toBe(15);
  });

  test("Should return details data", async () => {
    const response = await supertest(app)
      .get(`/api/details/${73727}`)
      .expect(200);

    const { data } = response.body;
    expect(data).not.toBeNull();
    // expect(data.ALL.length).toBe(15);
    // expect(data.VEHICLE.length).toBe(15);
    // expect(data.FOOD.length).toBe(15);
  });
});
