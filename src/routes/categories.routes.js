const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categories.controllers');
const middlewares = require("../middlewares/categories.middlewares");

router.get('/', categorieController.getAllCategory);
router.get('/:id', middlewares.checkExits , categorieController.getCategoryById);
router.get('/:id/jobs', middlewares.checkExits, categorieController.getJobByIdCategory);
router.post('/', categorieController.createCategory);
router.put('/:id', middlewares.checkExits, categorieController.updateCategory);
router.delete('/:id', middlewares.checkExits, categorieController.deleteCategory);

module.exports = router;
