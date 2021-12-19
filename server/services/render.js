const axios = require('axios');
const PORT = process.env.PORT || 3000


exports.homeRoutes = (req, res) => {
    res.render('customer/index', { title: 'Coza Store' });
}
exports.about = (req, res) => {
    res.render('customer/about', { title: 'About' });
}
exports.blog_detail = (req, res) => {
    res.render('customer/blog-detail', { title: 'Blog Detail' });
}
exports.blog = (req, res) => {
    res.render('customer/blog', { title: 'Blog' });
}
exports.contact = (req, res) => {
    res.render('customer/contact', { title: 'Contact' });
}
exports.product_detail = (req, res) => {
    axios.get(`/api/clother`,{params:{id:req.query.id}})
    .then(function (productdata) {
        res.render('customer/product-detail', { product: productdata.data,title: 'Product Detail' });
    })
    .catch(err=>{
        res.send(err);
    })
    // res.render('customer/product-detail', { title: 'Product Detail' });
}

// homepage admin
exports.homepageAdmin = (req, res) => {
    res.render('admin/index');
}

// register user
exports.resgister = (req, res) => {
    res.render('admin/pages/samples/register');
}

// login user
exports.login = (req, res) => {
    res.render('admin/pages/samples/login');
}

// admin user

exports.admin_user = (req, res) => {
    //Make a get request to /api/clother

    axios.get(`/api/user`,{params:{count:req.query.count}})
        .then(function (response) {
            res.render('admin/pages/samples/User', { user: response.data,params:req.query.count});
        })
        .catch(err=>{
            res.send(err);
        })
        
}

