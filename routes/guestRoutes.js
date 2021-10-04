const express = require('express');
const sgmail=require('@sendgrid/mail');
const router = express.Router();
const Guest = require('../models/guest');

const api_key=process.env.API_KEY;
sgmail.setApiKey(api_key);


// Get all the guest details
router.get('/guests', async(req, res) => {
    
    const guests = await Guest.find({});

    res.render('guests/index',{guests});
});

// Get the new from to create new guest 
router.get('/guests/new', (req, res) => {
    res.render('guests/new');
});

// create a new guest with the given payload
router.post('/guests', async (req, res) => {
    
    const newGuest = {
        ...req.body
    };
    await Guest.create(newGuest);
    const receiver=newGuest.mail;
    const inmsg={
    to:receiver,
    from:process.env.MY_MAIL,
    subject:"Welcome to Palki hotel",
    text:"WE warm heartedly welcome u in our hotel.U will love it here...."
};
sgmail.send(inmsg)
.then((res)=>console.log("check in successfully"))
.catch((err)=>console.log(err))
    res.redirect('/guests');
});

// getting the edit form prefilled with the data
router.patch('/guests/:id/edit', async (req, res) => {
    
    const { id } = req.params;

    const guest = await Guest.findById(id);

    res.render('guests/edit', { guest });
});


// updating the guest with the given payload
router.patch('/guests/:id', async (req, res) => {
    
    const updatedGuest = req.body;
    const { id } = req.params;

    await Guest.findByIdAndUpdate(id, updatedGuest);
 const receiver=updatedGuest.mail;
    const outmsg={
    to:receiver,
    from:process.env.MY_MAIL,
    subject:"Thanks for visiting Us",
    text:"it was a good time spent with u...hope u come back soon."
};
sgmail.send(outmsg)
.then((res)=>console.log("checkout successfully"))
.catch((err)=>console.log(err))
    res.redirect('/guests');
});
//deleting a guest
router.delete('/guests/:id', async (req, res) => {
    
    const { id } = req.params;
    await Guest.findOneAndDelete(id);
    res.redirect("/guests");
});


module.exports = router;