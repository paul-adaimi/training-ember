import Route from '@ember/routing/route';

export default Route.extend({
  model(param) {
    return this.store.findRecord('event', param.event_id, { include: 'event-dates,tags' });
  }
});
