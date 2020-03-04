import Route from '@ember/routing/route';

export default Route.extend({

  setupController(controller) {
    controller.setupControllerTask.perform();
  },

  resetController(controller) {
    controller.resetProperties();
    return this._super(...arguments);
  }
});
