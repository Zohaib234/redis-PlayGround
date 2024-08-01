const studentModel = require("../model/student");
const { getRedisClient } = require("../middleware/connect_redis");
const redisClient = getRedisClient();

module.exports = {
  create: async (req, res) => {
    try {
      const student = await studentModel.create(req.body);
      await redisClient.set(`${student.id}31`, JSON.stringify(student), {
        EX: 3600,
      });
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  get: async (req, res) => {
    try {
      const redisKey = `${req.params.id}31`;
      const cachedStudent = await redisClient.get(redisKey);
      if (cachedStudent) {
        console.log("found value from cached data");
        res.json(JSON.parse(cachedStudent));
      } else {
        const student = await studentModel.findById(req.params.id);
        if (!student) {
          return res.status(404).json({ error: "Student not found" });
        }
        await redisClient.set(redisKey, JSON.stringify(student), { EX: 3600 });
        res.json(student);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const redisKey = `${req.params.id}31`;
      await redisClient.del(redisKey);
      const deletedStudent = await studentModel.findByIdAndDelete(
        req.params.id
      );
      if (deletedStudent) {
        res.status(204).json({ message: "student deleted successfully" });
      } else {
        res.status(404).json({ error: "Student not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  listAll: async (req, res) => {
    try {
      // Fetch all keys that match the pattern *31
      const keys = await redisClient.keys("*31");

      // Retrieve data for each key
      const students = await Promise.all(
        keys.map(async (key) => {
          const cachedStudent = await redisClient.get(key);
          console.log("getting data from cached keys");
          return JSON.parse(cachedStudent);
        })
      );

      // If no students are found in Redis, fetch from MongoDB and cache them
      if (students.length === 0) {
        const allStudents = await studentModel.find({});
        await Promise.all(
          allStudents.map(async (student) => {
            await redisClient.set(`${student.id}31`, JSON.stringify(student), {
              EX: 3600,
            });
          })
        );
        console.log("getting data from database");
        return res.json(allStudents);
      }

      res.json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
