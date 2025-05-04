import { Model } from "../../../../../../language/generated/ast.js";
import fs from "fs";
import path from "path";


export function generate(model: Model, target_folder: string) : void {
    fs.writeFileSync(path.join(target_folder, 'NavGroup.vue'), generateNavGroup());
    fs.writeFileSync(path.join(target_folder, 'NavItem.vue'), generateNavItem());
    fs.writeFileSync(path.join(target_folder, 'NavMenu.vue'), generateNavMenu());
}


function generateNavGrop(): string {
    return expandToString`
<script lang="ts" setup>
import { ref } from 'vue'
import IconNav from '../icons/IconNav.vue';

defineProps<{
  label: string
}>()

const open = ref(false)
</script>

<template>
  <div class="bg-white/5 rounded">
    <button
      class="flex items-center justify-between w-full px-3 py-2 gap-2 text-left transition hover:bg-white/10"
      @click="open = !open"
    >
      <span>{{ label }}</span>
      <IconNav :open="open" />
    </button>

    <div
      v-if="open"
      class="mt-2 p1-3 space-y-1"
    >
      <slot />
    </div>
  </div>
</template>
`
}


function generateNavItem(): string {
    return expandToString`
<script lang="ts" setup>
defineProps<{
  label: string
}>()
</script>

<template>
  <router-link
    class="block px-3 py-2 rounded hover:bg-gray-0/10 transition-colors"
    active-class="bg-white/20 font-semibold"
  >
    {{ label }}
  </router-link>
</template>
`
}


function generateNavMenu(): string {
    return expandToString`
defineProps<{
  label: string
}>()
</script>

<template>
  <router-link
    class="block px-3 py-2 rounded hover:bg-gray-0/10 transition-colors"
    active-class="bg-white/20 font-semibold"
  >
    {{ label }}
  </router-link>
</template>
`
}


