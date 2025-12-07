const express = require("express");
const router = express.Router();
const controller = require("../controllers/candidateController");
const upload = require("../middlewares/upload"); // AMBIL DARI MIDDLEWARES

router.get("/", controller.getAllCandidates);

router.get("/candidate/create", controller.getCreateForm);
router.post(
  "/candidate/store",
  upload.single("photo"),
  controller.storeCandidate
);

router.get("/candidate/edit/:id", controller.getEditForm);
router.post(
  "/candidate/update/:id",
  upload.single("photo"),
  controller.updateCandidate
);

router.post("/candidate/delete/:id", controller.deleteCandidate);

module.exports = router;
