<template>

  <div id="app">
    <page-header></page-header>
    <router-view></router-view>
    <page-footer></page-footer>
  </div>

</template>

<script>
  import PageHeader from './PageHeader'
  import PageFooter from './PageFooter'

  export default {
    name: 'app',
    components: {
      PageHeader,
      PageFooter
    }
  }

</script>