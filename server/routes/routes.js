const express = require('express');
const routes = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

routes.get('/', services.homeRoutes)
routes.get('/about', services.about)
routes.get('/blog-detail', services.blog_detail)
routes.get('/blog', services.blog)
routes.get('/contact', services.contact)
routes.get('/product-detail', services.product_detail)
routes.get('/product', services.product)
routes.get('/shoping-cart', services.shoping_cart)
routes.get('/home-02', services.homePage_02)
routes.get('/home-03', services.homePage_03)

routes.get('/admin/', services.homepageAdmin)

//register

routes.get('/registerUser', services.resgister)
routes.get('/admin/user', services.admin_user)
routes.get('/admin/updateUser', services.update_user)

//API register user
routes.post('/api/user', controller.createUser);
routes.get('/api/user', controller.findUser);
routes.post('/api/user/:id', controller.updateUser);

//login user

routes.get('/loginUser', services.login)

//API register user

//slide
routes.get('/admin/addSlide', services.create_slide)
routes.get('/admin/slide', services.admin_slide)
routes.get('/admin/updateSlide', services.update_slide)

//API slide customer

routes.post('/api/slide', controller.createSlide);
routes.get('/api/slide', controller.findSlide);
routes.post('/api/slide/:id', controller.updateSlide);
routes.delete('/api/slide/:id', controller.deleteSlide);

//slideDown
routes.get('/admin/addSlideDown', services.create_slideDown)
routes.get('/admin/slideDown', services.admin_slideDown)


//clother
routes.get('/admin/clother', services.admin_clother)
// routes.get('/admin/clother?code', services.find_admin_clother)
routes.get('/admin/addClother', services.create_clother)
routes.get('/admin/updateClother', services.update_clother)
routes.get('/admin/showClother', services.show_clother)

//clotherWoman
routes.get('/admin/clotherWoman', services.admin_clotherWoman)
routes.get('/admin/addClotherWoman', services.create_clotherWoman)
routes.get('/admin/updateClotherWoman', services.update_clotherWoman)
routes.get('/admin/showClotherWoman', services.Show_clotherWoman)

//balo
routes.get('/admin/balo', services.admin_balo)
routes.get('/admin/addBalo', services.create_balo)
routes.get('/admin/updateBalo', services.update_balo)
routes.get('/admin/showBalo', services.show_balo)

//watches
routes.get('/admin/watches', services.admin_watches)
routes.get('/admin/addWatches', services.create_watches)
routes.get('/admin/updateWatches', services.update_watches)
routes.get('/admin/showWatches', services.show_watches)

//shoes
routes.get('/admin/shoes', services.admin_shoes)
routes.get('/admin/addShoes', services.create_shoes)
routes.get('/admin/updateShoes', services.update_shoes)
routes.get('/admin/showShoes', services.show_shoes)

// //API clother
routes.post('/api/clother', controller.create);
routes.get('/api/clother', controller.find);
// routes.get('/api/clother?:id', controller.find);
routes.post('/api/clother/:id', controller.update);
routes.delete('/api/clother/:id', controller.delete);

//API clotherWoman
routes.post('/api/clotherWoman', controller.createClotherWoman);
routes.get('/api/clotherWoman', controller.findClotherWoman);
routes.post('/api/clotherWoman/:id', controller.updateClotherWoman);
routes.delete('/api/clotherWoman/:id', controller.deleteClotherWoman);

//API balo
routes.post('/api/balo', controller.createBalo);
routes.get('/api/balo', controller.findBalo);
routes.post('/api/balo/:id', controller.updateBalo);
routes.delete('/api/balo/:id', controller.deleteBalo);

//API watches
routes.post('/api/watches', controller.createWatches);
routes.get('/api/watches', controller.findWatches);
routes.post('/api/watches/:id', controller.updateWatches);
routes.delete('/api/watches/:id', controller.deleteWatches);

//API shoes
routes.post('/api/shoes', controller.createShoes);
routes.get('/api/shoes', controller.findShoes);
routes.post('/api/shoes/:id', controller.updateShoes);
routes.put('/api/shoes/:id', controller.updateShoes);
routes.delete('/api/shoes/:id', controller.deleteShoes);



//API all product customer

routes.get('/api/allproduct', controller.findAll);



module.exports = routes;