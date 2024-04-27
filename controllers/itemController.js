const Item= require ('../models/item');
const Category = require('../models/category')
const Brand = require('../models/brand')

const asyncHandler= require('express-async-handler')

/*display all items list*/
exports.items_list=asyncHandler(async(req,res,next)=>{
    const allItems= await Item.find({},' name description').sort({name:1}).exec();

    res.render('items_list',{title:'Items List', items_list: allItems})
})
/*Get The Form to create Item*/
exports.item_create=asyncHandler(async(req,res,next)=>{
    const [allCategories, allBrands]= await Promise.all([
    Category.find({},'name').sort({name:1}).exec(),
    Brand.find({},'name').sort({name:1}).exec()
])
    res.render('item_form',{categories:allCategories, brands: allBrands})
})