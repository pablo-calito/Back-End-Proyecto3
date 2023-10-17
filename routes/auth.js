const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { emailExists } = require('../helpers/db-validate');

const router = Router();

router.post('/login', [
    check('email', 'The email is mandatory').not().isEmpty(),
    check('password', 'The password is mandatory').not().isEmpty(),
    validateFields
],login);

module.exports = router;