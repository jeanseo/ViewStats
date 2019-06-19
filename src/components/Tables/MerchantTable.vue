<template>
    <div>
        <md-table v-model="merchants" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ merchant }">
                <md-table-cell md-label="Nom">{{ merchant.firstName }} {{ merchant.lastName }}</md-table-cell>
                <md-table-cell md-label="Email">{{ merchant.email }}</md-table-cell>
                <md-table-cell md-label="Téléphone">{{ merchant.phone }}</md-table-cell>
                <md-table-cell md-label="Marché">{{ merchant.marketId }}</md-table-cell>
                <md-table-cell md-label="Revenus">{{ merchant.incoming }}</md-table-cell>
                <md-table-cell md-label="Congés">{{ merchant.holidays }}</md-table-cell>
                <md-table-cell md-label="Supprimé">
                    <span v-if="merchant.deleted">Yes</span>
                    <span v-else>No</span>
                </md-table-cell>
                <md-table-cell md-label="">
                    <div class="btn-group" role="group">
                        <button type="button"
                                class="btn btn-warning btn-sm"
                                v-b-modal.merchant-update-modal
                                @click="editMerchant(merchant)">Update</button>
                        <button type="button"
                                class="btn btn-danger btn-sm"
                                @click="onDeleteMerchant(merchant)">Delete</button>
                    </div>
                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
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
                selected: [],
                users: [
                    {
                        name: "Dakota Rice",
                        salary: "$36,738",
                        country: "Niger",
                        city: "Oud-Turnhout"
                    },
                    {
                        name: "Minerva Hooper",
                        salary: "$23,738",
                        country: "Curaçao",
                        city: "Sinaai-Waas"
                    },
                    {
                        name: "Sage Rodriguez",
                        salary: "$56,142",
                        country: "Netherlands",
                        city: "Overland Park"
                    },
                    {
                        name: "Philip Chaney",
                        salary: "$38,735",
                        country: "Korea, South",
                        city: "Gloucester"
                    },
                    {
                        name: "Doris Greene",
                        salary: "$63,542",
                        country: "Malawi",
                        city: "Feldkirchen in Kārnten"
                    },
                    {
                        name: "Mason Porter",
                        salary: "$78,615",
                        country: "Chile",
                        city: "Gloucester"
                    }
                ],
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
            addMerchant(payload) {
                const path = 'http://localhost:3000/api/merchants?access_token=TRRJgMx6Svy9AhYx5DcPJx0nvdKXr7DloSn53AEEGgMHlMYN7wH1JMIIKGfoKxqA';
                axios.post(path, payload)
                    .then(() => {
                        this.getMerchants();
                        this.message = 'Marchand ajouté';
                        this.showMessage = true;
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        this.console.log(error);
                        this.getMerchants();
                    });
            },
            updateMerchant(payload, merchantID) {
                const path = `http://localhost:3000/api/merchants/${merchantID}?access_token=TRRJgMx6Svy9AhYx5DcPJx0nvdKXr7DloSn53AEEGgMHlMYN7wH1JMIIKGfoKxqA`;
                axios.put(path, payload)
                    .then(() => {
                        this.getMerchants();
                        this.message = 'Marchand mis à jour';
                        this.showMessage = true;
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error);
                        this.getMerchants();
                    });
            },
            editMerchant(merchant) {
                this.editForm = merchant;
            },
            initForm() {
                this.addMerchantForm.firstName = '';
                this.addMerchantForm.lastName = '';
                this.addMerchantForm.email = '';
                this.addMerchantForm.phone = '';
                this.addMerchantForm.incoming = '';
                this.addMerchantForm.holidays = '';
                this.editForm.id='';
                this.editForm.firstName = '';
                this.editForm.lastName = '';
                this.editForm.email = '';
                this.editForm.phone = '';
                this.editForm.incoming = '';
                this.editForm.holidays = '';
            },
            onSubmit(evt) {
                evt.preventDefault();
                this.$refs.addMerchantModal.hide();
                const payload = {
                    firstName: this.addMerchantForm.firstName,
                    lastName: this.addMerchantForm.lastName,
                    email : this.addMerchantForm.email,
                    phone : this.addMerchantForm.phone,
                    incoming : this.addMerchantForm.incoming,
                    holidays : this.addMerchantForm.holidays,
                    creationDate : Date.now(),
                    lastUpdated : Date.now(),
                    deleted: false,
                };
                this.addMerchant(payload);
                this.initForm();
            },
            onReset(evt) {
                evt.preventDefault();
                this.$refs.addMerchantModal.hide();
                this.initForm();
            },
            onSubmitUpdate(evt) {
                evt.preventDefault();
                this.$refs.editMerchantModal.hide();
                const payload = {
                    firstName: this.editForm.firstName,
                    lastName: this.editForm.lastName,
                    email: this.editForm.email,
                    phone: this.editForm.phone,
                    incoming: this.editForm.incoming,
                    holidays: this.editForm.holidays,
                    lastUpdated: Date.now(),
                    creationDate: this.editForm.creationDate,
                    marketId: this.editForm.marketId,
                    deleted: false,
                };
                this.updateMerchant(payload, this.editForm.id);
            },
            onResetUpdate(evt) {
                evt.preventDefault();
                this.$refs.editMerchantModal.hide();
                this.initForm();
                this.getMerchants();
            },
            removeMerchant(payload, merchantID) {
                const path = `http://localhost:3000/api/merchants/${merchantID}/replace?access_token=TRRJgMx6Svy9AhYx5DcPJx0nvdKXr7DloSn53AEEGgMHlMYN7wH1JMIIKGfoKxqA`;
                axios.post(path, payload)
                    .then(() => {
                        this.getMerchants();
                        this.message = 'Marchand supprimé';
                        this.showMessage = true;
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error);
                        this.getMerchants();
                    });
            },
            onDeleteMerchant(merchant) {
                const payload = {
                    firstName: this.editForm.firstName,
                    lastName: this.editForm.lastName,
                    email: this.editForm.email,
                    phone: this.editForm.phone,
                    incoming: this.editForm.incoming,
                    holidays: this.editForm.holidays,
                    lastUpdated: Date.now(),
                    creationDate: this.editForm.creationDate,
                    marketId: this.editForm.marketId,
                    deleted: true,
                };
                this.removeMerchant(payload, merchant.id);
            },
        },
        created() {
            this.getMerchants();
        },
        components: {
            alert: Alert,
        },
    };
</script>
