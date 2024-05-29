<template>
  <NavbarComponent/>
  <router-view/>
</template>

<script>
import NavbarComponent from '../src/components/navbar/navbar.vue';
export default {
  name: 'App',
   components: {
    NavbarComponent
  }
}
</script>

<style>
/* Your global styles here */
</style>
