<template>
    <div>
        <md-table v-model="agents" :table-header-color="tableHeaderColor"  md-sort="name" md-sort-order="asc"
                  md-fixed-header @md-selected="onSelect">
            <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
                <md-table-cell>
                    <md-avatar>
                        <img v-bind:src="getPortrait(item.pictureFileName)" alt="Portrait">
                    </md-avatar>
                </md-table-cell>
                <md-table-cell md-label="Nom" md-sort-by="name">{{ item.firstName }} {{ item.lastName }}</md-table-cell>
                <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Téléphone">{{ item.phoneNumber }}</md-table-cell>
                <md-table-cell md-label="Dernière connexion" md-sort-by="updated">{{displayDate(item.lastLoginDate) }}</md-table-cell>
                <md-table-cell md-label="Lieu de dernière connexion" md-sort-by="updated">{{item.lastLoginPlace }}</md-table-cell>
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
                            <label for="username">Nom d'utilisateur</label>
                            <md-input name="username" id="username" v-model="editForm.username" />
                            <span class="md-error" >The username is required</span>
                            <span class="md-error">Invalid username</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-50">
                        <md-field >
                            <label for="password">Nom d'utilisateur</label>
                            <md-input name="password" id="password" type="password" v-model="editForm.password" />
                            <span class="md-error" >The password is required</span>
                            <span class="md-error">Invalid password</span>
                        </md-field>
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
                            <label for="phone-number">Numéro de téléphone</label>
                            <md-input name="phone-number" id="phone-number" v-model="editForm.phoneNumber" />
                            <span class="md-error" >The phone number is required</span>
                            <span class="md-error" >Invalid phone number</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-50">
                        <md-field>
                            <label for="address">Adresse</label>
                            <md-input name="address" id="address" v-model="editForm.address" />
                            <span class="md-error" >The address is required</span>
                            <span class="md-error" >Invalid address</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-50">
                        <md-field >
                            <label for="birthDate">Date de naissance</label>
                            <md-input name="birthDate" id="birthDate" type="date" v-model="editForm.birthDate" />
                            <span class="md-error" >The birth date is required</span>
                            <span class="md-error">Invalid birth date</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-50">
                        <md-field>
                            <label for="birthPlace">Lieu de naissance</label>
                            <md-input name="birthPlace" id="birthPlace" v-model="editForm.birthPlace"/>
                            <span class="md-error" >The birth place number is required</span>
                            <span class="md-error" >Invalid birth place</span>
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
                <md-button class="md-success" type="submit" @click="validateAgent">Save</md-button>
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
        name: "agent-table",
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
                agents: [],
                markets: [],
                editForm: {
                    id: '',
                    username: '',
                    firstName: '',
                    lastName: '',
                    birthDate: '',
                    birthPlace: '',
                    email: '',
                    phoneNumber: '',
                    address: '',
                    lastLoginPlace: '',
                    lastLoginDate: '',
                    pictureFileName: '',
                    password: '',
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
                this.editForm.username=null;
                this.editForm.firstName=null;
                this.editForm.lastName=null;
                this.editForm.birthDate=null;
                this.editForm.birthPlace=null;
                this.editForm.email=null;
                this.editForm.phoneNumber=null;
                this.editForm.address=null;
                this.editForm.lastLoginPlace=null;
                this.editForm.lastLoginDate=null;
                this.editForm.pictureFileName = null;
                this.editForm.password = null;
                this.editFormPortraitFile= null;

            },
            getAgents() {
                const path = 'http://localhost:3000/api/agents?filter={%22where%22%3A{%22username%22%3A{%22neq%22%3A%22admin%22}}}';
                axios.get(path)
                    .then((res) => {
                        this.agents = res.data;
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error);
                    });
            },
            validateAgent(evt){
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
                    this.editForm.birthDate = moment(this.editForm.birthDate).format('YYYY-MM-DD')
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
                    username: this.editForm.username,
                    firstName: this.editForm.firstName,
                    lastName: this.editForm.lastName,
                    email: this.editForm.email,
                    phoneNumber: this.editForm.phoneNumber,
                    birthDate: this.editForm.birthDate,
                    birthPlace: this.editForm.birthPlace,
                    address: this.editForm.address,
                    password: this.editForm.password,
                };
                //Upload du fichier
                if(this.editFormSelectPicture){
                    let fileName = this.uploadFile(this.fileToUpload);
                    payload.pictureFileName = this.editForm.pictureFileName;
                }
                //On est en mode edit
                if (this.editForm.id!==null){
                    this.updateAgent(payload, this.editForm.id);
                }
                //On est en mode create
                else{
                    this.createAgent(payload);
                }
                this.initForm();
            },
            updateAgent(payload, agentID) {
                const path = `http://localhost:3000/api/agents/${agentID}`;
                axios.patch(path, payload)
                    .then(() => {
                        this.message = 'Fiche agent mise à jour';
                        console.log(this.message);
                        this.getAgents();
                        //this.showMessage = true;
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error);
                        this.getAgents();
                    });
            },
            createAgent(payload) {
                console.log(payload);
                const path = `http://localhost:3000/api/agents`;
                axios.post(path, payload)
                    .then(() => {
                        this.message = 'Fiche agent créée';
                        console.log(this.message);
                        this.getAgents();
                        //this.showMessage = true;
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error);
                        this.getAgents();
                    });
            },
            deleteAgent(agentID){
                const path = `http://localhost:3000/api/agents/${agentID}?access_token=4TBhcD2VGxjzTBE07fG5HGeEU1vNpNmMydBcyNiVa8c2NZcpl78jqWN82CFfNDiw`;
                console.log(path);
                axios.delete(path)
                    .then(() => {
                        this.message = 'Fiche agent supprimée';
                        console.log(this.message);
                        this.getAgents();
                        //this.showMessage = true;
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error);
                        this.getAgents();
                    });
            },
            onDelete(item){
                this.toDelete = item;
                this.showDeleteConfirm = true;

            },
            onDeleteConfirm(){
                //let payload = this.toDelete;
                this.deleteAgent(this.toDelete.id);
                this.toDelete= null;
            },
            getPortrait(pictureFileName){
                if(pictureFileName!==null){
                    return `http://localhost:3000/api/containers/photos/download/${pictureFileName}?access_token=iBpEKzCzLOW4WgjXhxuWDVeBI27JX0GJ3kCg5ElItCnQAVveqeDcTVoZxqBln4vC`;
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
                const path = `http://localhost:3000/api/containers/photos/upload/?access_token=iBpEKzCzLOW4WgjXhxuWDVeBI27JX0GJ3kCg5ElItCnQAVveqeDcTVoZxqBln4vC`;
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
            this.getAgents();
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
