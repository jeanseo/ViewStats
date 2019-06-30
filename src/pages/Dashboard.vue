<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>store</md-icon>
          </template>

          <template slot="content">
            <p class="category">Commerçants recensés</p>
            <h3 class="title">{{merchantCount.total}}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>location_on</md-icon>
              sur {{merchantCount.markets}} marchés
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>trending_down</md-icon>
          </template>

          <template slot="content">
            <p class="category">Revenu minimum</p>
            <h3 class="title">
              {{merchantIncomingStats.min.incoming}}€
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>face</md-icon>
              {{merchantIncomingStats.min.firstName}} {{merchantIncomingStats.min.lastName}}
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>trending_up</md-icon>
          </template>

          <template slot="content">
            <p class="category">Revenu maximum</p>
            <h3 class="title">{{merchantIncomingStats.max.incoming}}€</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>face</md-icon>
              {{merchantIncomingStats.max.firstName}} {{merchantIncomingStats.max.lastName}}

            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>trending_flat</md-icon>
          </template>
          <template slot="content">
            <p class="category">Revenu moyen</p>
            <h3 class="title">{{ Math.round(merchantIncomingStats.avg * 1) / 1}}€</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>update</md-icon>
              Just Updated
            </div>
          </template>
        </stats-card>
      </div>
      <div
              class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
                :chart-data="incomingStatsChart.data"
                :chart-options="incomingStatsChart.options"
                :chart-responsive-options="incomingStatsChart.responsiveOptions"
                :chart-type="'Bar'"
                data-background-color="red"
        >
          <template slot="content">
            <h4 class="title">Répartition du chiffre d'affaire</h4>
            <p class="category">
              Nombre de commerçants par tranche de revenus
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              Just updated
            </div>
          </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Commerçants récents</h4>
            <p class="category">Derniers commerçants ajoutés</p>
          </md-card-header>
          <md-card-content>
            <ordered-table table-header-color="orange"></ordered-table>
          </md-card-content>
        </md-card>
      </div>
      <div
              class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <merchant-card> </merchant-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  StatsCard,
  ChartCard,
  NavTabsCard,
  NavTabsTable,
  OrderedTable
} from "@/components";
import MerchantCard from "./DashBoard/MerchantCard";
import axios from 'axios';


export default {
  components: {
    MerchantCard,
    StatsCard,
    ChartCard,
    NavTabsCard,
    NavTabsTable,
    OrderedTable
  },
  data() {
    return {
      merchantCount:{
        total : '',
        markets: '',
      },
      merchantIncomingStats:{
        min : '',
        max : '',
        avg : ''
      },
      incomingStatsChart: {
        data: {
          labels: [

          ],
          series: [[]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 8,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      },
    };
  },
  methods: {
    getMerchantCount() {
      const path = 'http://localhost:3000/api/merchants?filter=%7B%22where%22%3A%7B%22deleted%22%3A%22false%22%7D%7D';
      axios.get(path)
              .then((res) => {
                this.merchantCount.total = res.data.length;
              })
              .catch((error) => {
                // eslint-disable-next-line
                console.error(error);
              });
    },
    getMarketCount() {
      const path = 'http://localhost:3000/api/markets/count';
      axios.get(path)
              .then((res) => {
                this.merchantCount.markets = res.data.count;
              })
              .catch((error) => {
                // eslint-disable-next-line
                console.error(error);
              });
    },
    getMaxIncoming() {
        const path = 'http://localhost:3000/api/merchants?filter[where][and][0][deleted]=false&filter[order]=incoming DESC&filter[limit]=1&filter[where][and][1][incoming][gt]=0';
        axios.get(path)
                .then((res) => {
                  this.merchantIncomingStats.max = res.data[0];
                })
                .catch((error) => {
                  // eslint-disable-next-line
                  console.error(error);
                });
    },
    getMinIncoming() {
      const path = 'http://localhost:3000/api/merchants?filter[where][and][0][deleted]=false&filter[order]=incoming ASC&filter[limit]=1&filter[where][and][1][incoming][gt]=0';
      axios.get(path)
              .then((res) => {
                this.merchantIncomingStats.min = res.data[0];
              })
              .catch((error) => {
                // eslint-disable-next-line
                console.error(error);
              });
    },
    getAvgIncoming() {
      const path = 'http://localhost:3000/api/Merchants/avgincoming';
      axios.get(path)
              .then((res) => {
                this.merchantIncomingStats.avg = res.data.averageIncoming;
              })
              .catch((error) => {
                // eslint-disable-next-line
                console.error(error);
              });
    },
    getIncomingChart(){
      const path = 'http://localhost:3000/api/Merchants/incomingcharts';
      axios.get(path)
              .then((res)=>{
                console.log(res.data.result);
                const resultArray = res.data.result;
                resultArray.forEach((result)=>{
                  this.incomingStatsChart.data.labels.push(result.range.toString());
                  this.incomingStatsChart.data.series[0].push(result.value);
                });
                let max = Math.max(...this.incomingStatsChart.data.series[0]);
                //this.incomingStatsChart.options.high = max;
                console.log("valeur max:"+max);
                console.log(JSON.stringify(this.incomingStatsChart));



              })
              .catch((error)=>{
                console.error(error);
              });
    },
  },
  created() {
    this.getMerchantCount();
    this.getMarketCount();
    this.getMaxIncoming();
    this.getMinIncoming();
    this.getAvgIncoming();
    this.getIncomingChart();
  },

};
</script>
