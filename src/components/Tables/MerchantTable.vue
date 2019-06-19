<template>
    <div>
        <md-table v-model="merchants" :table-header-color="tableHeaderColor"  md-sort="name" md-sort-order="asc"
                  md-fixed-header @md-selected="onSelect">
            <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
                <md-table-cell md-label="Nom" md-sort-by="name">{{ item.firstName }} {{ item.lastName }}</md-table-cell>
                <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Téléphone" md-sort-by="phone">{{ item.phone }}</md-table-cell>
                <md-table-cell md-label="Marché" md-sort-by="market">{{ item.marketId }}</md-table-cell>
                <md-table-cell md-label="Revenus" md-sort-by="incoming" md-numeric>{{ item.incoming }}</md-table-cell>
                <md-table-cell md-label="Congés" md-sort-by="holidays" md-numeric>{{ item.holidays }}</md-table-cell>
                <md-table-cell md-label="Modification" md-sort-by="updated">{{ item.lastUpdated }}</md-table-cell>
                <md-table-cell md-label="">

                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "merchant-table",
        props: {
            tableHeaderColor: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                selected: {},
                merchants: [],
                addMerchantForm: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    incoming: '',
                    holidays: '',
                },
                editForm: {
                    id:'',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    incoming: '',
                    holidays: '',
                },
                message: '',
                showMessage : false,
            };
        },
        methods: {
            getMerchants() {
                const path = 'http://localhost:3000/api/merchants?filter=%7B%22where%22%3A%7B%22deleted%22%3A%22false%22%7D%7D&access_token=TRRJgMx6Svy9AhYx5DcPJx0nvdKXr7DloSn53AEEGgMHlMYN7wH1JMIIKGfoKxqA';
                axios.get(path)
                    .then((res) => {
                        this.merchants = res.data;
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error);
                    });
            },

        },
        created() {
            this.getMerchants();
        },
        components: {
        },
    };
</script>
<style lang="scss" scoped>
    .md-table + .md-table {
        margin-top: 16px
    }
</style>
