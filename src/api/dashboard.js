import request from '@/utils/request'

//http://shop.test.9now.net/msk/api/mboss.proxy?action=pc/index/queryShopSetmeal
export function PostDashboardList(data) {
  return request({
    url: '/',
    method: 'post',
    params: {
      action: "pc/index/queryShopSetmeal",
    },
    data:{"handlePath":"pc/index/queryShopSetmeal","access-token":"3332c8ho7161qoutidpprn86l5","page-token":"3332c8ho7161qoutidpprn86l5"},
  })
}
