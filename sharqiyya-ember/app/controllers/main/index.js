import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { all } from 'rsvp';
import { computed } from '@ember/object';

export default Controller.extend({

  queryParams: ['filter'],

  filter: null,

  pageNumber: 1,

  pageSize: 4,

  isLoading: false,

  loadingMoreEvents: false,

  events: computed(() => []),

  tags: computed(() => []),

  hasMoreEvents: true,

  setupControllerTask: task(function * () {
    this.set('isLoading', true);
    yield all([this.findEvents.perform(), this.findTags.perform()]);
    this.set('isLoading', false);
  }),

  resetControllerTask: task(function * () {
    yield all([this.set('events', []), this.set('pageNumber', 1), this.set('hasMoreEvents', true)]);
  }),

  findTags: task(function * () {
    let tags = yield this.store.findAll('tag');
    this.set('tags', tags);
  }),

  findEvents: task(function * ({ tag } = {}) {
    this.set('loadingMoreEvents', true);
    let events = yield this.store.query('event', {
      include: 'event-dates,tags',
      tag: this.filter || tag,
      page: {
        number: this.pageNumber,
        size: this.pageSize
      }
    });

    this.events.pushObjects(events.slice());

    if (events.length < this.pageSize) {
      this.set('hasMoreEvents', false);
    }

    this.set('loadingMoreEvents', false);
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
      this.set('filter', tag);
      this.findEvents.perform({ tag });
    },

    seeMoreEvents() {
      this.set('pageNumber', this.pageNumber + 1);
      this.findEvents.perform();
    }
  }
});
