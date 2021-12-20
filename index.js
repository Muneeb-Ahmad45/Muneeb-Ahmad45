    const express = require('express')
    require("dotenv").config();
    const bodyParser = require('body-parser')
    const path = require('path')
    const fs = require('fs');
    const app = express();
    var morgan = require('morgan')
    const mongoose = require('mongoose');
    const cors = require('cors');
    
    app.use(morgan('dev'))
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE')
        next();
      });
    app.use(cors({
        origin: ['*'],
        credentials: true
        
    }));

    const userRouter = require('./src/routes/user_route');
    const gameRouter =require('./src/routes/game_route');
    const videoRouter = require('./src/routes/video_route');
    const campaignRouter = require('./src/routes/campaign_route');
    const studioRouter = require('./src/routes/studio_route');
    
    app.use(express.json());
    app.use(express.static('uploads'))
 
    //Database Connection

    mongoose.connect("mongodb://127.0.0.1:27017/botecoDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log("Cannot connect to the database", err));

    // fs.stat('uploads/games/Plain Shirt.jpg', function (err, stats) {
    //     console.log(stats);
     
    //     if (err) {
    //         return console.error(err);
    //     }
     
    //     fs.unlink('uploads/games/Plain Shirt.jpg',function(err){
    //          if(err) return console.log(err);
    //          console.log('file deleted successfully');
    //     });  
    //  });
    
    app.use('/api', userRouter);       
    app.use('/api' , gameRouter);
    app.use('/api' , videoRouter);
    app.use('/api' , campaignRouter);
    app.use('/api' , studioRouter);

    //Server Port 
  
    const port = process.env.PORT || 3000

    app.listen(port, () => console.log(`listening on port ${port}`));