
import axios from '../axios/axios.js'

let host = "https://wx.mjk24.com/v1";

//login_form
export const loginForm = params => { return axios.post(`${host}/form/account/login/`, params)}

//account_key
export const accountKey = params => { return axios.get(`${host}/account/key/`, params)}

//隐私政策
export const getPrivacy = params => { return axios.get(`${host}/account/privacy/info/search/`, params) }

// 登录
export const login = params => { return axios.post(`${host}/account/login/`, params) }

// 登出
export const logout = params => { return axios.post(`${host}/account/logout/`, params) }

//物品携出详情
export const goodsRecordDetail = params => { return axios.get(`${host}/goodsrecord/info/${params.id}/`, params)};

// 注册表单
export const registerForm = params => { return axios.post(`${host}/form/account/register/`, params) }

// 注册
export const register = params => { return axios.post(`${host}/account/register/`, params) }

//厂区地点
export const reviewlist = params => { return axios.get(`${host}/system/register_list/`, params) }

//审批注册详情
export const registerinfo = params => { return axios.get(`${host}/system/register_info/`, {params: params}) }

//审批角色
export const systemrole = params => { return axios.get(`${host}/system/role/`, params) }

//审批角色不通过
export const regfailed = params => { return axios.post(`${host}/system/register_info/un_apply/`, params) }

//审批角色通过
export const regpass = params => { return axios.post(`${host}/system/register_info/apply/`, params) }

/* 访客
 *
 */
//新增访客
export const addvisitor = params => { return axios.post(`${host}/event/appointment/param/`, params) }

//新增散客预约
export const addfit = params => { return axios.post(`${host}/account/self_appointment/`, params) }

//新增散客预约
export const fitrecord = params => { return axios.post(`${host}/account/self_appointment/userinfo/`, params) }

// 来访事由
export const reasons = params => { return axios.get(`${host}/system/reason/param/`, params) }

// 来访事由  不带token
export const reasonList = params => { return axios.get(`${host}/account/reason_list/`, params) }

//厂区地点
export const location = params => { return axios.get(`${host}/event/factory_list/`, params) }

//厂区地点
export const Locationlist = params => { return axios.get(`${host}/account/factory_list/`, params) }

// 装卸货
// 货物类型
export const goodstypes = params => { return axios.get(`${host}/system/goodstype/param/`, params) }

// 装卸类型
export const cargotypes = params => { return axios.get(`${host}/event/cargoruntype_list/`, params) }

// 装卸区域
export const cargoareas = params => { return axios.get(`${host}/system/location/param/`, params) }

// 被访人
export const interviewee = params => { return axios.get(`${host}/event/interviewee/`, params) }

// 装卸货预约
export const addcargo = params => { return axios.post(`${host}/event/appointment/`, params)}

// 已预约访客
export const booklist = params => { return axios.get(`${host}/event/appointment/param/`, params) }

// 散客申请列表
export const fitlist = params => { return axios.get(`${host}/event/self_appointment/`, {params: params}) }

// 预约详情
export const reserved = params => { return axios.get(`${host}/event/appointment/detail/`, {params: params}) }

//散客预约详情
export const fitreview = params => { return axios.get(`${host}/event/self_appointment/detail/`, {params: params}) }

//同意散客预约
export const fitpermit = params => { return axios.post(`${host}/event/self_appointment/apply/`, params) }

//同意散客预约
export const fitback = params => { return axios.post(`${host}/event/self_appointment/un_apply/`, params) }

// 取消预约
export const cancel = params => { return axios.post(`${host} /event/appointment/disabled/`, params) }

// 激活预约
export const active = params => { return axios.post(`${host}/event/appointment/enabled/`, params) }

// 已进厂
export const enterlist = params => { return axios.get(`${host}/event/appointment/enter_record/`, params) }


// 已进厂
export const enterdetail = params => { return axios.get(`${host}/event/appointment/enter_record/detail/`, {params: params}) }

//允许离厂
export const permit = params => { return axios.post(`${host}/event/myvisitor/sure/`, params) }
// export const permit = params => { return axios.post(`${host}/event/appointment/enter_record/detail/`, params) }
/* 物品携出
 *
 */
// 审批人名单
export const approver = params => { return axios.get(`${host}/carry_out/goods_record/people/`, params) }

// 物品清单
// export const goodslist = params => { return axios.get(`${host}/carry_out/goods_list/`, params) }

// 物品携出提交
export const newcarryout = params => { return axios.post(`${host}/carry_out/goods_record/`, params) }


// 物品待处理数量
export const count = params => { return axios.get(`${host}/carry_out/goods_record/audit/`, params) }

// 物品携出待处理列表
export const carryoutlist = params => { return axios.get(`${host}/carryout/goodsrecord/param/`, params) }

// 物品携出待审批列表
export const carryoutexam = params => { return axios.get(`${host}/carryout/goodsrecordaudit/param/`, params) }

// 物品携出待处理列表
export const carryoutreview = params => { return axios.get(`${host}/carryout/goodsrecord/param/id/`, params) }


// 拒绝物品携出审批
export const carryoutrej = params => { return axios.post(`${host}/carry_out/goods_record/audit/un_apply/`, params) }

// 同意物品携出审批
export const carryoutagree = params => { return axios.post(`${host}/carry_out/goods_record/audit/apply/`, params) }

// 物品携出记录
export const carryoutrecord = params => { return axios.get(`${host}/carry_out/goods_record/`, params) }

// 物品携出详情
export const carryoutdetail = params => { return axios.get(`${host}/carry_out/goods_record/info/`, {params: params}) }

//确认出厂
export const carryOutSure = params => { return axios.post(`${host}/event/goodsrecord/sure/param/`, params) }

