const router = require('express').Router();

const queueList = require('./queueList');
const queueDetails = require('./queueDetails');
const queueJobsByState = require('./queueJobsByState');
const jobDetails = require('./jobDetails');
const login = require('./login');

const auth = require('../../middleware/auth');

router.get('/', auth.redirectOnNotLogged, queueList);
router.get('/login', login);
router.get('/:queueHost/:queueName', auth.redirectOnNotLogged, queueDetails);
router.get('/:queueHost/:queueName/:state(waiting|active|completed|succeeded|failed|delayed)\.:ext?', auth.redirectOnNotLogged, queueJobsByState);
router.get('/:queueHost/:queueName/:id', auth.redirectOnNotLogged, jobDetails);

module.exports = router;
