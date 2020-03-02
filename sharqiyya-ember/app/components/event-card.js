import Component from '@ember/component';
import moment from 'moment';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  tagName: '',

  router: service(),

  onUpdate: null,

  dateString: computed('this.event.eventDates.firstObject.date', 'this.event.eventDates.lastObject.date', function() {
    let start = moment(this.event.eventDates.firstObject.date).format('MMM D');
    let end = moment(this.event.eventDates.lastObject.date).format('MMM D');
    return `${start} till ${end}`;
  }),

  timeString: computed('this.event.eventDates.firstObject.{startTime,endTime}', function() {
    return `${this.event.eventDates.firstObject.startTime} till ${this.event.eventDates.firstObject.endTime}`;
  }),

  updateIsFavoriteTask: task(function *() {
    this.event.set('isFavorite', !this.event.isFavorite);
    try {
      yield this.event.save();
    } catch (e) {
      this.event.rollbackAttributes();
      throw e;
    }
  }),

  actions: {
    showEvent(event) {
      if (!event.target.classList.contains('js-like-button')) {
        this.router.transitionTo('main.event', this.event.id);
      }
    }
  }
});
