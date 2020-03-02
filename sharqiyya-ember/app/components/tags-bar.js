import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  onFilter: null,

  filter: null,

  selectedTag: computed('filter', function() {
    return this.filter || 'Everything';
  }),

  actions: {
    onFilter(tag) {
      if (tag === undefined) {
        this.set('selectedTag', 'Everything');
      } else {
        this.set('selectedTag', tag);
      }

      this.onFilter(tag);
    }
  }

});
