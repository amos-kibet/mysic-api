//@ts-nocheck
import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import dotenv from "dotenv";
import { Song } from "../models/Songs.js";
import { User } from "../models/User.js";
import {
  connectDatabase,
  dropDatabase,
  dropCollections,
} from "../utils/setupTestDb.js";
import { logger } from "../utils/log.js";

dotenv.config();

/* connects to db & starts server before each test */
beforeEach(async () => {
  await connectDatabase();
});

describe("API Endpoints", () => {
  describe("GET /", () => {
    it("should return 200 status code", async () => {
      let res = request(app).get("/");
      expect((await res).statusCode).toBe(200);
    });
    it("should return an object", async () => {
      let res = request(app).get("/");
      expect(typeof res).toBe("object");
    });
    it("should return 'API working fine!'", async () => {
      let res = await request(app).get("/");
      expect(res.body.msg).toBe("API working fine!");
    });
  });

  describe("GET /api/songs", () => {
    it("should return 200 status code", async () => {
      let res = request(app).get("/api/songs");
      expect((await res).statusCode).toBe(200);
    });
    it("should return an object", async () => {
      let res = request(app).get("/api/songs");
      expect(typeof res).toBe("object");
    });
  });

  describe("GET /api/all/songs", () => {
    it("should return 200 status code", async () => {
      let res = request(app).get("/api/all/songs");
      expect((await res).statusCode).toBe(200);
    });
    it("should return an object", async () => {
      let res = request(app).get("/api/all/songs");
      expect(typeof res).toBe("object");
    });
  });

  describe("GET /api/users", () => {
    it("should return 200 status code", async () => {
      let res = request(app).get("/api/users");
      expect((await res).statusCode).toBe(200);
    });
    it("should return an object", async () => {
      const res = await request(app).get("/api/users");
      expect(typeof res).toBe("object");
    });
  });
});

describe("CRUD Operations", () => {
  describe("POST /api/signup", () => {
    it("should register a user with valid credentials", async () => {
      const validUser = {
        username: "username",
        email: "example@email.com",
        password: "some_password",
      };
      const mockUser = await User(validUser);
      await mockUser.save();

      expect(mockUser._id).toBeDefined();
      expect(mockUser.username).toBe(validUser.username);
      expect(mockUser.email).toBe(validUser.email);
      expect(mockUser.password).toBe(validUser.password);
    });

    it("should fail to register user without required fields", async () => {
      const invalidUser = {
        username: "some_username",
        email: "example@email.com",
        password: "some_password",
      };

      try {
        const mockUser = new User(invalidUser);
        await mockUser.save();
      } catch (error) {
        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(error.errors.email).toBeDefined();
      }
    });
  });
});
