<template>
  <div id="app">
      <navbar />
      <router-view />
  </div>
</template>

<script>
import navbar from './components/layouts/navbar.vue' 

export default {
  name: 'app',
  components: {
    navbar,
  },
  created() {
    const t = this
    
    t.$store.dispatch('getBudget')
  }
}
</script>

<style src="./assets/css/cerulean.css"></style>
