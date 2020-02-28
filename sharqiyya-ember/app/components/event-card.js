import Component from '@ember/component';
import moment from 'moment';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  tagName: '',

  router: service(),

  onUpdate: null,

  dateString: computed('dates.firstObject.date', 'dates.lastObject.date', function() {
    let start = moment(this.dates.firstObject.date).format('MMM D');
    let end = moment(this.dates.lastObject.date).format('MMM D');
    return `${start} till ${end}`;
  }),

  timeString: computed('dates.firstObject.{startTime,endTime}', function() {
    return `${this.dates.firstObject.startTime} till ${this.dates.firstObject.endTime}`;
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
        this.router.transitionTo('main.event', this.id);
      }
    }
  }
});
