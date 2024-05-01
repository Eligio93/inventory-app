const express = require('express');
const router = express.Router();
//controller modules
const itemController = require('../controllers/itemController')
const categoryController = require('../controllers/categoryController')
const brandController = require('../controllers/brandController')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});


/// ITEMS ROUTES ///

/*GET items list*/
router.get('/items', itemController.items_list)

/*GET item form to create*/
router.get('/items/create', itemController.item_create);

/*POST item create form*/
router.post('/items/create', itemController.item_create_post)

/*GET Item detail*/
router.get('/items/:id', itemController.item_detail);

/*GET Item delete*/
router.get('/items/:id/delete', itemController.item_delete_get);

/*POST item delete*/
router.post('/items/:id/delete', itemController.item_delete_post)

/*GET form for UPDATE Item*/
router.get('/items/:id/edit', itemController.item_edit_get)

/*POST form to UPDATE Item*/
router.post('/items/:id/edit', itemController.item_edit_post)


/// CATEGORIES ROUTES ///

/*GET categories list*/
router.get('/categories', categoryController.categories_list)

/*GET category form*/
router.get('/categories/create', categoryController.category_form_get)

/*POST new category form*/
router.post('/categories/create', categoryController.category_form_post)

/*GET category detail*/
router.get('/categories/:id', categoryController.category_detail)

/*GET category delete*/
router.get('/categories/:id/delete', categoryController.category_delete_get)

/*POST category delete*/
router.post('/categories/:id/delete', categoryController.category_delete_post)

/*GET form for UPDATE category*/
router.get('/categories/:id/edit', categoryController.category_edit_get)

/*POST form to UPDATE category*/
router.post('/categories/:id/edit', categoryController.category_edit_post)


///BRANDS ROUTES///

/*GET brands list*/
router.get('/brands', brandController.brands_list)

/*GET brand create*/
router.get('/brands/create', brandController.brand_create_get)

/*POST brand create*/
router.post('/brands/create', brandController.brand_create_post)

/*GET brand detail*/
router.get('/brands/:id', brandController.brand_detail)

/*GET brand delete*/
router.get('/brands/:id/delete', brandController.brand_delete_get)

/*POST brand delete*/
router.post('/brands/:id/delete', brandController.brand_delete_post)

/*GET form for UPDATE brand*/
router.get('/brands/:id/edit', brandController.brand_edit_get)

/*POST form to UPDATE brand*/
router.post('/brands/:id/edit', brandController.brand_edit_post)



module.exports = router;
