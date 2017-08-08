import moment from 'moment'
export default {
    props: {
        moment: {
            type: Function,
            'default': moment,
        },
        events: {
            type: Array,
            'default': () => []
        }
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
        // determine les semaines du mois
        weekOf(n) {
            let yearWeeks = moment(this.firstMonthDay).isoWeek() + n;
            return moment(this.firstMonthDay).isoWeek(yearWeeks);
        },
        isDayOfCurrentMonth(day) { //detirmine si un jour appartient au jour du mois courrent
            return moment(day).isSameOrAfter(this.firstMonthDay) && moment(day).isSameOrBefore(this.lastDayOfMonth)
        },
        onSelect(moment_) {
            this.setToCorrectMonth(moment_)
            this.selected = moment_
            this.$emit('selected', moment_)
        },
        weekDayOf(w, d) { //determer le jour de le semaine apartir de la semaine du numero de jour dans la semaine 
            return this.weekOf(w).isoWeekday(d)
        },
        setToCorrectMonth(moment_) {
            if (moment_.month() !== this.currentMoment.month()) {
                this.currentMonth = moment_.format('MMMM');
            }
        },
        matchForEvent(day) {
            let clas = ''
            this.events.forEach((event) => {
                if (day.isSameOrAfter(moment(event.start).startOf('day')) && day.isSameOrBefore(moment(event.end).endOf('day'))) {
                    clas += event.class || 'matched'
                    if (this.isSameDate(day, event.start)) {
                        clas += ' start'
                    }
                    if (this.isSameDate(day, event.end)) {
                        clas += ' end'
                    }
                }
            })
            return clas;
        },
        isSameDate(date1, date2) {
            return moment(date1).format('YYYY-MM-DD') === moment(date2).format('YYYY-MM-DD')
        },
        isToday(day) {
            return day.format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')
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
        },
    }
}