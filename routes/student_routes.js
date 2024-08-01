const studentController = require("../controller/student_controller");
const router = require("express").Router();

router.post("/", studentController.create);
router.get("/:id", studentController.get);
router.delete("/:id", studentController.delete);
router.get("/", studentController.listAll);

module.exports = router;
