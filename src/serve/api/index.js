// import ajax from './ajax'
import { getAction, postAction, putAction, deleteAction } from '@/serve/ajax'

/*****Home 模块*******/
export const getHomeData = () => getAction('homeApi')
// 特色专区
export const getHomeSpecialZone = () => getAction('homeApi/specialZone')

/***** 分类(Category) 模块 *******/
// Category 列表页面数据
export const getCategoryData = () => getAction('homeApi/categories')

// Category 右边内容页面数据 需要根据左边点击传值
export const getCategoryDetailData = (params) => getAction('homeApi/categoriesdetail', params)

/***** 吃什么 模块 *******/
// 今日菜单的所有菜单分类
export const getTodayMenuCategoryList = () => getAction('recipe/allScene')
// 菜品菜单
export const getTodayMenuDetail = (params) => getAction('recipe/menulist', params)

/***** 购物车页面 猜你喜欢*********/
export const getGuessYouLike = () => getAction('cart/youlike')

/***** 登录界面接口 *********/
// 1.获取手机验证码(GET)
// Easy Mock 模拟发送验证码
export const getPhoneCaptcha = (phoneNumber) => getAction('send_code', {
  phoneNumber
})

// 2.手机验证码登录(POST)
// Easy Mock 模拟用户登录
export const phoneCaptchaLogin = (phone, captcha) => postAction('login_code', {
  phone,
  captcha
})

// 3.账号密码登录(POST)
export const pwdLogin = (userName, pwd, captcha) => postAction('login_pwd', {
  userName,
  pwd,
  captcha
})

/***** 个人中心 *********/
// 1.绿卡Vip
export const getVipContent = () => getAction('vip')
