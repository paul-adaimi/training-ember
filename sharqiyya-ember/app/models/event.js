import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  title: attr('string'),

  eventDates: hasMany('event-date'),

  tags: hasMany('tag'),

  location: attr('string'),
});
