<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h4 class="category text-gray">Commerçant avec le meilleur revenu</h4>
      <h2 class="card-title">{{merchant.firstName}} {{merchant.lastName}}</h2>
      <h3>Marché de {{merchant.market}}</h3>
      <h3>{{merchant.incoming}}€ / jour</h3>
    </md-card-content>
  </md-card>
</template>
<script>
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
        firstName : '',
        lastName : '',
        market : '',
        incoming : '',
      },
    };
  },
  methods: {
    getBestMerchant() {
      this.merchant.firstName = "Guy";
      this.merchant.lastName = "Thar";
      this.merchant.market = "Saint-Denis";
      this.merchant.incoming = 1345;
      //TODO Requête API Chercher le merchant avec revenue max
      //TODO Récupérer son image
      //Penser à filtrer les deleted
    },
  },
  created() {
    this.getBestMerchant();
  },
};
</script>
<style></style>
