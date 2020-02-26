import Component from '@ember/component';
import moment from 'moment';
import { computed } from '@ember/object';


export default Component.extend({
  tagName:'',
  dateString: computed('dates.[]', function() {
    // console.log("this.dates");
    let start=moment(this.dates.firstObject.date).format("MMM D");

    let end=moment(this.dates.lastObject.date).format("MMM D");

    return `${start} till ${end}`;
  }),
  timeString: computed('day',function() {
    let dayChosen= new Date(this.day);
    let dates = this.dates.slice();
    console.log("dates", dates[3])
    return 'this.dates';
  })
})
