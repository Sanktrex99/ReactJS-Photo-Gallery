const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { json } = require('body-parser');
const axios = require('axios');

/* Intialise an Express App */

const app = express();

app.use(cors());
app.use(json());

const { parsed: config } = dotenv.config();

/*Cloudinary Endpoint string that we need to call from our request */

const BASE_URL = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}`

const auth = {
    username: config.API_KEY,
    password: config.API_SECRET
}


/*Create an endpoint that our React App can call */
/*First Argument of the Get() is the endpoint and it'll go to localhost:7000/photos*/
/*Use axios to create a Request to get the images from Cloudinary 
   Any Query params that you pass onto your node API, will be available in the 'req.query' object*/

app.get('/photos', async (req, res) => {

    const response = await axios.get(BASE_URL + '/resources/image', {
        auth,
        params: {
            next_cursor: req.query.next_cursor
        }
    });

    return res.send(response.data)
});

app.get('/search', async (req, res) => {

    const response = await axios.get(BASE_URL + '/resources/search', {
        auth,
        params: {
            expression: req.query.expression
        }
    });

    return res.send(response.data)
});


/*Tell the node server to what port to listen to */

const PORT = 7000;
app.listen(PORT, function (err) {
    if (err) {
        console.log(err);
    }
    console.log("Server listening on PORT:", PORT);
});


/* Create an environment variable file (.env) to hold the cloudinary connection details */