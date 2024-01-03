/* eslint-disable no-undefined */
import Calendar from '@toast-ui/calendar';
import { ref, defineComponent, h, onMounted, watch, toRaw, onBeforeUnmount } from 'vue';

export default defineComponent(
  (props, { expose, attrs, emit }) => {
    const container = ref();
    const calendarInstance = ref(null);
    const emmits = Object.keys(attrs)
      .filter((attr) => attr.startsWith('on'))
      .map((eventName) => eventName.replace('on', ''));

    watch(props.view, (value) => {
      calendarInstance.value.changeView(value);
    });

    watch(props.useFormPopup, (value) => {
      calendarInstance.value.setOptions({ useFormPopup: value });
    });

    watch(props.useDetailPopup, (value) => {
      calendarInstance.value.setOptions({ useDetailPopup: value });
    });

    watch(props.isReadOnly, (value) => {
      calendarInstance.value.setOptions({ isReadOnly: value });
    });

    watch(props.eventFilter, (value) => {
      calendarInstance.value.setOptions({ eventFilter: value });
    });

    watch(props.week, (value) => {
      calendarInstance.value.setOptions({ week: value });
    });

    watch(props.month, (value) => {
      calendarInstance.value.setOptions({ month: value });
    });

    watch(props.gridSelection, (value) => {
      calendarInstance.value.setOptions({ gridSelection: value });
    });

    watch(props.timezone, (value) => {
      calendarInstance.value.setOptions({ timezone: value });
    });

    watch(props.theme, (value) => {
      calendarInstance.value.setTheme(value);
    });

    watch(props.template, (value) => {
      calendarInstance.value.setOptions({ template: value });
    });

    watch(props.calendars, (value) => {
      calendarInstance.value.setCalendars(value);
    });

    watch(props.events, (value) => {
      calendarInstance.value.clear();
      calendarInstance.value.createEvents(value);
    });

    const getInstance = () => {
      return calendarInstance.value;
    };

    const addEventListeners = () => {
      emmits
        .map((eventName) => {
          return eventName[0].toLocaleLowerCase() + eventName.slice(1);
        })
        .forEach((eventName) => {
          calendarInstance.value.on(eventName, (...args) => {
            emit(eventName, ...args);
          });
        });
    };

    const createEvents = () => {
      calendarInstance.value.createEvents(props.events);
    };

    onMounted(() => {
      calendarInstance.value = new Calendar(container.value, {
        defaultView: props.view,
        month: props.month,
        useFormPopup: props.useFormPopup,
        useDetailPopup: props.useDetailPopup,
        timezone: toRaw(props.timezone),
        calendars: toRaw(props.calendars),
        gridSelection: toRaw(props.gridSelection),
        theme: props.theme,
        template: props.template,
        isReadOnly: props.isReadOnly,
        week: props.week,
      });

      addEventListeners();
      createEvents();
    });

    onBeforeUnmount(() => {
      calendarInstance.value.off();
      calendarInstance.value.destroy();
    });

    expose({
      getInstance,
      calendarInstance,
    });

    return () => h('div', { ref: container, className: 'toastui-vue-calendar' });
  },
  {
    name: 'ToastUICalendar',
    props: {
      view: String,
      useFormPopup: {
        type: Boolean,
        default: () => undefined,
      },
      useDetailPopup: {
        type: Boolean,
        default: () => undefined,
      },
      isReadOnly: {
        type: Boolean,
        default: () => undefined,
      },
      usageStatistics: {
        type: Boolean,
        default: () => undefined,
      },
      eventFilter: Function,
      week: Object,
      month: Object,
      gridSelection: {
        type: [Object, Boolean],
        default: () => undefined,
      },
      timezone: Object,
      theme: Object,
      template: Object,
      calendars: {
        type: Array,
        default: () => [],
      },
      events: Array,
    },
  }
);

// 'ToastUICalendar', {
// name: 'ToastUICalendar',
// setup() {
//   const props = defineProps({
// view: String,
// useFormPopup: {
//   type: Boolean,
//   default: () => undefined,
// },
// useDetailPopup: {
//   type: Boolean,
//   default: () => undefined,
// },
// isReadOnly: {
//   type: Boolean,
//   default: () => undefined,
// },
// usageStatistics: {
//   type: Boolean,
//   default: () => undefined,
// },
// eventFilter: Function,
// week: Object,
// month: Object,
// gridSelection: {
//   type: [Object, Boolean],
//   default: () => undefined,
// },
// timezone: Object,
// theme: Object,
// template: Object,
// calendars: Array,
// events: Array,
//   });

//   const calendarInstance = ref(null);

//   return {
//     calendarInstance,
//   };
// },
// watch: {
//   view(value) {
//     this.calendarInstance.changeView(value);
//   },
//   useFormPopup(value) {
//     this.calendarInstance.setOptions({ useFormPopup: value });
//   },
//   useDetailPopup(value) {
//     this.calendarInstance.setOptions({ useDetailPopup: value });
//   },
//   isReadOnly(value) {
//     this.calendarInstance.setOptions({ isReadOnly: value });
//   },
//   eventFilter(value) {
//     this.calendarInstance.setOptions({ eventFilter: value });
//   },
//   week(value) {
//     this.calendarInstance.setOptions({ week: value });
//   },
//   month(value) {
//     this.calendarInstance.setOptions({ month: value });
//   },
//   gridSelection(value) {
//     this.calendarInstance.setOptions({ gridSelection: value });
//   },
//   timezone(value) {
//     this.calendarInstance.setOptions({ timezone: value });
//   },
//   theme(value) {
//     this.calendarInstance.setTheme(value);
//   },
//   template(value) {
//     this.calendarInstance.setOptions({ template: value });
//   },
//   calendars(value) {
//     this.calendarInstance.setCalendars(value);
//   },
//   events(value) {
//     this.calendarInstance.clear();
//     this.calendarInstance.createEvents(value);
//   },
// },
// mounted() {
//   this.calendarInstance = new Calendar(this.$refs.container, {
//     defaultView: this.view,
//     useFormPopup: this.useFormPopup,
//     useDetailPopup: this.useDetailPopup,
//     isReadOnly: this.isReadOnly,
//     usageStatistics: this.usageStatistics,
//     eventFilter: this.eventFilter,
//     week: this.week,
//     month: this.month,
//     gridSelection: this.gridSelection,
//     timezone: this.timezone,
//     theme: this.theme,
//     template: this.template,
//     calendars: this.calendars,
//   });
//   this.addEventListeners();
//   this.calendarInstance.createEvents(this.events);
// },
// beforeDestroy() {
//   this.calendarInstance.off();
//   this.calendarInstance.destroy();
// },
// methods: {
//   addEventListeners() {
//     Object.keys(this.$listeners).forEach((eventName) => {
//       this.calendarInstance.on(eventName, (...args) => this.$emit(eventName, ...args));
//     });
//   },
//   getRootElement() {
//     return this.$refs.container;
//   },
//   getInstance() {
//     return this.calendarInstance;
//   },
// },
// template: '<div ref="container" class="toastui-vue-calendar" />',
// });
