const { model, Schema } = require("mongoose");

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rollNumber: { type: Number, required: true },
  section: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
});

module.exports = model("student", studentSchema);
