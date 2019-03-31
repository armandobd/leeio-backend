const request = require("supertest");
const Genre = require("../../models/genre");

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
      name = new Array(21).join("1");
      await execute();
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
});
