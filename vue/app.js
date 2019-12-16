Vue.component('td-list', {
  props: {
    td_list: {
      type: Array,
      required: true,
    },
  },
  template:
      '<ul class="list-group px-lg-0">' +
      '   <li class="list-group-item" v-bind:class="{td_done:item.is_done}" v-for="(item,index) in td_list" v-bind:id="\'cont_\'+index">\n' +
      '     <label class="container">{{item.content}}\n' +
      '            <input type="checkbox" v-on:change="td_mark(index)" :checked="item.is_done">\n' +
      '           <span class="checkmark"></span>\n' +
      '     </label>\n' +
      '   </li>' +
      '</ul>',
  methods: {
    td_mark: function(index) {
      this.td_list[index].is_done = this.td_list[index].is_done !== true;
      localStorage.setItem('td_list', JSON.stringify(this.td_list));
    },
  },
});

Vue.component('input-resetter', {
  template: '<span class="link" v-on:click="reset_input">&#10060;</span>',
  props: {
    input_name: {
      type: String,
    },
  },
  methods: {
    reset_input: function() {
      vm[this.input_name] = '';
    },
  },
});

let vm = new Vue({
  el: '#todo_app',
  data: {
    input: '',
    td_list: [],
    matching: [],
    suggestions: [],
    fetched: [],
  },
  mounted() {
    if (localStorage.td_list.length > 1)
      this.td_list = JSON.parse(localStorage.getItem('td_list'));
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').
        then(response => (this.suggestions = Object.keys(response.data.bpi)));
  },
  methods: {
    td_add: function() {
      if (this.input.length > 1)
        this.td_list.push({content: this.input, is_done: false});
      localStorage.setItem('td_list', JSON.stringify(this.td_list));
      this.input = '';
    },
    reset: function() {
      this.td_list = [];
      localStorage.setItem('td_list', JSON.stringify(this.td_list));
    },
    autocomplete: function() {
      if (this.input.length > 0)
        this.matching = this.suggestions.filter(
            suggestion => suggestion.toLowerCase().
                indexOf(this.input.toLowerCase()) > -1);
      else this.matching = [];
    },
    set_suggestion: function(index) {
      this.input = this.matching[index];
      this.matching = [];
      this.td_add();
    },
  },
});