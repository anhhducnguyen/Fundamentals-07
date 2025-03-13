const _ = require('lodash');

const transformJobData = (req, res, next) => {
    try {
        if (!req.rawJobsData) {
            return res.status(400).json({ message: "No job data found" });
        }

        let groupedJobs = _.groupBy(req.rawJobsData, 'jobId');

        let jobs = _.map(groupedJobs, (items) => {
            const baseInfo = items[0];

            return {
                jobId: baseInfo.jobId,
                jobTitle: baseInfo.jobTitle,
                jobDescription: baseInfo.jobDescription,
                jobRequirement: baseInfo.jobRequirement,
                salaryMin: baseInfo.salaryMin,
                salaryMax: baseInfo.salaryMax,
                skills: _.uniq(items.map(i => i.skill)),
                category: baseInfo.category,
                location: baseInfo.location,
                company: {
                    companyId: baseInfo.companyId,
                    name: baseInfo.name,
                    logo: baseInfo.logo,
                },
                benefits: _.uniqBy(items.map(i => ({
                    benefitName: i.benefitName,
                    benefitValue: i.benefitValue
                })), 'benefitName')
            };
        });

        return res.json(jobs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = transformJobData;
