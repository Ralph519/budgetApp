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
  }
}
</script>

<style src="./assets/css/cerulean.css"></style>
