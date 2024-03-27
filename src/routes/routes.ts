const express = require('express');
const { indexView,
        shopView,
        shopFilterView,
        aboutView,
        contactView,
        cartView,
        checkoutView,
        thankyouView } = require('../controllers/controllers');
const router = express.Router();

router.get('/', indexView);
router.get('/shop', shopView);
router.get('/shop/:category', shopFilterView);
router.get('/about', aboutView);
router.get('/contact', contactView);
router.get('/cart', cartView);
router.get('/checkout', checkoutView);
router.get('/thankyou', thankyouView);

module.exports = router;