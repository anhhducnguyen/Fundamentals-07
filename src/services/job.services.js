const JobModel = require("../models/job.models");
const db = require("../config/database");
const _ = require('lodash');
const transformJobData = require('../middlewares/transformJobsData');

class JobService {

    static async getAll() {
        return await JobModel.getAll();
    }

    static async checkExitsByJobTitle(jobTitle) {
        return await db('jobs').where('jobTitle', jobTitle).first();
    }

    static async getAllJobs() {
        try {
            let result = await db('jobs as j')
                .join('jobSkills as jk', 'j.jobId', 'jk.jobId')
                .join('jobCategories as jc', 'j.jobId', 'jc.jobId')
                .join('companies as c', 'j.companyId', 'c.companyId')
                .join('jobBenefits as b', 'b.jobId', 'j.jobId')
                .join('jobLocations as jl', 'jl.jobId', 'j.jobId')
                .select('*');

            return result; 
        } catch (error) {
            console.error(error);
            throw error; 
        }
    }

    static async create(data) {
        return await JobModel.create(data);
    }

    static async update(id, data) {
        return await JobModel.update(id, data);
    }

    static async delete(id) {
        return await JobModel.delete(id);
    }

    static async findById(id) {
        return db('jobs').where('jobId', id).first();
    }

    // static async getAllJobs(){
    //     try {
    //         let result = await db('jobs as j')
    //             .join('jobSkills as jk', 'j.jobId', 'jk.jobId')
    //             .join('jobCategories as jc', 'j.jobId', 'jc.jobId')
    //             .join('companies as c', 'j.companyId', 'c.companyId')
    //             .join('jobBenefits as b', 'b.jobId', 'j.jobId')
    //             .join('jobLocations as jl', 'jl.jobId', 'j.jobId')
    //             .select('*');
    //         console.log(result);

    //         // Sử dụng lodash groupBy để nhóm theo jobId
    //         let groupedJobs = _.groupBy(result, 'jobId');

    //         // Dùng map để tái cấu trúc dữ liệu
    //         let jobs = _.map(groupedJobs, (items, jobId) => {
    //             // Lấy phần tử đầu tiên làm mẫu chung
    //             const baseInfo = items[0];

    //             return {
    //                 jobId: baseInfo.jobId,
    //                 jobTitle: baseInfo.jobTitle,
    //                 jobDescription: baseInfo.jobDescription,
    //                 jobRequirement: baseInfo.jobRequirement,
    //                 salaryMin: baseInfo.salaryMin,
    //                 salaryMax: baseInfo.salaryMax,
    //                 skills: _.uniq(items.map(i => i.skill)), // loại bỏ trùng lặp skill
    //                 category: baseInfo.category,
    //                 location: baseInfo.location,
    //                 company: {
    //                     companyId: baseInfo.companyId,
    //                     name: baseInfo.name,
    //                     logo: baseInfo.logo,
    //                 },
    //                 benefits: _.uniqBy(items.map(i => ({
    //                     benefitName: i.benefitName,
    //                     benefitValue: i.benefitValue
    //                 })), 'benefitName') // loại bỏ trùng lặp benefit
    //             };
    //         });

    //         console.log(jobs);
    //         return jobs;

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // static async getJobById(id){
    //     try{    
    //         let result = await db('jobs as j')
    //         .join('jobSkills as jk', 'j.jobId', 'jk.jobId')
    //         .join('jobCategories as jc', 'j.jobId', 'jc.jobId')
    //         .join('companies as c', 'j.companyId', 'c.companyId')
    //         .join('jobBenefits as b', 'b.jobId', 'j.jobId')
    //         .join('jobLocations as jl', 'jl.jobId', 'j.jobId')
    //         .where('j.jobId', id)
    //         .select('*');

    //         // Sử dụng lodash groupBy để nhóm theo jobId
    //         let groupedJobs = _.groupBy(result, 'jobId');

    //         // Dùng map để tái cấu trúc dữ liệu
    //         let jobs = _.map(groupedJobs, (items, jobId) => {
    //             // Lấy phần tử đầu tiên làm mẫu chung
    //             const baseInfo = items[0];

    //             return {
    //                 jobId: baseInfo.jobId,
    //                 jobTitle: baseInfo.jobTitle,
    //                 jobDescription: baseInfo.jobDescription,
    //                 jobRequirement: baseInfo.jobRequirement,
    //                 salaryMin: baseInfo.salaryMin,
    //                 salaryMax: baseInfo.salaryMax,
    //                 skills: _.uniq(items.map(i => i.skill)), // loại bỏ trùng lặp skill
    //                 category: baseInfo.category,
    //                 location: baseInfo.location,
    //                 company: {
    //                     companyId: baseInfo.companyId,
    //                     name: baseInfo.name,
    //                     logo: baseInfo.logo,
    //                 },
    //                 benefits: _.uniqBy(items.map(i => ({
    //                     benefitName: i.benefitName,
    //                     benefitValue: i.benefitValue
    //                 })), 'benefitName') // loại bỏ trùng lặp benefit
    //             };
    //         });

    //         // console.log(jobs);
    //         return jobs;

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    static async getJobById(id){
        try{    
            let result = await db('jobs as j')
            .join('jobSkills as jk', 'j.jobId', 'jk.jobId')
            .join('jobCategories as jc', 'j.jobId', 'jc.jobId')
            .join('companies as c', 'j.companyId', 'c.companyId')
            .join('jobBenefits as b', 'b.jobId', 'j.jobId')
            .join('jobLocations as jl', 'jl.jobId', 'j.jobId')
            .where('j.jobId', id)
            .select('*');

            return result;

        } catch (error) {
            console.log(error);
        }
    }

    static async getSkillsByJobId(id){
        return db('jobs as j')
        .join('jobSkills as jk', 'j.jobId', 'jk.jobId')
        .where('j.jobId', id)
        .select('jk.*')
    }

    static async createSkillForJob(id, skill){
        return db('jobSkills').insert(skill).where('jobId', id);
    }
}

module.exports = JobService;
