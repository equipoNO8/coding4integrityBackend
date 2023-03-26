const { Router } = require("express");
const { post } = require("../controllers/denuncias.controller")
const router = Router();

router.get("/post", post);


module.exports = router;