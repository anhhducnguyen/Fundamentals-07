const services = require('../services/job.services');

module.exports.checkExits = async (req, res, next) => {
    try {
        let find = await services.findById(req.params.id);
        if (!find) {
            return res.status(400).json({ message: "Job not found" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports.checkExitsByJobTitle = async (req, res, next) => {
    try {
        let find = await services.checkExitsByJobTitle(req.body.jobTitle);
        if (find) {
            return res.status(400).json({ message: "Job already exists" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