//卡证查询
export const carryOutCard = params => { return axios.post(`${host}/carryout/card/param/`, params) }

//忘记密码页
export const forgetForm = params => { return axios.post(`${host}/account/forget/form/`, params)}

//忘记密码提交
export const forgetFormAdmit = params => { return axios.post(`${host}/account/forget/step/one/`, params)}

//找回密码
export const findForm = params => { return axios.post(`${host}/account/forget/step/two/form/`, params)}

//找回密码提交
export const findFormAdmit = params => { return axios.post(`${host}/account/forget/step/two/`, params)}

//我的日志
export const  myLog = params => { return axios.get(`${host}/log/info/param/`,params)};

//罚单-已开罚单
export const  ticketRecord = params => { return axios.get(`${host}/ticket/record/param/`,params)};

// 已离厂
export const leavedetail = params => { return axios.get(`${host}/event/accessrecord/param/id/`,params)};

// 施工管理—人员-列表
export const constructStaffList = params => { return axios.get(`${host}/construction/staff/param/`,params)};

// 施工管理—人员-待审批列表
export const constructStaffExamining = params => { return axios.get(`${host}/construction/staff/param/`,params)};

//施工管理—待审批
export const constructToExamin = params => { return axios.get(`${host}/construction/staffrecord/param/`,params)};

//施工管理—获得注意事项
export const constructAttention = params => { return axios.get(`${host}/construction/project/attention/`,params)};

//施工管理—承包商列表
export const constructList = params => { return axios.get(`${host}/construction/contractor/param/`,params)};

//施工管理—项目列表
export const constructProjectList = params => { return axios.get(`${host}/construction/project/param/`,params)};

//施工管理—项目列表
export const constructProjectToexam = params => { return axios.get(`${host}/construction/projectaudit/param/`,params)};

//施工管理—项目列表
export const constructMyExaminProject = params => { return axios.get(`${host}/construction/projectrecord/param/`,params)};

//
export const constructCheckList = params => { return axios.get(`${host}/construction/checklist/param/`,params)};

//
export const constructSubProject = params => { return axios.get(`${host}/construction/workpermit/param/`,params)};

//
export const  ticketRecordForm = params => { return axios.post(`${host}/form/ticket/record/`,params)}

//罚单-新建罚单
export const  newTicket = params => { return axios.post(`${host}/ticket/record/param/`,params)}

//
export const countMyTicket = params => { return axios.get(`${host}/ticket/myrecord/param/`,  {params: params}) }

export const countAllTicket = params => { return axios.get(`${host}/ticket/allrecord/param/`,  {params: params}) }

//
export const countTicket = params => { return axios.get(`${host}/ticket/record/param/`,  {params: params}) }

//
export const carryGoodsRecordInfo = params => { return axios.get(`${host}/carryout/goodsrecord/info/`,  {params: params}) }

//日志-标签
export const logTag = params => { return axios.get(`${host}/system/tags/param`,  {params: params}) }

//施工人员
export const construct_worker = params => { return axios.get(`${host}/event/staff/worker/`,  {params: params}) }

//厂区地点
export const eventData = params => { return axios.get(`${host}/event/data/info/`,  {params: params}) }

//内部培训-我的培训列表
export const myTrainingList = params => { return axios.get(`${host}/in_training/my_training/`,params)};

//内部培训-我的培训记录
export const myTrainingRecord = params => { return axios.get(`${host}/in_training/myrecord/param/`,params)};

//内部培训-我的培训证书
export const myTrainingCertificate = params => { return axios.get(`${host}/in_training/certificate/param/`,params)};

//内部培训-浏览培训资料
export const getMaterial = params => { return axios.get(`${host}/in_training/materials/in/`,params)};

//内部培训-考试
export const getPaper = params => { return axios.get(`${host}/in_training/papers/in/`,params)};

//内部培训-试卷提交
export const postAnswer = params => { return axios.post(`${host}/in_training/answer/`,params)};

//内部培训-培训权限
export const getTrainingPermission = params => { return axios.get(`${host}/in_training/training/info/`,params)};

//入厂培训-浏览培训资料
export const getOutMaterial = params => { return axios.get(`${host}/training/materials/out/`,params)};

//入厂培训-考试
export const getOutPaper = params => { return axios.get(`${host}/training/papers/out/`,params)};

//入厂培训-试卷提交
export const postOutAnswer = params => { return axios.post(`${host}/training/answer/`,params)};

//巡检-获取厂区
export const getFactory = params => { return axios.get(`${host}/system/factory/info/`,params)};

//巡检-获取所有巡检排班信息
export const getPlanInfo = params => { return axios.get(`${host}/inspection/plan/info/`,params)};

//巡检-获取所有巡检排班信息
export const getArea = params => { return axios.get(`${host}/inspection/area/param/`,params)};

//巡检-当天巡检排班
export const getMyPlan = params => { return axios.get(`${host}/inspection/plan/param/`,params)};

//巡检-获取随机巡检路线
export const getRandomRoute = params => { return axios.post(`${host}/inspection/plan/random/`,params)};

//巡检-我的巡检记录
export const getMyRecord = params => { return axios.get(`${host}/inspection/myrecord/param/`,params)};

//巡检-巡检详情
export const getMyRecordDetail = params => { return axios.get(`${host}/inspection/myrecord/param/${params.id}/`, params)};

//巡检——点位详情
export const areaDetail = params => { return axios.get(`${host}/inspection/area/param/${params.id}/`, params)};

//巡检-扫描点位
export const doArea = params => { return axios.post(`${host}/inspection/do/`,params)};

//巡检-结束巡检
export const stopInspection = params => { return axios.post(`${host}/inspection/stop/`,params)};

