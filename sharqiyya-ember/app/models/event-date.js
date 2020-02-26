import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  date: attr('date'),
  startTime: attr('string'),
  endTime: attr('string')
});
