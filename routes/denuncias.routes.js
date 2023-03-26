const { Router } = require("express");
const { post } = require("../controllers/denuncias.controller")
const router = Router();

router.post("/post", post);


module.exports = router;