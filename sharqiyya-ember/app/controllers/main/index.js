import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { all } from 'rsvp';
import { computed } from '@ember/object';

export default Controller.extend({

  pageNumber: 1,

  pageSize: 4,

  events: computed(() => []),

  tags: computed(() => []),

  hasMoreEvents: true,

  setupControllerTask: task(function * () {
    yield all([this.findEvents.perform(), this.findTags.perform()]);
  }),

  resetControllerTask: task(function * () {
    yield all([this.set('events', []), this.set('pageNumber', 1), this.set('hasMoreEvents', true)]);
  }),

  findTags: task(function * () {
    let tags = yield this.store.findAll('tag');
    this.set('tags', tags);
  }),

  findEvents: task(function * ({ tag } = {}) {
    let events = yield this.store.query('event', {
      include: 'event-dates,tags',
      tag,
      page: {
        number: this.pageNumber,
        size: this.pageSize
      }
    });

    this.events.pushObjects(events.slice());

    if (events.length < this.pageSize) {
      this.set('hasMoreEvents', false);
    }
  }),

  // findModel: task(function * ({ tag } = {}) {
  //   let temp = hash({
  //     events: this.store.query('event', {
  //       include: 'event-dates,tags',
  //       tag,
  //       page: {
  //         number: this.pageNumber,
  //         size: this.pageSize
  //       }
  //     }),
  //     tags: this.store.findAll('tag')
  //   });
  //
  //   let model = yield temp;
  //
  //   this.set('model', model);
  // }),

  actions: {
    onFilter(tag) {
      this.set('events', []);
      this.set('pageNumber', 1);
      this.findEvents.perform({ tag });
    },

    seeMoreEvents() {
      this.set('pageNumber', this.pageNumber + 1);
      this.findEvents.perform();
    }
  }
});
