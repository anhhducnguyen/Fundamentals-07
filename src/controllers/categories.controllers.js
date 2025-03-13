const BaseController = require('./base.controllers');
const CategoryService = require('../services/categories.services');

class CategoryController extends BaseController {
    static async getAllCategory(req, res) {
        try {
            const categories = await CategoryService.getAll();
            return BaseController.successResponse(res, categories, 'Get all categories successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async getCategoryById(req, res) {
        try {
            const categories = await CategoryService.getById(req.params.id);
            return BaseController.successResponse(res, categories, 'Get one category successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async getJobByIdCategory(req, res) {
        try {
            const categories = await CategoryService.getJobByIdCategory(req.params.id);
            return BaseController.successResponse(res, categories, 'Get all job by category successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    }

    static async createCategory(req, res) {
        try {
            const categories = await CategoryService.create(req.body);
            return BaseController.successResponse(res, categories, 'Create category successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async updateCategory(req, res) {
        try {
            const categories = await CategoryService.update(req.params.id, req.body);

            return BaseController.successResponse(res, categories, 'Update successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };

    static async deleteCategory(req, res) {
        try {
            const categories = await CategoryService.delete(req.params.id);
            return BaseController.successResponse(res, categories, 'Delete successfully');
        } catch (error) {
            return BaseController.errorResponse(res, error);
        }
    };
}

module.exports = CategoryController;
