const express = require('express');
const router = express.Router();





// Welcome Page
router.get('/', (req, res) => res.render('home',{
    title: 'Home',
    flights: null
  }));


app.get("/about", (req, res)=>{
    try {
        res.send("About directory.");
        //CODE fetch information

    } catch (error) {
        console.log(error);
    }
})



module.exports = router;