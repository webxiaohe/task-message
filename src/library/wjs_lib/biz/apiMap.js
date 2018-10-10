/**
 * ddn官网接口列表
 */
let config = require('./api')();
 //登录验证
//  config.apiValidateUrl = config.resolveUrl("/passport/validate");

// 添加任务卡
config.AddTaskCardUrl = config.resolveUrl('/api/taskCard/add');
// 获取任务卡列表
config.TaskCardListUrl = config.resolveUrl('/api/taskCard/getList')
export { config } ;