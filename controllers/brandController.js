const Brand = require('../models/brand');



const asyncHandler= require('express-async-handler');
const { body, validationResult } = require('express-validator');
/*GET all brands list*/
exports.brands_list=asyncHandler(async(req,res,next)=>{
    const allBrands= await Brand.find({}, 'name').sort({name:1}).exec();
    res.render('brands_list',{title:'Brands List', brands_list:allBrands})
})

/*GET the form to create a brand*/
exports.brand_create_get = asyncHandler(async (req, res, next) => {
    res.render('brand_form', { title: 'Brand Form' })
})

/*POST form to create brand*/
exports.brand_create_post = [
    //inserire il controllo nel caso una categoria gia esista
    body("brand_name", "Name must be at least 3 characters and max 100.")
        .trim()
        .isLength({ min: 3 , max:100 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        //check there are no errors in the form
        const errors = validationResult(req);
        const brand = new Brand({
            name: req.body.brand_name,
        })
        if (!errors.isEmpty()) {
            res.render('brand_form',{brand:brand, errors:errors.array()})
            return;
        } else {
            await brand.save();
            res.redirect('/brands')
        }
    })

]
/*GET brand details*/
exports.brand_detail=asyncHandler(async(req,res,next)=>{
    const brand= await Brand.findById(req.params.id).exec();
    res.render('brand_detail', {brand:brand})
})