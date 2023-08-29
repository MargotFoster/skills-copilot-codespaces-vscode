// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

// Import model
const Dishes = require('../models/dishes');

// Create router
const commentRouter = express.Router();

// Use body-parser to parse data
commentRouter.use(bodyParser.json());

// Configure route for '/'
commentRouter.route('/')
// GET: List all comments
.get((req, res, next) => {
    Dishes.find({})
    .populate('comments.author')
    .then(dishes => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, err => next(err))
    .catch(err => next(err));
})
// POST: Create new comment
.post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /comments');
})
// PUT: Update all comments
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /comments');
})
// DELETE: Delete all comments
.delete(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /comments');
});

// Configure route for '/:commentId'
commentRouter.route('/:commentId')
// GET: Get comment with commentId
.get((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then(dish => {
        if (dish && dish.comments.id(req.params.commentId)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId));
        }
        else if (!dish) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, err => next(err))
    .catch(err => next(err));
})
// POST: Create new comment with commentId
.post(authenticate.verifyUser, (req,