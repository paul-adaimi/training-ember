import Component from '@ember/component';
import moment from 'moment';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: '',

  router: service(),

  dateString: computed('dates.[]', function() {
    let start = moment(this.dates.firstObject.date).format('MMM D');
    let end = moment(this.dates.lastObject.date).format('MMM D');
    return `${start} till ${end}`;
  }),

  timeString: computed('day', function() {
    return `${this.dates.firstObject.startTime} till ${this.dates.firstObject.endTime}`;
  })
});
