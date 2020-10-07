/* eslint-disable no-unused-vars */
const express = require('express');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    })
});

const create = router.post('/', (req, res, next) => {
    const body = req.body;
    res.status(201).json(body);
});

const update = router.patch('/:id', (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    res.status(200).json({ id: id, item: body });
});


const remove = router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    const body = req.body;
    res.status(200).json({ id, item: body });
});


app.use('/', route);
app.use('/products', create);
app.use('/products', update);
app.use('/products', remove);

module.exports = app;