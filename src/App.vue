<template>

  <div>
    <router-view></router-view>
  </div>

</template>

<script>
  import PageHeader from './components/PageHeader'
  import PageFooter from './components/PageFooter'

  export default {
    name: 'app',
    components: {
      PageHeader,
      PageFooter
    }
  }

</script>

