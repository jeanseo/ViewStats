<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
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
              <md-icon>date_range</md-icon>
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
            <md-icon>content_copy</md-icon>
          </template>

          <template slot="content">
            <p class="category">Revenu minimum</p>
            <h3 class="title">
              {{merchantIncomingStats.min.incoming}}€
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>warning</md-icon>
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
            <md-icon>info_outline</md-icon>
          </template>

          <template slot="content">
            <p class="category">Revenu maximum</p>
            <h3 class="title">{{merchantIncomingStats.max.incoming}}€</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>local_offer</md-icon>
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
            <i class="fab fa-twitter"></i>
          </template>

          <template slot="content">
            <p class="category">Revenu moyen</p>
            <h3 class="title">{{merchantIncomingStats.avg}}€</h3>
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
                :chart-data="dailySalesChart.data"
                :chart-options="dailySalesChart.options"
                :chart-type="'Line'"
                data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Daily Sales</h4>
            <p class="category">
              <span class="text-success"
              ><i class="fas fa-long-arrow-alt-up"></i> 55%
              </span>
              increase in today sales.
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              updated 4 minutes ago
            </div>
          </template>
        </chart-card>
      </div>
      <div
              class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
                :chart-data="emailsSubscriptionChart.data"
                :chart-options="emailsSubscriptionChart.options"
                :chart-responsive-options="emailsSubscriptionChart.responsiveOptions"
                :chart-type="'Bar'"
                data-background-color="red"
        >
          <template slot="content">
            <h4 class="title">Email Subscription</h4>
            <p class="category">
              Last Campaign Performance
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              updated 10 days ago
            </div>
          </template>
        </chart-card>
      </div>
      <div
              class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
                :chart-data="dataCompletedTasksChart.data"
                :chart-options="dataCompletedTasksChart.options"
                :chart-type="'Line'"
                data-background-color="green"
        >
          <template slot="content">
            <h4 class="title">Completed Tasks</h4>
            <p class="category">
              Last Campaign Performance
            </p>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              campaign sent 26 minutes ago
            </div>
          </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
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
              class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
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
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]]
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]]
        },

        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De"
          ],
          series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 1000,
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
      const path = 'http://localhost:3000/api/merchants?filter=%7B%22where%22%3A%7B%22deleted%22%3A%22false%22%7D%7D&access_token=TRRJgMx6Svy9AhYx5DcPJx0nvdKXr7DloSn53AEEGgMHlMYN7wH1JMIIKGfoKxqA';
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
      const path = 'http://localhost:3000/api/markets/count?access_token=TRRJgMx6Svy9AhYx5DcPJx0nvdKXr7DloSn53AEEGgMHlMYN7wH1JMIIKGfoKxqA';
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
        const path = 'http://localhost:3000/api/merchants?filter[where][and][0][deleted]=false&filter[order]=incoming DESC&filter[limit]=1&access_token=D7Oo0T0RK6wuKgtAN3tsXesvczyTbsubQvM9YA7T4YojdnlZUkJph8fooT7FB7EM&filter[where][and][1][incoming][gt]=0';
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
      const path = 'http://localhost:3000/api/merchants?filter[where][and][0][deleted]=false&filter[order]=incoming ASC&filter[limit]=1&access_token=D7Oo0T0RK6wuKgtAN3tsXesvczyTbsubQvM9YA7T4YojdnlZUkJph8fooT7FB7EM&filter[where][and][1][incoming][gt]=0';
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
      const path = 'http://localhost:3000/api/Merchants/avgincoming?access_token=D7Oo0T0RK6wuKgtAN3tsXesvczyTbsubQvM9YA7T4YojdnlZUkJph8fooT7FB7EM';
      axios.get(path)
              .then((res) => {
                this.merchantIncomingStats.avg = res.data.averageIncoming;
              })
              .catch((error) => {
                // eslint-disable-next-line
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
  },

};
</script>
