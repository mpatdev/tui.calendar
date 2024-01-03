import type Vue from 'vue';
import type Calendar from '@toast-ui/calendar';

export default class VueCalendar3 extends Vue {
  getRootElement(): HTMLDivElement;
  getInstance(): Calendar; 
}

declare namespace tui {
  export class VueCalendar3 extends Vue {
    getRootElement(): HTMLDivElement;
    getInstance(): Calendar; 
  }
}
