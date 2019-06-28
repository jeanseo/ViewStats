<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item">
                <md-card>
                    <md-card-header data-background-color="red">
                        <h4 class="title">Commerçants</h4>
                        <p class="category">Gestion de la liste des commerçants</p>
                    </md-card-header>
                    <md-card-content>
                        <merchant-table table-header-color="red"></merchant-table>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
    import { MerchantTable } from "@/components";

    export default {
        components: {
            MerchantTable,
        },
        props: {
            dataBackgroundColor: {
                type: String,
                default: ""
            }
        }
    };
</script>
