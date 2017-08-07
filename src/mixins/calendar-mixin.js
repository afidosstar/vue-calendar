import moment from 'moment'
moment.locale('fr')
export default {
    props: {
        moment: {
            type: Function,
            'default': moment
        },

    },
    created() {
        this.currentYear = this.moment().year()
        this.currentMonth = this.moment().format('MMMM')
        let days = moment.weekdaysMin();
        days.push(days.shift());
        this.days = days;
    },
    data() {
        return {
            days: ['L', 'M', 'Me', 'J', 'V', 'S', 'D']
        }
    },
    methods: {
        onBackMonth() {
            let lastMonth = this.moment(this.currentMonth, 'MMMM')
            if (lastMonth.month() === 0) {
                this.onBackYear()
            }
            this.currentMonth = lastMonth.add(-1, 'month').format('MMMM')
        },
        onNextMonth() {
            let lastMonth = this.moment(this.currentMonth, 'MMMM')
            if (lastMonth.month() === 11) {
                this.onNextYear()
            }
            this.currentMonth = lastMonth.add(1, 'month').format('MMMM')
        },
        onBackYear() {
            let lastYear = this.moment(this.currentYear, 'YYYY')
            this.currentYear = lastYear.add(-1, 'year').year()
        },
        onNextYear() {
            let lastYear = this.moment(this.currentYear, 'YYYY')
            this.currentYear = lastYear.add(1, 'year').year()
        },
        weekOf(n) {
            let yearWeeks = moment(this.firstMonthDay).isoWeek() + n;
            return moment(this.firstMonthDay).isoWeek(yearWeeks);
        },
        isDayOfCurrentMonth(day) {
            return moment(day).isSameOrAfter(this.firstMonthDay) && moment(day).isSameOrBefore(this.lastDayOfMonth)
        }
    },
    filters: {
        capitalize(val) {
            return ('' + val).charAt(0).toUpperCase() + ('' + val).slice(1)
        }
    },
    computed: {
        currentMoment() {
            return this.moment(this.currentYear + '-' + this.currentMonth, 'YYYY-MMMM');
        },
        firstMonthDay() {
            return this.currentMoment.clone().startOf('month').toDate();
        },
        firstDaysOfFirstWeek() {
            return this.firstMonthDay.startOf('week')
        },
        lastDayOfMonth() {
            return this.currentMoment.clone().endOf('month').toDate();
        }


    }
}