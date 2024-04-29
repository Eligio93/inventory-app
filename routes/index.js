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

/*POST item create form*/
router.post('/items/create',itemController.item_create_post)

/*GET Item detail*/
router.get('/items/:id',itemController.item_detail);

/*GET Item delete*/
router.get('/items/:id/delete',itemController.item_delete_get);
/*POST item delete*/
router.post('/items/:id/delete',itemController.item_delete_post)

/*GET form for UPDATE Item*/
router.get('/items/:id/edit',itemController.item_edit_get)

/*POST form to UPDATE Item*/
router.post('/items/:id/edit',itemController.item_edit_post)

/*GET categories list*/
router.get('/categories',categoryController.categories_list)

/*GET category form*/
router.get('/categories/create',categoryController.category_form_get)

/*POST new category form*/
router.post('/categories/create',categoryController.category_form_post)

/*GET brands list*/
router.get('/brands',brandController.brands_list)



module.exports = router;
