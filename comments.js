// create web server 

// import modules
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// set port
const port = 3000;
const hostname = 'localhost';