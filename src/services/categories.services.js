const db = require('../config/database');
const _ = require('lodash'); // Import lodash


class CategorieService {
    static async getAll() {
        return await db('JobCategories').select('*')
    }

    static async getById(id) {
        return await db('JobCategories').select('*').where('id', id);
    }

    static async getJobByIdCategory(id) {
        let result = await db('jobs as j')
            .join('jobcategories as jc', 'j.categoryId', 'jc.id')
            .where('j.categoryId', id)
            .select('jc.category', 'j.jobId', 'j.jobTitle');
    
        let groupedResult = _.map(_.groupBy(result, 'category'), (jobs, categoryName) => ({
            categoryName,
            jobs: jobs.map(job => ({
                jobId: job.jobId,
                jobTitle: job.jobTitle
            }))
        }));
    
        return { categories: groupedResult };
    }

    static async findById(id) {
        return await db('JobCategories').where('id', id).first();
    }

    static async create(data) {
        return await db('JobCategories').insert(data);
    }

    static async update(id, data) {
        return await db('JobCategories').update(data).where('id', id);
    }

    static async delete(id) {
        return await db('JobCategories').delete().where('id', id);
    }
}

module.exports = CategorieService;
