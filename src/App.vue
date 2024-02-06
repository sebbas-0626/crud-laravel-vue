<script>
// import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'

export default{
name:'App',
components:{
    Header
}
}
</script>

<template>
<Header title="CRUD"/>
<router-view></router-view>

</template>

<style scoped>

</style>
