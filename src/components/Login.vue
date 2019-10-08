<template>
    <div id="Login">
        <div class="container">
            <div class="col-md-12 text-right mt-2">
                <small>
                    <a href="#!" class=" text-secondary" @click="showloginModal">Show Login</a>
                </small>
            </div>
            
        </div>
        
        <modal
            name="loginModal"
            transition="nice-modal-fade"
            height="auto"
            :width="350"
            :delay="100"
        >
            <div class="card border-secondary">
                <div class="card-header pt-3">
                    <h5 class="card-title text-primary">
                        Login
                        <button
                            type="button"
                            class="close"
                            @click="hideLoginModal"
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
                                @click="login"
                            >
                                Login
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
    name: 'login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    mounted() {
        const t = this;

        t.$modal.show('loginModal')
    },
    created() {
        const t = this;

        t.$modal.show('loginModal')
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
                // Swal.fire(
                // 'You are logged in',
                // `as ${user.user.email}`,
                // 'success'
                // )
                // this.$router.push('/')
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
        hideLoginModal() {
            this.$modal.hide('loginModal')
        },
        showloginModal() {
            this.$modal.show('loginModal')
        }
    }
}
</script>