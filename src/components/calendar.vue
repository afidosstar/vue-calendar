<template>
  <div class="vcalendar">
    <div class='vheader'>
        <div class="lb vmonth">
            <span class="btn back" @click="onBackMonth">&lsaquo;</span><span class="content">{{currentMonth|capitalize}}</span><span class="btn next" @click="onNextMonth">&rsaquo;</span>
        </div>
        <div class="lb vannee">
            <span class="btn back" @click="onBackYear">&lsaquo;</span><span class="content">{{currentYear}}</span><span class="btn next" @click="onNextYear">&rsaquo;</span>
        </div>
        
   </div>

      <div class="vbody">
            <table>
                <thead>
                    <tr>
                        <th v-for="day in days">{{day}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="w in 6">
                        <td v-for="d in 7" :class="{'v-out-day-month': !isDayOfCurrentMonth(weekOf(w-1).isoWeekday(d))}" :key="weekOf(w-1).isoWeekday(d).format('X')" >
                            <span :data-date="weekOf(w-1).isoWeekday(d).format('YYYY-MM-DD dddd')">{{weekOf(w-1).isoWeekday(d).date()}}</span>
                            </td>
                    </tr>
                </tbody>
            
            </table>
      </div>
</div>
</template>

<script>
import calendarMixin from 'mixins/calendar-mixin'
export default {
    data () {
        return {
            currentMonth:'août',
            currentYear: 2017
        }
    },
    mixins: [calendarMixin],
}
</script>

<style lang="scss">
    .vcalendar{
        display: inline-block;
        width: 500px;
        .vheader {
            display: table;
            .content{
                position: inline-block;
                vertical-align: center;
                position: relative;
                bottom: 4px;
            }
            .lb {
                display: table-cell;
                &.vmonth{
                    .content{
                        display: inline-block;
                        width: 96px;
                    }
                }
            }
            .btn{
                padding: 5px 15px;
                font-weight: 200;
                font-size: 35px;
                cursor: pointer;
            }
        }
        .vbody{
            table{
                width: 100%;
                .v-out-day-month{
                    opacity: 0.5;
                }
            }
            th {
             
            }
        }
    }
</style>
