<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <router-link to="/" class="navbar-brand">Budget App</router-link>    
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <router-link to="/" class="nav-link">Home</router-link>    
            </li>
            <li class="nav-item">
                <router-link to="/login" class="nav-link">Login</router-link>    
            </li>
            <li class="nav-item">
                <!-- <a class="nav-link" href="#">Register</a> -->
                <router-link to="/register" class="nav-link">Register</router-link>    
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Logout</a>
            </li>
        </ul>
    </div>
    </nav>
</template>