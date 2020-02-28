import Component from '@ember/component';
import moment from 'moment';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  onFilter: null,

  selected:"0",

  isSelected: computed('selected',function(test) {
    console.log(test);
    return "tags-bar__tag_is-selected";
  }),

})
