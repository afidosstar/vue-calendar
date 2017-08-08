<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <calendar :events="events" :moment="moment"></calendar>
  </div>
</template>

<script>
import calendar from 'components/calendar.vue'
import moment from 'moment'
moment.locale('fr')
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      moment,
      events: [
        {
          start: moment().subtract(2,'day').toDate(),
          end: moment().add(2,'day').toDate(),
        },
        {
          start: moment().add(4,'day').toDate(),
          end: moment().add(8,'day').toDate(),
        }
      ]
    }
  },
  components: {
    calendar
  }
} 
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
