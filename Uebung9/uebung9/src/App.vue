<template>
  <div id="app">
    <AppEntry msg="Welcome to My Vue.js App"/>
  </div>
</template>

<script>
import AppEntry from './components/AppEntry.vue'

export default {
  name: 'App',
  components: {
    AppEntry
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
