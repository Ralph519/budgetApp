<template>
    <div id="NewBudget">
        <div class="container">
            <div class="col-md-12 text-right mt-2">
                <small>
                    <a href="#!" class=" text-secondary" @click="showNewBudgetModal">Add New Budget</a>
                </small>
            </div>
            
        </div>
        
        <modal
            name="newBudgetModal"
            transition="nice-modal-fade"
            height="auto"
            :width="350"
            :delay="100"
        >
            <div class="card border-secondary">
                <div class="card-header pt-3">
                    <h5 class="card-title text-primary">
                        Add New Budget
                        <button
                            type="button"
                            class="close"
                            @click="hideNewBudgetModal"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </h5>
                </div>
                <div class="card-body mb-5">
                    <small>
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="newBudget"><i class="fas fa-hand-holding-usd mr-2"></i>Budget Amount</label>
                                        <input 
                                            type="newBudget" 
                                            name="newBudget" 
                                            id="newBudget" 
                                            class="form-control form-control-sm"
                                            placeholder="Budget Amount"
                                            @focus="$event.target.select()"
                                            ref="newBudget"
                                            autocomplete="off"
                                            v-model="newBudget"
                                        >
                                    </div>    
                                </div>
                            </div>
                        </div>
                      

                        <div class="col-md-12">
                            <button 
                                class="btn btn-primary form-control"
                                @click="login"
                            >
                                Add New Budget
                            </button>
                        </div>

                    </small>
                </div>

            </div>
        </modal>
    </div>
</template>

<script>
import db from '../firebase'
import Swal from 'sweetalert2'

export default {
    name: 'newbudget',
    data() {
        return {
            newBudget: 0.00,
        }
    },
    mounted() {
        const t = this;

        t.$modal.show('newBudgetModal')
    },
    created() {
        const t = this;

        t.$modal.show('newBudgetModal')
    },
    methods: {
        login(){
            const t = this;

            if (t.email == ''){
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Email should not be blank',
                    onAfterClose: () => t.$refs.email.focus(),
                })

                return
            }

            if (t.password == ''){
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Password should not be blank',
                    onAfterClose: () => t.$refs.password.focus(),
                })

                return
            }

            db
            .app
            .auth()
            .signInWithEmailAndPassword(t.email,t.password)
            .then(() => {
                this.$router.go({path: this.$router.path})
            },
            err => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: err.message,
                })
            })
        },
        hideNewBudgetModal() {
            this.$modal.hide('newBudgetModal')
        },
        showNewBudgetModal() {
            this.$modal.show('newBudgetModal')
        }
    }
}
</script>