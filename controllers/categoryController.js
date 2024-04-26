const Category = require('../models/category');



const asyncHandler= require('express-async-handler')

exports.categories_list=asyncHandler(async(req,res,next)=>{
    const allCategories= await Category.find({}, 'name').sort({name:1}).exec();
    res.render('categories_list',{title:'Categories List', categories_list:allCategories})
})