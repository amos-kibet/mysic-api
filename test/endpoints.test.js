//@ts-nocheck
import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import dotenv from "dotenv";
import mockingoose from "mockingoose";
import { Song } from "../models/Songs.js";
import { User } from "../models/User.js";

dotenv.config();
/* connects to db before each test */
beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
});

/* closes db connection after tests */
afterAll(async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
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
  describe("GET /api/users/:id", () => {
    it("should return a user with given id", async () => {
      let mockUser = {
        username: "some_username",
        email: "example@example.example",
        password: "some_password",
        confirmedEmail: false,
        _id: "63590008b85eabff281c0000",
        __v: 0,
      };

      mockingoose(User).toReturn(mockUser, "findOne");

      return User.findById({ _id: "63590008b85eabff281c0000" }).then((doc) => {
        expect(JSON.parse(JSON.stringify(doc))).toMatchObject(mockUser);
      });
    });
  });

  // describe("PATCH /api/users", () => {
  //   it("should return the user with update", async () => {
  //     const mockUser = {
  //       _id: "63590008b85eabff281c0000",
  //       username: "name",
  //       email: "example@example.example",
  //     };

  //     mockingoose(User).toReturn(mockUser, "update");

  //     const doc = await User.updateOne({ name: "username" }).where({
  //       _id: "63590008b85eabff281c0000",
  //     });
  //     expect(JSON.parse(JSON.stringify(doc))).toMatchObject(mockUser);
  //   });
  // });

  // describe("POST /api/signup", () => {
  //   it("should register a user with valid credentials", async () => {
  //     // FIXME: populates dev db instead of test db
  //     const res = await request(app).post("/api/signup").send({
  //       username: "username",
  //       email: "example@email.com",
  //       password: "some_password",
  //     });

  //     expect(res.statusCode).toBe(200);
  //     expect(res.body.username).toBe("username");
  //   });
  // });
});
