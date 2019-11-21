Vue.component('TdList', {
  props: {
    TdList: {
      type: Array,
      required: true,
    },
  },
  template:
      '<ul class="list-group px-lg-0" id="listbox">' +
      '   <li class="list-group-item" v-bind:class="{td_done:item.is_done}" v-for="(item,index) in TdList" v-bind:id="\'cont_\'+index">\n' +
      '     <label class="container">{{item.content}}\n' +
      '            <input type="checkbox" v-on:change="td_mark(index)" :checked="item.is_done">\n' +
      '           <span class="checkmark"></span>\n' +
      '     </label>\n' +
      '   </li>' +
      '</ul>',
  methods: {
    td_mark: function(index) {
      this.TdList[index].is_done = this.TdList[index].is_done !== true;
    },
  },
});