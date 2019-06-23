<template>
    <div>
        <md-table v-model="markets" :table-header-color="tableHeaderColor"  md-sort="name" md-sort-order="asc"
                  md-fixed-header @md-selected="onSelect">
            <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
                <md-table-cell md-label="Nom" md-sort-by="name">{{ item.name }} </md-table-cell>
                <md-table-cell md-label="Ville" md-sort-by="city">{{ item.city }}</md-table-cell>
                <md-table-cell md-label="">
                    <md-button class="md-default md-sm md-simple" @click="onDelete(item)"><md-icon >delete</md-icon></md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <md-button class="md-fab md-primary" @click="onCreate">
            <md-icon>add</md-icon>
        </md-button>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Marché</md-dialog-title>
            <md-content>
                <form novalidate class="md-layout">
                    <div class="md-layout-item md-size-50">
                        <md-field >
                            <label for="name">Nom</label>
                            <md-input name="name" id="name" v-model="editForm.name" />
                            <span class="md-error" >The name is required</span>
                            <span class="md-error">Invalid name</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-50">
                        <md-field>
                            <label for="city">Ville</label>
                            <md-input name="city" id="city" v-model="editForm.city" />
                            <span class="md-error" >The city is required</span>
                            <span class="md-error" >Invalid city name</span>
                        </md-field>
                    </div>
                </form>
            </md-content>
            <md-dialog-actions>
                <md-button class="md-default" type="reset" @click="onReset">Close</md-button>
                <md-button class="md-success" type="submit" @click="validatemarket">Save</md-button>
            </md-dialog-actions>
        </md-dialog>
        <md-dialog-confirm
                :md-active.sync="showDeleteConfirm"
                md-content="Voulez-vous supprimer cette fiche?"
                md-confirm-text="Supprimer"
                md-cancel-text="Annuler"
                @md-cancel="toDelete=null"
                @md-confirm="onDeleteConfirm" />
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
        name: "market-table",
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
                markets: [],
                editForm: {
                    id:'',
                    name: '',
                    city: '',
                },
                message: '',
                showMessage : false,
                showDialog: false,
                showDeleteConfirm:false,
                toDelete: null,
            };
        },
        validations: {
            form: {
                name: {
                    minLength: minLength(3)
                },
            }
        },
        methods: {
            initForm() {
                this.editForm.id=null;
                this.editForm.name=null;
                this.editForm.city=null;
            },
            getMarkets(){
                const path = 'http://localhost:3000/api/markets?access_token=TRRJgMx6Svy9AhYx5DcPJx0nvdKXr7DloSn53AEEGgMHlMYN7wH1JMIIKGfoKxqA';
                axios.get(path)
                    .then((res) => {
                        this.markets = res.data;
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error);
                    });
            },
            validatemarket(evt){
                //Validation du formulaire
                evt.preventDefault();
                this.onSubmitUpdate();

            },
            onCreate(){
                this.initForm();
                this.showDialog = true;
            },
            onSelect(item) {
                if (item && !this.showDeleteConfirm){
                    this.editForm = JSON.parse(JSON.stringify(item));
                    this.showDialog = true;
                }
            },
            onReset(evt) {
                evt.preventDefault();
                this.showDialog = false;
                this.initForm();
            },
            onSubmitUpdate() {
                this.showDialog = false;
                let payload = {
                    name: this.editForm.name,
                    city: this.editForm.city,
                };
                //On est en mode edit
                if (this.editForm.id!==null){
                    this.updateMarket(payload, this.editForm.id);
                }
                //On est en mode create
                else{
                    this.createMarket(payload);
                }
                this.initForm();
            },
            updateMarket(payload, marketID) {
                const path = `http://localhost:3000/api/markets/${marketID}?access_token=TRRJgMx6Svy9AhYx5DcPJx0nvdKXr7DloSn53AEEGgMHlMYN7wH1JMIIKGfoKxqA`;
                axios.patch(path, payload)
                    .then(() => {
                        this.message = 'Fiche marché mise à jour';
                        console.log(this.message);
                        this.getMarkets();
                        //this.showMessage = true;
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error);
                        this.getMarkets();
                    });
            },
            createMarket(payload) {
                const path = `http://localhost:3000/api/markets?access_token=TRRJgMx6Svy9AhYx5DcPJx0nvdKXr7DloSn53AEEGgMHlMYN7wH1JMIIKGfoKxqA`;
                axios.post(path, payload)
                    .then(() => {
                        this.message = 'Fiche marché créée';
                        console.log(this.message);
                        this.getMarkets();
                        //this.showMessage = true;
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error);
                        this.getMarkets();
                    });
            },
            deleteMarket(marketID){
                const path = `http://localhost:3000/api/markets/${marketID}?access_token=TRRJgMx6Svy9AhYx5DcPJx0nvdKXr7DloSn53AEEGgMHlMYN7wH1JMIIKGfoKxqA`;
                console.log(path);
                axios.delete(path)
                    .then(() => {
                        this.message = 'Fiche marché supprimée';
                        console.log(this.message);
                        this.getMarkets();
                        //this.showMessage = true;
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error);
                        this.getMarkets();
                    });
            },
            onDelete(item){
                this.toDelete = item;
                this.showDeleteConfirm = true;

            },
            onDeleteConfirm(){
                //let payload = this.toDelete;
                this.deleteMarket(this.toDelete.id);
                this.toDelete= null;
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
            this.getMarkets();
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
