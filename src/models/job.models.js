const BaseModel = require('./base.models');

class CompanyModel extends BaseModel {
    constructor(){
        super('jobs');  
    }
}

module.exports = new CompanyModel;