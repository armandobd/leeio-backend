const request = require("supertest");
const Genre = require("../../models/genre");
const mongoose = require("mongoose");

let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });

  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre 1" },
        { name: "genre 2" },
        { name: "genre 3" }
      ]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body.some(g => g.name === "genre 1")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();
      const res = await request(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/1");
      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    let name;

    const execute = async () => {
      return await request(server)
        .post("/api/genres/")
        .send({ name });
    };

    beforeEach(() => {
      name = "genre 1";
    });

    it("should return 400 if genre is less than 3 characters", async () => {
      name = "1";
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should return 400 if genre is more than 20 characters", async () => {
      name = new Array(22).join("1");
      res = await execute();
      expect(res.status).toBe(400);
    });

    it("should save the genre if it is valid", async () => {
      await execute();
      const genre = await Genre.find({ name: "genre 1" });
      expect(genre).not.toBeNull();
    });

    it("should return the genre if it is valid", async () => {
      const res = await execute();
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre 1");
    });
  });

  describe("PATCH /:id", () => {
    let id;
    let newName;
    let genre;

    const execute = async () => {
      return await request(server)
        .patch("/api/genres/" + id)
        .send({ name: newName });
    };

    beforeEach(async () => {
      genre = new Genre({ name: "genre 1" });
      await genre.save();
      id = genre._id;
      newName = "updated name";
    });

    it("should return 400 if genre is less than 3 characters", async () => {
      newName = "1";
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should return 400 if genre is more than 20 characters", async () => {
      newName = new Array(21).join("1");
      await execute();
      expect(res.status).toBe(400);
    });

    it("should return 404 if id is invalid", async () => {
      id = 1;
      const res = await execute();
      expect(res.status).toBe(404);
    });

    it("should return 404 if genre with the given id was not found", async () => {
      id = mongoose.Types.ObjectId();
      const res = await execute();
      expect(res.status).toBe(404);
    });

    it("should update the genre if input is valid", async () => {
      await execute();
      const updatedGenre = await Genre.findById(genre._id);
      expect(updatedGenre.name).toBe(newName);
    });

    it("should return the updated genre if it is valid", async () => {
      const res = await execute();
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", newName);
    });
  });
  describe("DELETE /:id", () => {
    let genre;
    let id;

    const execute = async () => {
      return await request(server)
        .delete("/api/genres/" + id)
        .send();
    };

    beforeEach(async () => {
      genre = new Genre({ name: "genre 1" });
      await genre.save();
      id = genre._id;
    });

    it("should return 404 if id is invalid", async () => {
      id = 1;
      const res = await execute();
      expect(res.status).toBe(404);
    });

    it("should return 404 if no genre with the given id was found", async () => {
      id = mongoose.Types.ObjectId();
      const res = await execute();
      expect(res.status).toBe(404);
    });

    it("should delete the genre if input is valid", async () => {
      await execute();
      const genreInDb = await Genre.findById(id);

      expect(genreInDb).toBeNull();
    });

    it("should return the removed genre", async () => {
      const res = await execute();
      expect(res.body).toHaveProperty("_id", genre._id.toHexString());
      expect(res.body).toHaveProperty("name", genre.name);
    });
  });
});
