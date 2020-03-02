import Route from '@ember/routing/route';

export default Route.extend({

  setupController(controller, model) {
    this._super(controller, model);
    controller.setupControllerTask.perform();
  },

  resetController(controller) {
    controller.resetControllerTask.perform();
  }
});
