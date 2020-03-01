const router = require('express').Router();

const jobAdd = require('./jobAdd');
const jobRetry = require('./jobRetry');
const jobRemove = require('./jobRemove');
const login = require('./login');
const bulkJobsRemove = require('./bulkJobsRemove');
const bulkJobsRetry = require('./bulkJobsRetry');

const auth = require('../../middleware/auth');

router.post('/login', login);
router.post('/queue/:queueHost/:queueName/job', auth.rejectOnNotLogged, jobAdd);
router.post('/queue/:queueHost/:queueName/job/bulk', auth.rejectOnNotLogged, bulkJobsRemove);
router.patch('/queue/:queueHost/:queueName/job/bulk', auth.rejectOnNotLogged, bulkJobsRetry);
router.patch('/queue/:queueHost/:queueName/job/:id', auth.rejectOnNotLogged, jobRetry);
router.delete('/queue/:queueHost/:queueName/job/:id', auth.rejectOnNotLogged, jobRemove);

module.exports = router;
