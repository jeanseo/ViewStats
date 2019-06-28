<template>
  <div class="wrapper" v-bind:class="[!$route.meta.hideSideBar ?  'nav-open': $sidebar.showSidebar ]">
    <notifications></notifications>

    <side-bar v-if="!$route.meta.hideSideBar" >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/merchants">
        <md-icon>person</md-icon>
        <p>Commerçants</p>
      </sidebar-link>
      <sidebar-link to="/markets">
        <md-icon>store</md-icon>
        <p>Marchés</p>
      </sidebar-link>
      <sidebar-link to="/agents">
        <md-icon>content_paste</md-icon>
        <p>Agents de collecte</p>
      </sidebar-link>
      <sidebar-link to="/logout" class="active-pro">
        <md-icon>logout</md-icon>
        <p>Déconnexion</p>
      </sidebar-link>
    </side-bar>

    <div v-bind:class="{'main-panel' : !$route.meta.hideTopNavBar}">
      <top-navbar v-if="!$route.meta.hideTopNavBar"></top-navbar>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
};
</script>
