const Brand = require('../models/brand');
const Item = require('../models/item');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');




/*GET all brands list*/
exports.brands_list = asyncHandler(async (req, res, next) => {
    const allBrands = await Brand.find({}, 'name').sort({ name: 1 }).exec();
    res.render('brands_list', { title: 'Brands List', brands_list: allBrands })
})

/*GET the form to create a brand*/
exports.brand_create_get = asyncHandler(async (req, res, next) => {
    res.render('brand_form', { title: 'Create new brand' })
})

/*POST form to create brand*/
exports.brand_create_post = [
    //inserire il controllo nel caso una categoria gia esista
    body("brand_name", "Name must be at least 3 characters and max 100.")
        .trim()
        .isLength({ min: 3, max: 100 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        //check there are no errors in the form
        const errors = validationResult(req);
        const brand = new Brand({
            name: req.body.brand_name,
        })
        if (!errors.isEmpty()) {
            res.render('brand_form', { brand: brand, errors: errors.array() })
            return;
        } else {
            await brand.save();
            res.redirect('/brands')
        }
    })

]
/*GET brand details*/
exports.brand_detail = asyncHandler(async (req, res, next) => {
    const brand = await Brand.findById(req.params.id).exec();
    const itemsInBrand=await Item.find({brand:brand},'name').exec();
    res.render('brand_detail', { brand: brand,items:itemsInBrand })
})

/*GET brand delete*/
exports.brand_delete_get = asyncHandler(async (req, res, next) => {
    const brand = await Brand.findById(req.params.id).exec();
    const brandedItems = await Item.find({ brand: brand });
    console.log(brandedItems)
    res.render('brand_delete', { brand: brand, brandedItems: brandedItems })
});
/*POST brand delete*/
exports.brand_delete_post = asyncHandler(async (req, res, next) => {
    let brand = await Brand.findById(req.params.id).exec();
    if (brand == null) {
        res.redirect('/brands')
    }
    await Brand.findByIdAndDelete(req.body.id);
    res.redirect('/brands');

});

/*GET edit brand*/
exports.brand_edit_get = asyncHandler(async (req, res, next) => {
    const brand = await Brand.findById(req.params.id).exec();
    res.render('brand_form', { brand: brand,title:'Edit Brand' })
})

/*POST edit brand*/
exports.brand_edit_post = [
    //validate and sanitize the form
    body("brand_name", "Name must be at least 3 characters and max 100.")
        .trim()
        .isLength({ min: 3, max: 100 })
        .escape(),
    //process to create item
    asyncHandler(async (req, res, next) => {
        //check if there are errors form form
        const errors = validationResult(req);
        //create new item
        const brand = new Brand({
            _id: req.params.id,
            name: req.body.brand_name,
            description: req.body.brand_description
        })

        if (!errors.isEmpty()) {
            console.log(errors)
            res.render('brand_form', { brand: brand, errors: errors.array() })
            return;
        } else {
            const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, brand, {})
            res.redirect(updatedBrand.url)
        }
    })
]