exports.update_user = (req, res) => {
    axios.get('/api/user',{params:{id:req.query.id}})
    .then(function (userdata) {
        res.render('admin/pages/samples/Form_update_user',{user:userdata.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

exports.shoping_cart = (req, res) => {
    res.render('customer/shoping-cart', { title: 'Cart' });
}
exports.homePage_02 = (req, res) => {
    res.render('customer/home-02', { title: 'Coza Store' });
}
exports.homePage_03 = (req, res) => {
    res.render('customer/home-03', { title: 'Coze Store' });
}
exports.admin_clother = (req, res) => {
    //Make a get request to /api/clother
    axios.get('/api/clother',{params:{category:req.query.category,count:req.query.count}})
        .then(function (response) {
            res.render('admin/pages/tables/Clother', { clother: response.data,params:req.query.count});
        })
        .catch(err=>{
            res.send(err);
        })
}
// exports.find_admin_clother = (req, res) => {
//     //Make a get request to /api/clother
//     axios.get('/api/clother',{params:{code:req.query.code}})
//         .then(function (response2) {
//             res.render('admin/pages/tables/Clother', { clother: response2.data});
//         })
//         .catch(err=>{
//             res.send(err);
//         })
// }
exports.create_clother = (req, res) => {
    res.render('admin/pages/forms/Form_clother');
}
exports.update_clother = (req, res) => {
    axios.get('/api/clother',{params:{id:req.query.id}})
    .then(function (clotherdata) {
        res.render('admin/pages/forms/Form_update_clother',{clother:clotherdata.data});
    })
    .catch(err=>{
        res.send(err);
    })
}
exports.show_clother = (req, res) => {
    axios.get('/api/clother',{params:{id:req.query.id}})
    .then(function (clotherdata) {
        res.render('admin/pages/forms/Show_clother',{clother:clotherdata.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

//balo
exports.admin_balo = (req, res) => {
    //Make a get request to /api/clother

    axios.get('/api/balo',{params:{category:req.query.category,count:req.query.count}})
        .then(function (response) {
            res.render('admin/pages/tables/Balo', { balo: response.data,params:req.query.count});
        })
        .catch(err=>{
            res.send(err);
        })
        
}
exports.create_balo = (req, res) => {
    res.render('admin/pages/forms/Form_balo');
}
exports.update_balo = (req, res) => {
    axios.get('/api/balo',{params:{id:req.query.id}})
    .then(function (balodata) {
        res.render('admin/pages/forms/Form_update_balo',{balo:balodata.data});
    })
    .catch(err=>{
        res.send(err);
    })
}
exports.show_balo = (req, res) => {
    axios.get('/api/balo',{params:{id:req.query.id}})
    .then(function (balodata) {
        res.render('admin/pages/forms/Show_balo',{balo:balodata.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

//watches

exports.admin_watches = (req, res) => {
    //Make a get request to /api/clother

    axios.get('/api/watches',{params:{category:req.query.category,count:req.query.count}})
        .then(function (response) {
            res.render('admin/pages/tables/Watches', { watches: response.data,params:req.query.count});
        })
        .catch(err=>{
            res.send(err);
        })
        
}
exports.create_watches = (req, res) => {
    res.render('admin/pages/forms/Form_watches');
}


exports.update_watches = (req, res) => {
    axios.get('/api/watches',{params:{id:req.query.id}})
    .then(function (watchesdata) {
        res.render('admin/pages/forms/Form_update_watches',{watches:watchesdata.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

exports.show_watches = (req, res) => {
    axios.get('/api/watches',{params:{id:req.query.id}})
    .then(function (watchesdata) {
        res.render('admin/pages/forms/Show_watches',{watches:watchesdata.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

//shoes
exports.admin_shoes = (req, res) => {
    //Make a get request to /api/clother

    axios.get('/api/shoes',{params:{category:req.query.category,count:req.query.count}})
        .then(function (response) {
            res.render('admin/pages/tables/Shoes', { shoes: response.data,params:req.query.count});
        })
        .catch(err=>{
            res.send(err);
        })
        
}
exports.create_shoes = (req, res) => {
    res.render('admin/pages/forms/Form_shoes');
}

exports.update_shoes = (req, res) => {
    axios.get('/api/shoes',{params:{id:req.query.id}})
    .then(function (shoesdata) {
        res.render('admin/pages/forms/Form_update_shoes',{shoes:shoesdata.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

exports.show_shoes = (req, res) => {
    axios.get('/api/shoes',{params:{id:req.query.id}})
    .then(function (shoesdata) {
        res.render('admin/pages/forms/Show_shoes',{shoes:shoesdata.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

//clotherWoman
exports.admin_clotherWoman = (req, res) => {
    //Make a get request to /api/clotherWoman
    axios.get('/api/clotherWoman',{params:{category:req.query.category,count:req.query.count}})
        .then(function (response) {
            res.render('admin/pages/tables/ClotherWoman', { clotherWoman: response.data,params:req.query.count});
        })
        .catch(err=>{
            res.send(err);
        })
}

exports.create_clotherWoman = (req, res) => {
    res.render('admin/pages/forms/Form_clotherWoman');
}
exports.update_clotherWoman = (req, res) => {
    axios.get('/api/clotherWoman',{params:{id:req.query.id}})
    .then(function (clotherWomandata) {
        res.render('admin/pages/forms/Form_update_clotherWoman',{clotherWoman:clotherWomandata.data});
    })
    .catch(err=>{
        res.send(err);
    })
}


exports.Show_clotherWoman = (req, res) => {
    axios.get('/api/clotherWoman',{params:{id:req.query.id}})
    .then(function (clotherWomandata) {
        res.render('admin/pages/forms/Show_clotherWoman',{clotherWoman:clotherWomandata.data});
    })
    .catch(err=>{
        res.send(err);
    })
}


// customer product

exports.product = (req, res) => {
    //Make a get request to /api/clother

    axios.get('/api/allproduct')
        .then(function (response) {
            res.render('customer/product', { products: response.data, title:'Product'});
        })
        .catch(err=>{
            res.send(err);
        })
        
}

// slider customer

exports.create_slide = (req, res) => {
    res.render('admin/pages/forms/Form_slide');
}
exports.admin_slide = (req, res) => {
    //Make a get request to /api/slide
    axios.get('/api/slide',{params:{category:req.query.category,count:req.query.count}})
        .then(function (response) {
            res.render('admin/pages/tables/Slide', { slide: response.data,params:req.query.count});
        })
        .catch(err=>{
            res.send(err);
        })
}

// sliderdown customer

exports.create_slideDown = (req, res) => {
    res.render('admin/pages/forms/Form_slideDown');
}
exports.admin_slideDown = (req, res) => {
    //Make a get request to /api/slide
    axios.get('/api/slide',{params:{category:req.query.category,count:req.query.count}})
        .then(function (response) {
            res.render('admin/pages/tables/SlideDown', { slide: response.data,params:req.query.count});
        })
        .catch(err=>{
            res.send(err);
        })
}
exports.update_slide = (req, res) => {
    axios.get('/api/slide',{params:{id:req.query.id}})
    .then(function (slidedata) {
        res.render('admin/pages/forms/Form_update_slide',{slide:slidedata.data});
    })
    .catch(err=>{
        res.send(err);
    })
}