const BaseController = require('./base.controllers');
const JobService = require('../services/job.services');
const transformJobsData = require('../middlewares/transformJobsData');


class JobController {
    // static async getAllJobs(req, res){
    //     try {
    //         const jobs = await JobService.getAllJobs();
    //         // const jobs = await JobService.getAll();
            
    //         return BaseController.successResponse(res, jobs, 'Get all jobs successfully');
    //     } catch (error) {
    //         return BaseController.errorResponse(res, error);
    //     }
    // }

    static async getAllJobs(req, res, next) {
        try {
            let jobsData = await JobService.getAllJobs(); // Lấy dữ liệu từ Service
            req.rawJobsData = jobsData; // Gán dữ liệu vào request object
            next(); // Chuyển sang Middleware xử lý dữ liệu
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" }); 
        }
    }
    static async getJobById(req, res, next) {
        try {
            const job = await JobService.getJobById(req.params.id);
            if (!job) {
                return BaseController.errorResponse(res, "Job not found", 404); // ✅ Chỉ gửi response một lần
            }
            req.rawJobsData = job;
            next();
            return BaseController.successResponse(res, job, 'Get one job successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async getSkillsByJobId(req, res) {
        try {
            const skills = await JobService.getSkillsByJobId(req.params.id);
            return BaseController.successResponse(res, skills, 'Get one skills by jobId successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async createJob(req, res) {
        try {
            const newJob = await JobService.create(req.body);
            return BaseController.successResponse(res, newJob, 'Create job successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async updateJob(req, res) {
        try {
            const job = await JobService.update(req.params.id, req.body);
            return BaseController.successResponse(res, job, 'Update job successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async deleteJob(req, res) {
        try {
            const job = await JobService.delete(req.params.id);
            return BaseController.successResponse(res, job, 'Delete job successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async createSkillForJob(req, res) {
        try {
            const newSkill = await JobService.createSkillForJob(req.params.id, req.body);
            return BaseController.successResponse(res, newSkill, 'Create skill for job successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    }
}

module.exports = JobController;