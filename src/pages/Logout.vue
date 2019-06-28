<template>
    <div class="centered-container">
        <div class="loading-overlay" v-if="loading">
            <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
        </div>
    </div>
</template>

<script>
    import {AUTH_LOGOUT} from '../store/actions/auth.js';

    export default {
        name: "Logout",
        data() {
            return {
                loading:true,

            }
        },

        methods: {
            logout: function () {
                console.log("coucou");
                this.$store.dispatch(AUTH_LOGOUT)
                    .then(() => {
                        this.$router.push('/login')
                    })
            }
        },
        created() {
            this.logout();
        },

    }

</script>

<style scoped>

</style>