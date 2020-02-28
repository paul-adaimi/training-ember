import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  title: attr('string'),

  eventDates: hasMany('event-date'),

  tags: hasMany('tag'),

  isFavorite: attr('boolean'),

  location: attr('string'),

  details: attr('string')
});
