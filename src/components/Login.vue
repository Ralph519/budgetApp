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
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <button class="btn btn-primary form-control">Login</button>
                        </div>

                    </small>
                </div>

                <!-- <div class="card-footer">
                    <div class="text-right">
                        <a href="#!" class="btn btn-secondary btn-sm" @click="hideLoginModal">Close</a>
                    </div>
                </div> -->
            </div>
        </modal>
    </div>
</template>

<script>
export default {
    name: 'login',
    mounted() {
        const t = this;

        t.$modal.show('loginModal')
    },
    created() {
        const t = this;

        t.$modal.show('loginModal')
    },
    methods: {
        hideLoginModal() {
            this.$modal.hide('loginModal')
        },
        showloginModal() {
            this.$modal.show('loginModal')
        }
    }
}
</script>