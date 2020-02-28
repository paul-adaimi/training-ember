import Component from '@ember/component';
import moment from 'moment';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  onFilter: null,

  selectedId:"0",

  actions: {
    onFilter(tag, tagId) {
      this.set('selectedId',tagId);
      this.onFilter(tag);
    }
  }

})
