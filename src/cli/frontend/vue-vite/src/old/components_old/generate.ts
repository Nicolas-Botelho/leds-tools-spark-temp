import { Model } from "../../../../../language/generated/ast.js"
import fs from "fs";
import { createPath } from "../../../../util/generator-utils.js";
import { expandToString } from "langium/generate";
import path from "path";

export function generate(model: Model, target_folder: string) : void {

    const apps_folder = createPath(target_folder, "apps/ecommerce/listing")
    const shared_folder =  createPath(target_folder, "shared")

    fs.mkdirSync(apps_folder, {recursive:true})
    fs.mkdirSync(shared_folder, {recursive:true})

    fs.writeFileSync(path.join(apps_folder, 'colorsOption.ts'), generateApp());
    fs.writeFileSync(path.join(shared_folder, 'UiParentCard.vue'), generateSharedUiParent());
    fs.writeFileSync(path.join(shared_folder, 'BaseBreadcrumb.vue'), generateSharedBaseBread());

}  

function generateApp(): string {
    return expandToString`
// ==============================|| PRODUCT - COLOR FILTER ||============================== //
// project imports
import type { ColorsOptionsProps } from '@/types/apps/EcommerceType';

const ColorsOptions: ColorsOptionsProps[] = [
    {
        label: 'Light Primary',
        value: 'primary',
        bg: 'bg-primary'
    },
    {
        label: 'Light Secondary',
        value: 'secondary',
        bg: 'bg-secondary'
    },
    {
        label: 'Light Green',
        value: 'lightsuccess',
        bg: 'bg-lightsuccess'
    },
    {
        label: 'Green',
        value: 'success',
        bg: 'bg-success'
    },
    {
        label: 'Light Red',
        value: 'lighterror',
        bg: 'bg-lighterror'
    },
    {
        label: 'Red',
        value: 'error',
        bg: 'bg-error'
    },
    {
        label: 'Yellow',
        value: 'warning',
        bg: 'bg-warning'
    },
    {
        label: 'Dark Yellow',
        value: 'lightwarning',
        bg: 'bg-lightwarning'
    },
    {
        label: 'Grey',
        value: 'lightText',
        bg: 'bg-lightText'
    },
    {
        label: 'Black',
        value: 'darkText',
        bg: 'bg-darkText'
    }
];

export default ColorsOptions;`
}

function generateSharedBaseBread(): string {
    return expandToString`
<script async setup >

const props = defineProps({
    title: String,
    breadcrumbs: Array ,
    icon: String,
    text: String
});


</script>

<template>
    <div class="mt-3 mb-6">
        <div class="d-flex justify-space-between">
            <div class="d-flex py-0 align-center">
                <div>
                    <h3 class="text-h3 mb-2">{{ title }}</h3>
                    <v-breadcrumbs :items="breadcrumbs" class=" pa-0 ml-n1">
                        <template v-slot:divider v-if="breadcrumbs">
                            <v-icon>mdi-chevron-right</v-icon>
                        </template>
                        <template v-slot:title="{ item }">
                            <h6 class="text-h6 font-weight-regular">{{ item.text }}</h6>
                        </template>
                    </v-breadcrumbs>
                </div>
            </div>
        </div>
    </div>
</template>

<style async lang="scss">
.page-breadcrumb {
    .v-toolbar {
        background: transparent;
    }
}
</style>`
}

function generateSharedUiParent(): string {
    return expandToString`
<script async setup lang="ts">
const props = defineProps({
    title: String
});
</script>

// ===============================|| Ui Parent Card||=============================== //
<template>
    <v-card elevation="10" >
        <v-card-item class="py-4 px-6">
            <div class="d-sm-flex align-center justify-space-between">
                <v-card-title class="text-h5">{{ title }}</v-card-title>
                <!-- <template v-slot:append> -->
                <slot name="action"></slot>
                <!-- </template> -->
            </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>
            <slot />
        </v-card-text>
    </v-card>
</template>`
}