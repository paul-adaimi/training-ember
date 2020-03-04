import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { all } from 'rsvp';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default Controller.extend({

  queryParams: ['filter'],

  filter: null,

  pageNumber: 1,

  pageSize: 4,

  isLoading: computed('setupControllerTask.isRunning', function() {
    return this.setupControllerTask.isRunning;
  }),

  loadingMoreEvents: computed('findEvents.isRunning', function() {
    return this.findEvents.isRunning;
  }),

  events: computed(() => []),

  tags: computed(() => []),

  hasMoreEvents: true,

  setupControllerTask: task(function * () {
    yield all([this.findEvents.perform(), this.findTags.perform()]);
  }),

  resetProperties() {
    this.setProperties({
      events: [],
      pageNumber: 1,
      hasMoreEvents: true
    });
  },

  findTags: task(function * () {
    let tags = yield this.store.findAll('tag');
    this.set('tags', tags);
  }),

  findEvents: task(function * () {
    let events = yield this.store.query('event', {
      include: 'event-dates,tags',
      tag: this.filter,
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
      this.resetProperties();
      this.set('filter', tag);
      this.findEvents.perform();
    },

    seeMoreEvents() {
      this.set('pageNumber', this.pageNumber + 1);
      this.findEvents.perform();
    }
  }
});
