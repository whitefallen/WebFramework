<template>
  <div>
    <h1>{{msg}}</h1>
    <form>
      <label>Search: </label>
      <input type="text" v-model="search">
      <Label>Preis min:</Label>
      <input type="text" v-model="searchMin">
      <Label>Preis max: </Label>
      <input type="text" v-model="searchMax">
    </form>
    <div class="list">
      <div class="list-item" v-for="item in searchItems" :key="item.id" style="display: inline-block">
        <div class="list-item-content">
          <div>
            <img :src="item.imgpath" width="50px" height="50px" :alt="item.name"/>
          </div>
          <div>
            {{item.id}}
          </div>
          <div>
            {{item.name}}
          </div>
          <div>
            {{item.preis}}
          </div>
          <div>
            {{item.artikelnummer}}
          </div>
          <div>
            <button @click="modifyItem(item)">
              Modify
            </button>
            <button @click="deleteItem(item)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <form class="list-item-content-edit" @submit.prevent="modifyItemSave" v-show="showModify">
      <div class="grid-form">
        <div class="grid-item-1">
          <label>Name:</label>
          <input type="text" v-model="modItem.name">
        </div>
        <div class="grid-item-2">
          <label>Preis:</label>
          <input type="text" v-model="modItem.preis">
        </div>
        <div class="grid-item-3">
          <label>Artikelnummer:</label>
          <input type="text" v-model="modItem.artikelnummer">
        </div>
        <div class="grid-item-4">
          <button type="submit">Save Edit</button>
        </div>
      </div>
    </form>
    <button @click="showAddForm">Neu anlegen</button>
    <form @submit.prevent="addItem" v-show="showAdd">
      <div v-if="errors.length">
        <b>Bitte beheben sie folgende Fehler: </b>
        <ul>
          <li v-for="error in errors" :key="error">
            {{ error }}
          </li>
        </ul>
      </div>
      <div class="grid-form">
        <div class="grid-item-1">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" v-model="formData.name">
        </div>
        <div class="grid-item-2">
          <label for="preis">Preis:</label>
          <input type="text" id="preis" name="preis" v-model="formData.preis">
        </div>
        <div class="grid-item-3">
          <label for="artikelnummer">Artikelnummer:</label>
          <input type="text" id="artikelnummer" name="artikelnummer" v-model="formData.artikelnummer">
        </div>
        <div class="grid-item-4">
          <button type="submit">Add</button>
        </div>
      </div>
    </form>
    </div>
</template>

<script>
export default {
  name: 'AppEntry',
  props: {
    msg: String
  },
  data: function () {
    return {
      search: '',
      modItem: {id:0, name: '', artikelnummer: '', imgpath: require('./../assets/images/placeholder.png')},
      showModify: false,
      showAdd: false,
      formData: {
        name: '',
        preis: '',
        artikelnummer: '',
        imgpath: require('./../assets/images/placeholder.png')
      },
      items: [
        {
          id:1,
          name: 'Mainboard',
          preis: '100',
          artikelnummer: '1447DE',
          imgpath: require('./../assets/images/mainboard.png'),
        },
        {
          id:2,
          name: 'RAM',
          preis: '80',
          artikelnummer: '0447DE',
          imgpath: require('./../assets/images/ram.png'),
        },
        {
          id:3,
          name: 'GPU',
          preis: '358',
          artikelnummer: '78447DE',
          imgpath: require('./../assets/images/gpu.png'),
        },
        {
          id:4,
          name: 'CPU',
          preis: '180',
          artikelnummer: '1007DE',
          imgpath: require('./../assets/images/cpu.png'),
        }
      ],
      errors: [],
      searchMin: '',
      searchMax: '',
    }
  },
  methods: {
    addItem() {
      this.errors = [];
      if(this.formData.preis <= 0) {
        this.errors.push("Preis muss groeßer 0 sein");
      }
      if(!this.errors.length) {
        this.items.push({
          id: this.items.length+1,
          name: this.formData.name,
          preis: this.formData.preis,
          artikelnummer: this.formData.artikelnummer,
          imgpath: this.formData.imgpath,
        })
        this.showAdd = false;
      }
    },
    modifyItemSave() {
      this.showModify = false;
    },
    modifyItem(item) {
      if(this.showModify && item.id === this.modItem.id) {
        this.showModify = false;
        this.modItem = {id:0, name: '', artikelnummer: '', imgpath: require('./../assets/images/placeholder.png')};
      } else {
        this.showModify = true;
        this.modItem = item;
      }
    },
    showAddForm() {
      this.showAdd = !this.showAdd;
    },
    deleteItem(item) {
      this.items = this.items.filter((arrItem) => arrItem !== item);
    },
  },
  computed: {
    searchItems() {
      if(this.searchMax && this.searchMin && this.search) {
        return this.items.filter((arrItem) => parseInt(arrItem.preis) <= parseInt(this.searchMax) && parseInt(arrItem.preis) >= parseInt(this.searchMin) && (arrItem.name.includes(this.search) || arrItem.artikelnummer.includes(this.search)))
      } else if(this.searchMax && this.searchMin && !this.search) {
        return this.items.filter((arrItem) => parseInt(arrItem.preis) <= parseInt(this.searchMax) && parseInt(arrItem.preis) >= parseInt(this.searchMin))
      } else if(this.searchMax && !this.search) {
        return this.items.filter((arrItem) => parseInt(arrItem.preis) <= parseInt(this.searchMax))
      } else if(this.searchMin && !this.search) {
        return this.items.filter((arrItem) => parseInt(arrItem.preis) >= parseInt(this.searchMin))
      } if(this.search) {
        return this.items.filter((arrItem) => arrItem.name.includes(this.search) || arrItem.preis.includes(this.search) || arrItem.artikelnummer.includes(this.search))
      }
      return this.items;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .list-item {
    display: inline-block;
    margin: 2em;
  }
  .grid-form {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto auto auto;
    width: 20%;
    margin: auto;
    gap: 5px 5px;
    justify-items: start;
    align-items: start;
  }
  .grid-item-1 {
    grid-column: 1;
    grid-row: 1;
  }
  .grid-item-2 {
    grid-column: 1;
    grid-row: 2;
  }
  .grid-item-3 {
    grid-column: 1;
    grid-row: 3;
  }
  .grid-item-4 {
    grid-column: 1;
    grid-row: 4;
  }
</style>
