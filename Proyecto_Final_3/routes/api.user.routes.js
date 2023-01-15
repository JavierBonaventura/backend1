// Import router
const router = require('express').Router();

// Controllers
const { getAllUsers, getUserId, deleteAll, deleteOne } = require('../controllers/user.controller');



router.get("", getAllUsers) 
router.get("/:id", getUserId) 
router.delete("", deleteAll) 
router.delete("/:id", deleteOne) 



module.exports = router