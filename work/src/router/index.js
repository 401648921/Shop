import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/admin'
    },
    {
      path: '/manage',
      component: () => import('../components/shop/manager/manage-nav.vue'),
      children:[
        {
          path:'/manage',
          redirect:'/manage/managePage'
        },
        {
          path:'/manage/managePage',
          component: () => import('../components/shop/manager/managePage.vue')
        },
        {
          path:'/manage/manageGoodsPage',
          component: () => import('../components/shop/manager/manageGoodsPage.vue')
        },
        {
          path:'/manage/manageInformation',
          component: () => import('../components/shop/manager/manageInformation.vue')
        },
        {
          path:'/manage/goodsManage',
          component: () => import('../components/shop/manager/goodsManage.vue')
        },
        {
          path:'/manage/complaintManage',
          component: () => import('../components/shop/manager/complaint.vue')
        },
        {
          path:'/manage/userManage',
          component: () => import('../components/shop/manager/userManage.vue')
        },
        {
          path:'/manage/refund',
          component: () => import('../components/shop/manager/refund.vue')
        },
        {
          path:'/manage/refundManage',
          component: () => import('../components/shop/manager/refundManage.vue')
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('../components/admin/Header.vue'),
      children:[
        {
          path:'/',
          redirect:'/admin/sign'
        },
        {
          path:'/admin/login',
          component:() => import('../components/admin/loginFrom.vue')
        },
        {
          path:'/admin/sign',
          component:() => import('../components/admin/signFrom.vue')
        },
        {
          path:'/admin/resetUser',
          component:() => import('../components/admin/resetPassword.vue')
        },
        {
          path:'/admin/signByEmail',
          component:() => import('../components/admin/signFromByEmail.vue')
        },
        {
          path:'/admin/manageLogin',
          component:() => import('../components/admin/manageLogin.vue')
        }
      ]
    },
    {
      path: '/shop',
      component: () => import('../components/shop/shop-nav.vue'),
      children:[
        {
          path:'/shop',
          redirect:'/shop/homePage'
        },
        {
          path:'/shop/myGoods',
          component:() => import('../components/shop/myGoods.vue')
        },
        {
          path:'/shop/modifyGoods',
          component:() => import('../components/shop/modifyGoods.vue')
        },
        {
          path:'/shop/homePage',
          component:() => import('../components/shop/shopHome.vue')
        },
        {
          path:'/shop/myShop',
          component:() => import('../components/shop/myShop.vue')
        },
        {
          path:'/shop/myCollection',
          component:() => import('../components/shop/myCollection.vue')
        },
        {
          path:'/shop/goods',
          component:() => import('../components/shop/goods.vue')
        },
        {
          path:'/shop/myCollectionShop',
          component:() => import('../components/shop/CollectionShop.vue')
        },
        {
          path:'/shop/purcharCar',
          component:() => import('../components/shop/purcharCar.vue')
        },
        {
          path:'/shop/userPage',
          component:() => import('../components/shop/userPage.vue')
        },
        {
          path:'/shop/classification',
          component:() => import('../components/shop/classification.vue')
        },
        {
          path:'/shop/information',
          component:() => import('../components/shop/information.vue')
        },
        {
          path:'/shop/comment',
          component:() => import('../components/shop/coment.vue')
        },
        {
          path:'/shop/report',
          component:() => import('../components/shop/report.vue')
        },
        {
          path:'/shop/shopTips',
          component:() => import('../components/shop/shopTips.vue')
        },
        {
          path:'/shop/foot',
          component:() => import('../components/shop/foot.vue')
        },
        {
          path:'/shop/searchPage',
          component:() => import('../components/shop/searchGoods.vue')
        },
        {
          path:'/shop/goodsInformation',
          component:() => import('../components/shop/goodsInformation.vue')
        },
        {
          path:'/shop/successPay',
          component:() => import('../components/shop/successPay.vue')
        },
        {
          path:'/shop/placeOrder',
          component:() => import('../components/shop/placeOrder.vue')
        },
        {
          path:'/shop/fans',
          component:() => import('../components/shop/fans.vue')
        },
        {
          path:'/shop/receiveGoods',
          component:() => import('../components/shop/receiveGoods.vue')
        },
        {
          path:'/shop/payPage',
          component:() => import('../components/shop/payPage.vue')
        },
        {
          path:'/shop/toComment',
          component:() => import('../components/shop/successComment.vue')
        },
        {
          path:'/shop/uploadGoods',
          component:() => import('../components/shop/uploadGoods.vue')
        },
        {
          path:'/shop/userSetting',
          component:() => import('../components/shop/userSetting.vue')
        },
        {
          path:'/shop/personInformation',
          component:() => import('../components/shop/userPersonInformation.vue')
        },
        {
          path:'/shop/addressManage',
          component:() => import('../components/shop/addressManage.vue')
        },
        {
          path:'/shop/userManage',
          component:() => import('../components/shop/userManage.vue')
        },
        {
          path:'/shop/goodsManage',
          component:() => import('../components/shop/goodsManage.vue')
        },
        {
          path:'/shop/submitRefund',
          component:() => import('../components/shop/submitRefund.vue')
        },
        {
          path:'/shop/manage/refundManage',
          component:() => import('../components/shop/manager/refundManage.vue')
        },
      ]
    }
  ]
})
