const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override')
const connectDB = require('./server/database/connection');
const cors = require('cors')
const app = express();

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 3000

//log request
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
//MongoDB connection
connectDB();

//parse request to body-parse
app.use(bodyParser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs")
// app.set("views", path.resolve(__dirname),"views/ejs"))
app.use(cors());
//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/assets_customer/css")))
app.use('/fonts',express.static(path.resolve(__dirname,"assets/assets_customer/fonts")))
app.use('/images',express.static(path.resolve(__dirname,"assets/assets_customer/images")))
app.use('/js',express.static(path.resolve(__dirname,"assets/assets_customer/js")))
app.use('/vendor',express.static(path.resolve(__dirname,"assets/assets_customer/vendor")))

app.use('/assets_admin_css',express.static(path.resolve(__dirname,"assets/assets_admin/css")))
app.use('/assets_admin_fonts',express.static(path.resolve(__dirname,"assets/assets_admin/fonts")))
app.use('/assets_admin_images',express.static(path.resolve(__dirname,"assets/assets_admin/images")))
app.use('/assets_admin_js',express.static(path.resolve(__dirname,"assets/assets_admin/js")))
app.use('/assets_admin_vendors',express.static(path.resolve(__dirname,"assets/assets_admin/vendors")))

//load routes
app.use('/',require('./server/routes/routes'))


app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)})
