const express = require('express');
//mi prendo le view che ho definito nel controller
const { indexView,
        shopView,
        shopFilterView,
        aboutView,
        contactView,
        cartView,
        checkoutView,
        thankyouView,
        addCart,
        removeCart } = require('../controllers/controllers');
const router = express.Router();

router.get('/', indexView);
router.get('/shop', shopView);
router.get('/shop/:category', shopFilterView);
router.get('/about', aboutView);
router.get('/contact', contactView);
router.get('/cart', cartView);
router.post('/add_cart', addCart);
router.post('/remove_cart', removeCart);
router.get('/checkout', checkoutView);
router.get('/thankyou', thankyouView);

//esporto il route che mi serverà poi in index.js
module.exports = router;