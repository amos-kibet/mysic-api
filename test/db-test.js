// // __tests__/user.test.js
// import mockingoose from "mockingoose";

// const model = require("./user");

// describe("test mongoose User model", () => {
//   it("should return the doc with findById", () => {
//     const _doc = {
//       _id: "507f191e810c19729de860ea",
//       name: "name",
//       email: "name@email.com",
//     };

//     mockingoose(model).toReturn(_doc, "findOne");

//     return model.findById({ _id: "507f191e810c19729de860ea" }).then((doc) => {
//       expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
//     });
//   });

//   it("should return the doc with update", () => {
//     const _doc = {
//       _id: "507f191e810c19729de860ea",
//       name: "name",
//       email: "name@email.com",
//     };

//     mockingoose(model).toReturn(doc, "update");

//     return model
//       .update({ name: "changed" }) // this won't really change anything
//       .where({ _id: "507f191e810c19729de860ea" })
//       .then((doc) => {
//         expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
//       });
//   });
// });
