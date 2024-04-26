const express = require('express');
const router = express.Router();
//controller modules
const itemController=require('../controllers/itemController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*items list*/
router.get('/items',itemController.items_list)


module.exports = router;
