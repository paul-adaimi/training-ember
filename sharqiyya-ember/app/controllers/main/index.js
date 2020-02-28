import Controller from '@ember/controller';
import { hash } from 'rsvp';

export default Controller.extend({
  findModel({ tag } = {}) {
    hash({
      events: this.store.query('event', {
        include: 'event-dates,tags',
        tag
      }),
      tags: this.store.findAll('tag')
    }).then(model => {
      this.set('model', model);
    })
  },

  actions: {
    onFilter(tag) {
      this.findModel({ tag });
    }
  }
})
