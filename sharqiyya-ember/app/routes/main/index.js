import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model() {
    return hash({
      events: this.store.findAll('event', { include: 'event-dates' }),
      tags: this.store.findAll('tag')
    });
  }
});
