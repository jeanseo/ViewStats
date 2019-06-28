<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item">
                <md-card>
                    <md-card-header data-background-color="red">
                        <h4 class="title">Marchés</h4>
                        <p class="category">Gestion de la liste des marchés</p>
                    </md-card-header>
                    <md-card-content>
                        <market-table table-header-color="red"></market-table>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
    import { MarketTable } from "@/components";

    export default {
        components: {
            MarketTable,
        },
        props: {
            dataBackgroundColor: {
                type: String,
                default: ""
            }
        }
    };
</script>
