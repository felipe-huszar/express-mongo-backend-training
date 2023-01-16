const express = require('express');
const author = require('../models/author');
const Author = require('../models/author');
const router = express.Router();

// All authors route
router.get('/', async (req, res) => {
    let searchOptions = {};
    if(req.query.name) {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }

    try {
        const authors = await Author.find(searchOptions);
        res.render('authors/index', { 
            authors: authors,
            searchOptions: req.query
        });
    } catch {
        res.render('/', {            
            errorMessage: 'Error rendering authors'
        })
    }
    res.render('authors/index');
});

// New author route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
});

router.post('/', async (req, res) => {
    const name = req.body.name;
    const author = new Author({
        name: name
    });

    try {
        const newAuthor = await author.save();
        res.redirect('authors');
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author'
        })
    }  
}) 



module.exports = router;