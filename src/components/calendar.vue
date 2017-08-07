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
                        <td v-for="d in 7" 
                        :class="{
                            'v-out-day-month': !isDayOfCurrentMonth(weekDayOf(w-1,d)),
                            'selected': weekDayOf(w-1,d).isSame(selected)
                            }" 
                        :key="weekDayOf(w-1,d).format('X')"

                        >
                            <span 
                            :data-date="weekDayOf(w-1,d).format('YYYY-MM-DD')"
                            @click="onSelect(weekDayOf(w-1,d))"
                            >
                                {{weekDayOf(w-1,d).date()}}
                            </span>
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
            currentYear: 2017,
            selected: null,
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
                    &.selected{
                        color:rgba(255,255, 2555, 1);

                    }
                }
            }
            th {
             text-align: center;
            }
            td{
                cursor: pointer;
                span{
                    display: inline-block;
                    width: 20px;
                    //height: 30px;
                    border-radius: 50%;
                    padding: 6px; 
                    text-align: center;
                }
                &.selected span{
                    background-color: red;
                    color:rgba(255,255, 2555, 1);
                    font-weight: 900
                }
            }
        }
    }
</style>
