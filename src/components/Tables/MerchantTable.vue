<template>
    <div>
        <md-table v-model="merchants" :table-header-color="tableHeaderColor"  md-sort="name" md-sort-order="asc"
                  md-fixed-header @md-selected="onSelect">
            <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
                <md-table-cell md-label="Nom" md-sort-by="name">{{ item.firstName }} {{ item.lastName }}</md-table-cell>
                <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Téléphone" md-sort-by="phone">{{ item.phone }}</md-table-cell>
                <md-table-cell md-label="Marché" md-sort-by="market">{{ getMarketbyId(item.marketId) }}</md-table-cell>
                <md-table-cell md-label="Revenus" md-sort-by="incoming" md-numeric>{{ item.incoming }}</md-table-cell>
                <md-table-cell md-label="Congés" md-sort-by="holidays" md-numeric>{{ item.holidays }}</md-table-cell>
                <md-table-cell md-label="Modification" md-sort-by="updated">{{displayDate(item.lastUpdated) }}</md-table-cell>
                <md-table-cell md-label="">
                    <md-button class="md-default md-sm md-simple" @click="onDelete(item)"><md-icon >delete</md-icon></md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <md-button class="md-fab md-primary" @click="onCreate">
            <md-icon>person_add</md-icon>
        </md-button>
        <md-dialog :md-active.sync="showDialog">
                <md-dialog-title>Commerçant</md-dialog-title>
                <md-content>
                    <form novalidate class="md-layout">
                            <div class="md-layout-item md-size-100">
                                <md-avatar class="md-large">
                                    <img v-bind:src="editFormPortraitFile" alt="Portrait">
                                </md-avatar>
                            </div>
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
                                    <label for="marketId">Marché</label>
                                    <md-select  name="marketId" id="marketId" v-model="editForm.marketId" md-dense>
                                        <md-option v-for="market in markets" v-bind:value="market.id">
                                            {{ market.name }}
                                        </md-option>
                                    </md-select >
                                    <span class="md-error" >The first name is required</span>
                                    <span class="md-error">Invalid first name</span>
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
                        <div class="md-layout-item md-size-50">
                            <md-field>
                                <label>Portrait</label>
                                <md-file name="pictureFileName" id="pictureFileName" v-model="editForm.pictureFileName" accept="image/*"
                                         @md-change="onSelectPicture"/>
                            </md-field>
                        </div>
                    </form>
                </md-content>
                <md-dialog-actions>
                    <md-button class="md-default" type="reset" @click="onReset">Close</md-button>
                    <md-button class="md-success" type="submit" @click="validateMerchant">Save</md-button>
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
    let moment = require('moment');
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
                markets: [],
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
                    creationDate: '',
                    marketId: '',
                    pictureFileName: '',
                },
                message: '',
                showMessage : false,
                showDialog: false,
                showDeleteConfirm:false,
                toDelete: null,
                editFormPortraitFile: null,
                editFormSelectPicture : false,
                fileToUpload : null,
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
                this.editForm.email=null;
                this.editForm.phone=null;
                this.editForm.incoming=null;
                this.editForm.holidays=null;
                this.editForm.lastName=null;
                this.editForm.firstName=null;
                this.editForm.marketId=null;
                this.editForm.creationDate=null;
                this.editForm.pictureFileName=null;
                this.editFormPortraitFile = null;
                this.editFormSelectPicture = false;



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
            onCreate(){
                this.initForm();
                this.showDialog = true;
            },
            onSelect(item) {
                if (item && !this.showDeleteConfirm){
                    this.editForm = JSON.parse(JSON.stringify(item));
                    this.editFormPortraitFile = this.getPortrait(item.pictureFileName);
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
                    firstName: this.editForm.firstName,
                    lastName: this.editForm.lastName,
                    email: this.editForm.email,
                    phone: this.editForm.phone,
                    incoming: this.editForm.incoming,
                    holidays: this.editForm.holidays,
                    lastUpdated: Date.now(),
                    marketId: this.editForm.marketId,
                    deleted: false,
                };
                //Upload du fichier
                if(this.editFormSelectPicture){
                    let fileName = this.uploadFile(this.fileToUpload);
                    payload.pictureFileName = this.editForm.pictureFileName;
                }
                //On est en mode edit
                if (this.editForm.id!==null){
                    this.updateMerchant(payload, this.editForm.id);
                }
                //On est en mode create
                else{
                    payload.creationDate = Date.now();
                    this.createMerchant(payload);
                }
                this.initForm();
            },
            updateMerchant(payload, merchantID) {
                const path = `http://localhost:3000/api/merchants/${merchantID}?access_token=TRRJgMx6Svy9AhYx5DcPJx0nvdKXr7DloSn53AEEGgMHlMYN7wH1JMIIKGfoKxqA`;
                axios.patch(path, payload)
                    .then(() => {
                        this.message = 'Fiche marchand mise à jour';
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
            createMerchant(payload) {
                const path = `http://localhost:3000/api/merchants?access_token=TRRJgMx6Svy9AhYx5DcPJx0nvdKXr7DloSn53AEEGgMHlMYN7wH1JMIIKGfoKxqA`;
                axios.post(path, payload)
                    .then(() => {
                        this.message = 'Fiche marchand créée';
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
            onDelete(item){
                this.toDelete = item;
                this.showDeleteConfirm = true;

            },
            onDeleteConfirm(){
                //let payload = this.toDelete;
                let payload = {
                    deleted : true,
                    "lastUpdated": Date.now()
                };
                this.updateMerchant(payload,this.toDelete.id);
                this.toDelete= null;
            },
            getMarketbyId(marketId){
                    const targetObject = this.markets.find(item => item.id === marketId);
                if (targetObject!==undefined){

                    return `${targetObject.name} (${targetObject.city})`;
                }
                else{
                    return ""
                }
            },
            getPortrait(pictureFileName){
                if(pictureFileName!==null){
                    return `http://localhost:3000/api/containers/photos/download/${pictureFileName}?access_token=QIORachmY5HE5gEes6S8x72CTDpZmu63deGCnWgALqnKPVf1s5LZtLiAMpz9hbBp`;
                }
            },
            onSelectPicture(evt){
                if (evt[0]){
                    const reader = new FileReader;
                    reader.onload = e => {
                        this.editFormPortraitFile = e.target.result;
                    };
                    reader.readAsDataURL(evt[0]);
                    this.editFormSelectPicture = true;
                    this.fileToUpload = evt[0];
                }
            },
            uploadFile(file){
                const path = `http://localhost:3000/api/containers/photos/upload/?access_token=QIORachmY5HE5gEes6S8x72CTDpZmu63deGCnWgALqnKPVf1s5LZtLiAMpz9hbBp`;
                let formData = new FormData();
                formData.append('file', file);
                axios.post(path, formData)
                    .then((res) => {
                        this.message = 'Fiche marchand mise à jour';
                        return res.data.result.files.file[0].name
                        //this.showMessage = true;
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error);
                        return null;
                    });

            },
            displayDate(date){
                return moment(date).locale('fr').format('Do MMMM YYYY, hh:m');
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
