const express = require('express');
const router = express.Router();
const JobController = require('../controllers/job.controllers');
const middlewares = require("../middlewares/job.middlewares");
const transformJobsData = require('../middlewares/transformJobsData');

// router.get('/', JobController.getAllJobs);
router.get('/', JobController.getAllJobs, transformJobsData);
router.get('/:id', middlewares.checkExits, JobController.getJobById, transformJobsData);
router.get('/:id/skills', middlewares.checkExits, JobController.getSkillsByJobId);
router.post('/', middlewares.checkExitsByJobTitle, JobController.createJob);
router.post('/:id/skills', JobController.createSkillForJob);
router.put('/:id', middlewares.checkExits, JobController.updateJob);
router.delete('/:id', middlewares.checkExits, JobController.deleteJob);

module.exports = router;