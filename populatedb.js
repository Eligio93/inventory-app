#! /usr/bin/env node

console.log(
    'This script populates some test items, categories and brands to the database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Item = require("./models/item");
  const Category = require('./models/category')
  const Brand = require("./models/brand");

  
  const items = [];
  const categories = [];
  const brands = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createBrands();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function categoryCreate(index, name, description) {
    const category = new Category({ name: name, description: description});
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }
  
  async function brandCreate(index, name) {
    const brand= new Brand({name:name})  
    await brand.save();
    brands[index] = brand;
    console.log(`Added brand: ${name}`);
  }
  
  async function itemCreate(index, name, description, category, price, stock, brand) {
    const itemDetail = {
      name:name,
      description: description,
      category: category,
      price: price,
      stock: stock,
      brand: brand
    };
  
    const item = new Item(itemDetail);
    await item.save();
    items[index] = item;
    console.log(`Added item: ${name}`);
  }
  

  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "Shampoo","Elevate your hair care routine with our diverse range of shampoos. From hydrating to strengthening, anti-dandruff to volumizing, we've got your hair needs covered."),
      categoryCreate(1, "Hair Products", "Achieve your best look with our quality hair products! From styling essentials to nourishing serums, we've got you covered for effortless style."),
      categoryCreate(2, "Beard Balms", "Refine your grooming with our top-tier beard balms! Perfect for conditioning and styling, our selection ensures your facial hair stays soft and manageable."),
      categoryCreate(3, "Fragrances", "Discover premium fragrances crafted to captivate your senses and leave a lasting impression."),
      categoryCreate(4, "Toothpastes", "Elevate your oral care with our premium toothpastes! Crafted for various needs like whitening and sensitivity relief, they ensure a refreshing clean every time you brush."),
    ]);
  }
  
  async function createBrands() {
    console.log("Adding brands");
    await Promise.all([
      brandCreate(0, "Layrite"),
      brandCreate(1, "Reuzel"),
      brandCreate(2, "Proraso"),
      brandCreate(3, "Tabac Original"),
      brandCreate(4, "Marvis"),
    ]);
  }
  
  async function createItems() {
    console.log("Adding Items");
    await Promise.all([
      itemCreate(0,
        "LAYRITE DAILY SHAMPOO 300ML",
        "The Layrite Daily Shampoo cleanses your hair, gently moisturising it with natural oils for a fuller and healthier look. A perfect choice for your daily hair care routine.",
        categories[0],
        36,
        10,
        brands[0]
      ),
      itemCreate(1,
        "REUZEL BLUE STRONG HOLD POMADE 113G",
        "The Reuzel Blue Pomade gives a strong hold and high shine. This pomade is water soluble, making it easy to remove without any leftover residue.",
        categories[1],
        39,
        10,
        brands[1]
      ),
      itemCreate(2,
        "PRORASO BEARD BALM WOOD & SPICE 100ML",
        "The Proraso Beard Balm Wood & Spice provides low shine with no hold, designed more to specifically soothe and soften coarse beard hairs. Ideal for stubble or if you suffer from beard itch.",
        categories[2],
        30,
        10,
        brands[2]
      ),
      itemCreate(3,
        "TABAC ORIGINAL CRAFTSMAN EAU DE TOILETTE SPRAY 100ML",
        "The Tabac Original Craftsman Eau De Toilette Spray features a distinctive aromatic scent of citrus, peppery spice combined with the sensual warmth of tonka bean, leather and precious woods that create a fragrance radiating determination and strength.",
        categories[3],
        25,
        10,
        brands[3]
      ),
      itemCreate(4,
        "MARVIS TOOTHPASTE WHITENING MINT 85ML",
        "The Marvis Toothpaste Whitening Mint whitens teeth while preventing tooth decay, leaving your mouth clean with a fresh minty finish.",
        categories[4],
        17,
        10,
        brands[4]
      )
    ]);
  }
