# vue-calendar

> Vue js component calendar mini

## Dependances
    - vue
    - moment

## Install
    npm install vue-mini-calendar --save

## Config
    <template>
        <div id="app">
            <img src="./assets/logo.png">
            <calendar :moment="moment"></calendar>
        </div>
    </template>

>
    <script>
        import calendar from 'components/calendar.vue'
        import moment from 'moment'
        moment.locale('fr')
        export default {
        name: 'app',
        data () {
            return {
            msg: 'Welcome to Your Vue.js App',
            moment
            }
        },
        components: {
            calendar
        }
        } 
    </script>
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
