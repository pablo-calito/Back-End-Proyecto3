const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, userRegistration } = require('../controllers/user');
const { postUser } = require('../controllers/user');
const { putUser } = require('../controllers/user');
const { deleteUser } = require('../controllers/user');

const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/show', getUsers);



router.put('/edit/:id', [

] ,putUser);

router.delete('/delete/:id', [

] ,deleteUser);

router.post('/register', [
    check('name', 'The name is required to register').not().isEmpty(),
    check('lastname', 'Last name is required to register').not().isEmpty(),
    check('password', 'Password is required to register').not().isEmpty(),
    check('email', 'Email is required to register').not().isEmpty(),
    check('phoneNumber', 'The phone number is required to register').not().isEmpty(),
    validateFields
], userRegistration)

module.exports = router;