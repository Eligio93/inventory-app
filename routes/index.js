const express = require('express');
const router = express.Router();
//controller modules
const itemController=require('../controllers/itemController')
const categoryController = require('../controllers/categoryController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*items list*/
router.get('/items',itemController.items_list)

/*categories list*/
router.get('/categories',categoryController.categories_list)


module.exports = router;
