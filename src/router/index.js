import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    redirect: "login",
    // component: HomeView,
  },
  {
    path:'/home',
    name:'home',
    redirect: "/home/index",
    children:[
      {
        path:"/home/index",
        name:"index",
        component:()=>import("../views/Index.vue")
      },
      {
        path:"document",
        name:"document",
        component:()=>import("../views/Document.vue")
      },
      {
        path:"lead",
        name:"lead",
        component:()=>import("../views/Lead.vue")
      },
    ],
    component:() => import('../views/HomeView.vue')
  },
  {
    path:'/login',
    name:'login',
    component:() => import('../views/Login.vue')
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to,from,next)=>{
  //路由守卫中不要使用 for 循环
  if(to.name==="login"){
    //登录界面不设权限
    next()
  }else{
    //非登录界面设置权限
    let token = localStorage.getItem("token")
    if(token){
      //有权限
      next()
    }else{
      //没有权限
      next({name:"login"})
    }
  }
})
export default router;
