<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h4 class="category text-gray">Commerçant avec le meilleur revenu</h4>
      <h2 class="card-title">{{merchant.firstName}} {{merchant.lastName}}</h2>
      <h3>Marché de {{getMarketbyId(merchant.marketId)}}</h3>
      <h3>{{merchant.incoming}}€ / jour</h3>
    </md-card-content>
  </md-card>
</template>
<script>
  import axios from 'axios';

  export default {
  name: "merchant-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/marc.jpg")
    }
  },
  data() {
    return {
      merchant: {
        firstName : null,
        lastName : null,
        marketId : null,
        incoming : null,
        marketName : null,
      },
      markets:[],
    };
  },
  methods: {
    getBestMerchant() {
        const path = 'http://localhost:3000/api/merchants?filter[where][and][0][deleted]=false&filter[order]=incoming DESC&filter[limit]=1&filter[where][and][1][incoming][gt]=0';
        axios.get(path)
                .then((res) => {
                  this.merchant = res.data[0];
                  console.log(this.merchant);
                })
                .catch((error) => {
                  // eslint-disable-next-line
                  console.error(error);
                });
      //TODO Requête API Chercher le merchant avec revenue max
      //TODO Récupérer son image
      //Penser à filtrer les deleted
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
    this.getMarkets();
    this.getBestMerchant();
  },
};
</script>
<style></style>
