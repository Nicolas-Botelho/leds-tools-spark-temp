import { Model } from "../../../../../../language/generated/ast.js"
import fs from "fs";
import { expandToString } from "langium/generate";
import path from "path";

export function generate(model: Model, target_folder: string) : void { 

    fs.writeFileSync(path.join(target_folder, "Error.vue"), generateError())
    fs.writeFileSync(path.join(target_folder, "SideLogin.vue"), generateSideLogin())

}  

function generateError(): string {
    return expandToString`
<template>
    <div class="d-flex justify-center align-center text-center h-100">
        <div>
            <h1 class="text-h1 pt-3">Opps!!!</h1>
            <h4 class="text-h4 my-8">This page you are looking for could not be found.</h4>
            <v-btn flat color="primary" class="mb-4" to="/">Go Back to Home</v-btn>
        </div>
    </div>
</template>`
}

function generateSideLogin(): string {
    return expandToString`
<script setup lang="ts">
import Logo from '@/layouts/full/logo/Logo.vue';
/* Login form */
import LoginForm from '@/components/auth/LoginForm.vue';
</script>

<template>
    <div class="pa-3">
        <v-row class="h-100vh mh-100 auth">
            <v-col cols="12" lg="7" xl="8"
                class="d-lg-flex align-center justify-center authentication position-relative">
                <div class="auth-header pt-lg-6 pt-2 px-sm-6 px-3 pb-lg-6 pb-0">
                    <div class="position-relative">
                        <Logo />
                    </div>
                </div>
                <div class="">
                </div>
            </v-col>
            <v-col cols="12" lg="5" xl="4" class="d-flex align-center justify-center bg-surface">
                <div class="mt-xl-0 mt-5 mw-100">
                    <h2 class="text-h3 font-weight-semibold mb-2">Welcome to Flexy</h2>
                    <div class="text-subtitle-1 mb-6">Your Admin Dashboard</div>
                    <LoginForm />
                    <h6 class="text-h6  text-medium-emphasis  d-flex align-center mt-6 font-weight-medium">
                        New to Flexy?
                        <v-btn class="pl-0 text-primary text-body-1 opacity-1 pl-2 font-weight-medium" height="auto"
                            to="/auth/register" variant="plain">Create an account</v-btn>
                    </h6>
                </div>
            </v-col>
        </v-row>
    </div>
</template>`
}