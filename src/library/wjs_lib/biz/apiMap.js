/**
 * ddn官网接口列表
 */
let config = require('./api')();
 //登录验证
//  config.apiValidateUrl = config.resolveUrl("/passport/validate");

// 添加任务卡
config.AddTaskCardUrl = config.resolveUrl('/api/taskCard/add');
// 获取任务卡列表
config.TaskCardListUrl = config.resolveUrl('/api/taskCard/getList');
// 获取任务卡详情
config.TaskCardGetOne = config.resolveUrl('/api/taskCard/getOne');
// 获取个人信息
config.UserInforUrl = config.resolveUrl('/api/userExtend/getOne');
// 获取部门列表
config.DepartmentListUrl = config.resolveUrl('/api/department/getList');
// 修改个人扩展信息
config.UserInforEditUrl = config.resolveUrl('/api/userExtend/update');
export { config } ;