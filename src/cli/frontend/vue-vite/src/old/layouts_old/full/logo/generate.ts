import fs from "fs";
import { expandToString } from "langium/generate";
import path from "path";

export function generate(target_folder: string) : void {

    fs.writeFileSync(path.join(target_folder, 'Logo.vue'), generateLogo());
    fs.writeFileSync(path.join(target_folder, 'LogoLight.vue'), generateLogoLight());
    fs.writeFileSync(path.join(target_folder, 'LogoDark.vue'), generateLogoDark());
    fs.writeFileSync(path.join(target_folder, 'RtlLogoDark.vue'), generateRtlLogoDark());
    fs.writeFileSync(path.join(target_folder, 'RtlLogoLight.vue'), generateRtlLogoLight());
}  

function generateLogo(): string {
    return expandToString`
<script setup>
import config from '@/config';
import { computed } from "vue";
import LogoDark from "./LogoDark.vue";
import LogoLight from "./LogoLight.vue";

//const dark = ref(false);
const dark = computed(() => {
  if (
    config.actTheme === "DARK_BLUE_THEME" 

  ) {
    return true;
  } else {
    return false;
  }
});
</script>
<template>
  <v-locale-provider v-if="!config.setRTLLayout">
    <LogoLight v-if="dark" />
    <LogoDark v-else />
  </v-locale-provider>
</template>`
}

function generateLogoDark(): string {
    return expandToString`
<script async setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="logo" alt="home" />
        </RouterLink>
    </div>
</template>`
}

function generateLogoLight(): string {
    return expandToString`
<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="Darklogo" alt="home" />
        </RouterLink>
    </div>
</template>`
}

function generateRtlLogoDark(): string {
    return expandToString`
<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="logo" alt="home" />
        </RouterLink>
    </div>
</template>`
}

function generateRtlLogoLight(): string {
    return expandToString`
<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="logo" alt="home" />
        </RouterLink>
    </div>
</template>`
}