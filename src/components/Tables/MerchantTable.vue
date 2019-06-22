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

        <md-dialog :md-active.sync="showDialog">
                <md-dialog-title>Preferences</md-dialog-title>
                <md-content>
                    <form novalidate class="md-layout">
                            <div class="md-layout-item md-size-50">
                                <md-field >
                                    <label for="first-name">Prénom</label>
                                    <md-input name="first-name" id="first-name" v-model="editForm.firstName" />
                                    <span class="md-error" >The first name is required</span>
                                    <span class="md-error">Invalid first name</span>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-size-50">
                                <md-field>
                                    <label for="last-name">Nom</label>
                                    <md-input name="last-name" id="last-name" v-model="editForm.lastName" />
                                    <span class="md-error" >The last name is required</span>
                                    <span class="md-error" >Invalid last name</span>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-size-50">
                                <md-field >
                                    <label for="email">Email</label>
                                    <md-input name="email" id="email" type="email" v-model="editForm.email" />
                                    <span class="md-error" >The Email is required</span>
                                    <span class="md-error">Invalid Email</span>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-size-50">
                                <md-field>
                                    <label for="phone-number">Phone number</label>
                                    <md-input name="phone-number" id="phone-number" v-model="editForm.phone" />
                                    <span class="md-error" >The phone number is required</span>
                                    <span class="md-error" >Invalid phone number</span>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-size-50">
                                <md-field >
                                    <label for="incoming">Revenus</label>
                                    <md-input name="incoming" id="incoming" type="number" v-model="editForm.incoming" />
                                    <span class="md-error" >The Email is required</span>
                                    <span class="md-error">Invalid Email</span>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-size-50">
                                <md-field>
                                    <label for="holidays">Congés</label>
                                    <md-input name="holidays" id="holidays" type="number" v-model="editForm.holidays"/>
                                    <span class="md-error" >The phone number is required</span>
                                    <span class="md-error" >Invalid phone number</span>
                                </md-field>
                            </div>
                    </form>
                </md-content>
                <md-dialog-actions>
                    <md-button class="md-primary" type="reset" @click="onReset">Close</md-button>
                    <md-button class="md-alert" type="submit" @click="validateMerchant">Save</md-button>
                </md-dialog-actions>
            </md-dialog>
    </div>
</template>

<script>
    import axios from 'axios';
    import {Modal} from '@/components';
    import { validationMixin } from 'vuelidate';
    import {
        required,
        email,
        minLength,
        maxLength
    } from 'vuelidate/lib/validators';
    export default {
        name: "merchant-table",
        mixins: [validationMixin],
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
                showDialog: false,
            };
        },
        validations: {
            form: {
                firstName: {
                    minLength: minLength(3)
                },
            }
        },
        methods: {
            initForm() {
                this.editForm.id=null;
            },
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
            validateMerchant(evt){
                //Validation du formulaire
                evt.preventDefault();
                this.onSubmitUpdate();
            },
            onSelect(item) {
                this.editForm = JSON.parse(JSON.stringify(item));
                this.editForm.firstName = item.firstName;
                console.log("Apparition 1");
                this.showDialog = true;
            },
            onReset(evt) {
                evt.preventDefault();
                console.log("Disparition 1");
                this.showDialog = false;
                this.initForm();
            },
            onSubmitUpdate() {
                console.log("Disparition 2");
                this.showDialog = false;
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
                this.initForm();
            },
            updateMerchant(payload, merchantID) {
                const path = `http://localhost:3000/api/merchants/${merchantID}?access_token=TRRJgMx6Svy9AhYx5DcPJx0nvdKXr7DloSn53AEEGgMHlMYN7wH1JMIIKGfoKxqA`;
                axios.put(path, payload)
                    .then(() => {
                        this.message = 'Marchand mis à jour';
                        console.log(this.message);
                        this.getMerchants();
                        //this.showMessage = true;
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error);
                        this.getMerchants();
                    });
            },
            getValidationClass (fieldName) {
                const field = this.$v.form[fieldName];

                if (field) {
                    console.log(field.$invalid && field.$dirty);
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
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
    .md-dialog {
        max-width: 768px;
    }
</style>
