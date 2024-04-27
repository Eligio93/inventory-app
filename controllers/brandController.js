const Brand = require('../models/brand');



const asyncHandler= require('express-async-handler')

exports.brands_list=asyncHandler(async(req,res,next)=>{
    const allBrands= await Brand.find({}, 'name').sort({name:1}).exec();
    res.render('brands_list',{title:'Brands List', brands_list:allBrands})
})