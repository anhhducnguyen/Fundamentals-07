const services = require('../services/categories.services');

module.exports.checkExits = async (req, res, next) => {
    try {
        let find = await services.findById(req.params.id);
        if (!find) {
            return res.status(400).json({ message: "Category not found" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}



