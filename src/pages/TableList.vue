<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Commerçants</h4>
            <p class="category">Gestion de la liste des commerçants</p>
          </md-card-header>
          <md-card-content>
            <merchant-table table-header-color="green"></merchant-table>
          </md-card-content>
        </md-card>
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Marchés</h4>
            <p class="category">Gestion de la liste des marchés</p>
          </md-card-header>
          <md-card-content>
            <market-table table-header-color="red"></market-table>
          </md-card-content>
        </md-card>
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Agents de collecte</h4>
            <p class="category">Gestion de la liste des agents de collecte</p>
          </md-card-header>
          <md-card-content>
            <agent-table table-header-color="red"></agent-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { MerchantTable } from "@/components";
import { MarketTable } from "@/components";
import { AgentTable } from "@/components";



export default {
  components: {
    MerchantTable,
    MarketTable,
    AgentTable,
  }
};
</script>
