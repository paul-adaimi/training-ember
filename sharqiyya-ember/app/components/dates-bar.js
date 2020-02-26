import Component from '@ember/component';
import moment from 'moment';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  // classNames: ['test'],
  //
  max: 10,

  dates: computed('max', function() {
    let dates=[];

    for(let i = 0; i < this.max; i++) {
      dates.push({
        isToday: i === 0,
        dayNumber: moment().add(i,'days').format('D'),
        dayString: moment().add(i,'days').format('ddd'),
      });
    }

    return dates;

  }),

  month: moment().format('MMM'),
  year: moment().format('YYYY'),


})
