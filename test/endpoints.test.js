import request from "supertest";
import app from "../app.js";

describe("API Endpoints", () => {
  describe("Test API Endpoints", () => {
    test("GET /", async () => {
      let response = request(app).get("/");
      expect((await response).statusCode).toBe(200);
    });

    test("GET /api/all/songs", async () => {
      let response = request(app).get("/api/all/songs");
      expect((await response).statusCode).toBe(200);
      expect(typeof response).toBe("object");
    });
  });
});
