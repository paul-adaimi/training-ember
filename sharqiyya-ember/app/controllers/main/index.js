import Controller from '@ember/controller';
import { hash } from 'rsvp';
import { task } from 'ember-concurrency';

export default Controller.extend({

  findModel: task(function * ({ tag } = {}) {
    let temp = hash({
      events: this.store.query('event', {
        include: 'event-dates,tags',
        tag
      }),
      tags: this.store.findAll('tag')
    });

    let model = yield temp;
    this.set('model', model);
  }),

  actions: {
    onFilter(tag) {
      this.findModel.perform({ tag });
    }
  }
});
