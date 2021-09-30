const express = require('express');
const router = express.Router();
const uuid = require('uuid');

let users = [];

router.get('/list', (req, res) => {
    res.json(users);
});

router.post('/create', (req, res) => {
    const userId = uuid.v4();
    const newUser = req.body;
    newUser._id = userId;
    users.push(newUser);
    res.json(req.body);
});

router.put('/update/id', (req, res) => {
    const userFromReq = req.body;
    const id = req.params.id;
    const userToUpdate = users.filter(user => user._id === userFromReq._id);
    users = users.filter(user => user._id !== id)
    users = users.map(user => {
        if (user._id === userToUpdate[0]._id) {
            user.name = userFromReq.name;
            user.birth = userFromReq.birth;
            user.gender = userFromReq.gender;
            user.cpf = userFromReq.cpf;
            user.start = userFromReq.start;
            user.team = userFromReq.team;
        }        
        return user;
    });
    res.json(users);
});

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    users = users.filter(user => user._id !== id);
    res.json(users);
});

module.exports = router;