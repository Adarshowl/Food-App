// export const BASE_URL = 'https://masteradmin-zti3.onrender.com/api/'; // with ssl
export const BASE_URL = 'https://www.halalicious.com.au/backend/api/'; // with ssl
// export const BASE_URL = 'http://www.halalicious.com.au/backend/api/'; // with ssl
// export const IMAGE_BASE_URL =  'http://www.halalicious.com.au/backend/uploads/images/'; // without ssl
export const IMAGE_BASE_URL =
  'https://www.halalicious.com.au/backend/uploads/images/'; // with ssl
export const SERVER_KEY = '';

export const API_END_POINTS = {
  // App settings
  API_APP_SETTING: `${BASE_URL}appsetting/list`,
  API_APP_CURRENCY_SETTING: `${BASE_URL}currency/get-admin-currency`,
  // USER Profile Section
  // https://www.halalicious.com.au/backend/api/appauth/app_userlogin
  API_LOGIN: `${BASE_URL}appauth/app_userlogin`,
  API_SIGN_UP: `${BASE_URL}appauth/app_signup`,
  API_SIGN_UP_TEST: {
    url: `${BASE_URL}appauth/app_signup`,
    type: 'POST',
    params: { name: '', email: '', phone: '', password: '' },
    data_type: 'raw/multipart',
  },
  API_GET_PROFILE: `${BASE_URL}appauth/app_getprofile`,
  API_UPDATE_USER_PROFILE: `${BASE_URL}appauth/app_user_update`,
  API_CHANGE_PASSWORD: `${BASE_URL}appauth/app_changepassword`,
  API_DELETE_USER: `${BASE_URL}appauth/delete_user`,

  // restaurant list
  API_GET_NEAREST_RESTAURANT_LIST: `${BASE_URL}food_app/user/app/frontend/near_restaurant_list`,
  API_GET_ACTIVE_RESTAURANT_LIST: `${BASE_URL}food_app/user/app/frontend/active_restaurant_list`,
  API_GET_ACTIVE_RESTAURANT_BY_ID: `${BASE_URL}food_app/user/app/frontend/active_restaurant_list/show/`, // append restaurant id
  API_GET_ACTIVE_CATEGORY_LIST: `${BASE_URL}food_app/user/app/frontend/active_category_list`, // append this in last query params - ?limit=1&page=2
  API_GET_ACTIVE_CATEGORY_BY_ID: `${BASE_URL}food_app/user/app/frontend/active_category_list/show/`, // // append category id


  // COUPON
  API_GET_COUPON_LIST: `${BASE_URL}coupon/list`,

  // User Address
  API_ADD_USER_ADDRESS: `${BASE_URL}users/add_user_address`,
  API_UPDATE_USER_ADDRESS: `${BASE_URL}users/update-user-address`,
  API_USER_ADDRESS_LIST: `${BASE_URL}users/user_address_list`,
  API_USER_ADDRESS_REMOVE_BY_ID: `${BASE_URL}users/remove_user_address/`, // APPEND ID IN LAST

  //   Notification
  API_GET_USER_NOTIFICATION: `${BASE_URL}notification/notification_list`,
  API_UPDATE_NOTIFICATION: `${BASE_URL}notification/show/`, // APPEND  ID IN LAST
  API_USER_STRIPE: `${BASE_URL}user/payment/app_stripe_payment`,

  // Privacy Policy / Terms and Conditions
  // https://www.halalicious.com.au/backend/api/privacyAndTerms/detail
  API_GET_PRIVACY_POLICY: `${BASE_URL}privacyAndTerms/detail`,
  // Fcm Token
  API_FCM_DETAIL: `${BASE_URL}fcmToken/detail`,
  API_FCM_TOKEN_UPDATE: `${BASE_URL}fcmToken/update_fcm_token`,
  API_FCM_TOKEN_DELETE: `${BASE_URL}fcmToken/delete_fcm_token`,

  // variant
  API_GET_VARIANT_ADDONS_BY_ID: `${BASE_URL}food_app/user/app/frontend/active_menu_variants_by_menu_item_id/`, // // append PRODUCT id
};

export const API_TYPE = {
  POST: 'post',
  GET: 'get',
};
