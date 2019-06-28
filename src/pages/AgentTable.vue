<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item">
                <md-card>
                    <md-card-header data-background-color="red">
                        <h4 class="title">Agents de collecte</h4>
                        <p class="category">Gestion de la liste des commerçants</p>
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
    import { AgentTable } from "@/components";

    export default {
        components: {
            AgentTable,
        },
        props: {
            dataBackgroundColor: {
                type: String,
                default: ""
            }
        }
    };
</script>
