<template>
    <div id="Login">
        <div class="container">
            <div class="col-md-12 text-right mt-2">
                <small>
                    <a href="#!" class=" text-secondary" @click="showRegisterModal">Show Register Form</a>
                </small>
            </div>
            
        </div>
        
        <modal
            name="registerModal"
            transition="nice-modal-fade"
            height="auto"
            :width="350"
            :delay="100"
        >
            <div class="card border-secondary">
                <div class="card-header pt-3">
                    <h5 class="card-title text-primary">
                        Register
                        <button
                            type="button"
                            class="close"
                            @click="hideRegisterModal"
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
                                        <label for="email"><i class="far fa-envelope mr-2"></i>Email</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                            class="form-control form-control-sm"
                                            placeholder="Email"
                                            @focus="$event.target.select()"
                                            ref="email"
                                            autocomplete="off"
                                            v-model="email"
                                        >
                                    </div>    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="password"><i class="fas fa-lock mr-2"></i>Password</label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            id="password" 
                                            class="form-control form-control-sm"
                                            ref="password"
                                            placeholder="Password"
                                            autocomplete="off"
                                            v-model="password"
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <button 
                                class="btn btn-primary form-control"
                                @click="register"
                            >
                                Register
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
    name: 'register',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    mounted() {
        this.showRegisterModal()
    },
    created() {
        this.showRegisterModal()
    },
    methods: {
        register(){
            const t = this;

            db
            .app
            .auth()
            .createUserWithEmailAndPassword(t.email,t.password)
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
        hideRegisterModal() {
            this.$modal.hide('registerModal')
        },
        showRegisterModal() {
            this.$modal.show('registerModal')
        }
    }
}
</script>