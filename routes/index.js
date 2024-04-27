const express = require('express');
const router = express.Router();
//controller modules
const itemController=require('../controllers/itemController')
const categoryController = require('../controllers/categoryController')
const brandController = require('../controllers/brandController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*GET items list*/
router.get('/items',itemController.items_list)

/*GET item form to create*/
router.get('/items/create',itemController.item_create);

/*GET categories list*/
router.get('/categories',categoryController.categories_list)

/*GET brands list*/
router.get('/brands',brandController.brands_list)


module.exports = router;
