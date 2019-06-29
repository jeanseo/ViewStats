<template>
  <div>
    <md-table v-model="merchants" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Nom">{{ item.firstName }} {{item.lastName}}</md-table-cell>
        <md-table-cell md-label="Marché">{{ getMarketbyId(item.marketId) }}</md-table-cell>
        <md-table-cell md-label="Revenus">{{ item.incoming }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  import axios from 'axios';
  let moment = require('moment');

  export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      merchants:[],
      markets:[],
    };
  },
  methods: {
    getMerchants() {
      const path = 'http://localhost:3000/api/merchants/?[filter][where][deleted]=false&filter[limit]=5&filter[order]=creationDate DESC';
      axios.get(path)
              .then((res) => {
                this.merchants = res.data;
              })
              .catch((error) => {
                // eslint-disable-next-line
                console.error(error);
              });
    },
    getMarkets(){
      const path = 'http://localhost:3000/api/markets';
      axios.get(path)
              .then((res) => {
                this.markets = res.data;
              })
              .catch((error) => {
                // eslint-disable-next-line
                console.error(error);
              });
    },
    getMarketbyId(marketId){
      const targetObject = this.markets.find(item => item.id === marketId);
      if (targetObject!==undefined){

        return `${targetObject.name} (${targetObject.city})`;
      }
      else{
        return ""
      }
    },
  },
    created() {
      this.getMerchants();
      this.getMarkets();
    },
  };
</script>
