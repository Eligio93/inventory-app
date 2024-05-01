const Category = require('../models/category');
const Item = require('../models/item')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')




/*GET categories list*/
exports.categories_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find({}, 'name').sort({ name: 1 }).exec();
    res.render('categories_list', { title: 'Categories List', categories_list: allCategories })
})


/*GET the form to create category*/
exports.category_form_get = asyncHandler(async (req, res, next) => {
    res.render('category_form', { title: 'Create New Category' })
})


/*POST form to create category*/
exports.category_form_post = [
    //inserire il controllo nel caso una categoria gia esista
    body("category_name", "Name must be at least 3 characters.")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("category_description", "Description must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        //check there are no errors in the form
        const errors = validationResult(req);
        const category = new Category({
            name: req.body.category_name,
            description: req.body.category_description
        })
        if (!errors.isEmpty()) {
            res.render('category_form', { category: category, errors: errors.array() })
            return;
        } else {
            await category.save();
            res.redirect('/categories')
        }
    })

]

/*GET category detail*/
exports.category_detail = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();
    res.render('category_detail', { category: category })
})

/*GET category delete*/
exports.category_delete_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();
    const categorizedItems = await Item.find({ category: category });
    console.log(categorizedItems.length)
    res.render('category_delete', { category: category, categorizedItems: categorizedItems })
});

/*POST category delete*/
exports.category_delete_post = asyncHandler(async (req, res, next) => {
    let category = await Category.findById(req.params.id).exec();
    if (category == null) {
        res.redirect('/categories')
    }
    await Category.findByIdAndDelete(req.body.id);
    res.redirect('/categories');

});

/*GET category edit*/
exports.category_edit_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();
    res.render('category_form', { category: category, title:'Edit Category'})
})

/*POST category edit*/
exports.category_edit_post = [
    //validate and sanitize the form
    body("category_name", "Name must be at least 3 characters.")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("category_description", "Description must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    //process to create item
    asyncHandler(async (req, res, next) => {
        //check if there are errors form form
        const errors = validationResult(req);
        //create new item
        const category = new Category({
            _id: req.params.id,
            name: req.body.category_name,
            description: req.body.category_description
        })

        if (!errors.isEmpty()) {
            console.log(errors)
            res.render('category_form', { category: category, errors: errors.array() })
            return;
        } else {
            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, category, {})
            res.redirect(updatedCategory.url)
        }
    })
]