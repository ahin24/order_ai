const {trackLog} = require('./../services/common.service');

const monitorLog = async(reqData)=>{
    await trackLog(reqData);
}

module.exports = {
    monitorLog
}