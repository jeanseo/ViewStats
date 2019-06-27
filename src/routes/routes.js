import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import Login from "@/pages/Login.vue";

import store from '../store'; // your vuex store

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/dashboard');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};


const routes = [

  {
    path: "/",
    component: DashboardLayout,
    name:"Layout",
    redirect: "/login",
    children: [
      {
        path:"login",
        component: Login,
        name:"Login",
        meta: {
          hideFooter: true,
          hideTopNavBar:true,
          hideSideBar:true,
        },
        beforeEnter: ifNotAuthenticated,
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        beforeEnter: ifAuthenticated,
      },
      {
        path: "/user",
        name: "User Profile",
        component: UserProfile,
        beforeEnter: ifAuthenticated,
      },
      {
        path: "/table",
        name: "Table List",
        component: TableList,
        beforeEnter: ifAuthenticated,
      },
      {
        path: "/typography",
        name: "Typography",
        component: Typography,
        beforeEnter: ifAuthenticated,
      },
      {
        path: "/icons",
        name: "Icons",
        component: Icons,
        beforeEnter: ifAuthenticated,
      },
      {
        path: "/maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps,
        beforeEnter: ifAuthenticated,
      },
      {
        path: "/notifications",
        name: "Notifications",
        component: Notifications,
        beforeEnter: ifAuthenticated,
      },
      {
        path: "/upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO,
        beforeEnter: ifAuthenticated,
      }
    ]
  }
];

export default routes;
