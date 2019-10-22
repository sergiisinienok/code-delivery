const splitIds = (ids = '') => ids.replace(/\s/g, '').split(',');

module.exports.getSecurityGroupIds = () => splitIds(process.env.VPC_SECURITY_GROUP_IDS || '');
module.exports.getSubnetIds = () => splitIds(process.env.ELB_SUBNETS || '');
