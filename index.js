const express= require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const methodOverride = require('method-override');

if(process.env.NODE_ENV !='production')
 require('dotenv').config();


mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const guestRoutes = require('./routes/guestRoutes');


app.get('/', (req, res) => {
    res.redirect('/guests');
});


app.use(guestRoutes);



app.listen(process.env.PORT || 3000, (req, res) => {
    console.log('server running at port 3000');
});