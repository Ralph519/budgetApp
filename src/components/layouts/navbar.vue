<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <router-link to="/" class="navbar-brand">Budget App</router-link>    
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav ml-auto">
            <!-- <li v-if="isLoggedIn" class="nav-item active">
                <router-link to="/" class="nav-link">Home</router-link>    
            </li> -->
            <li v-if="isLoggedIn"><p class="mt-2 pr-3"><strong>{{currentUser}}</strong></p></li>
            <li v-if="!isLoggedIn" class="nav-item">
                <router-link to="/login" class="nav-link">Login</router-link>    
            </li>
            <li v-if="!isLoggedIn" class="nav-item">
                <router-link to="/register" class="nav-link">Register</router-link>    
            </li>
            <li v-if="isLoggedIn" class="nav-item">
                <a class="nav-link text-right" href="#" @click="logout">Logout</a>
            </li>
        </ul>
    </div>
    </nav>
</template>

<script>
import db from '../../firebase'

export default {
    name: 'navbar',
    data() {
        return {
            isLoggedIn: false,
            currentUser: false,
        }
    },
    created(){
        if(db.app.auth().currentUser){
            this.isLoggedIn = true
            this.currentUser = db.app.auth().currentUser.email
        }
    },
    methods: {
        logout() {
            db.app.auth().signOut().then(() => {
                this.$router.go({path: this.$router.path})
            })
        }
    }
}
</script>