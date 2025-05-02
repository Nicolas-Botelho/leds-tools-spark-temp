import fs from "fs";
import { expandToString } from "langium/generate";
import path from "path";

export function generate(target_folder: string) : void {

    fs.writeFileSync(path.join(target_folder, 'AppsLink.vue'), generateAppLink());
    fs.writeFileSync(path.join(target_folder, 'LanguageDD.vue'), generatelanguageDD());
    fs.writeFileSync(path.join(target_folder, 'MessagesDD.vue'), generateMessagesDD());
    fs.writeFileSync(path.join(target_folder, 'Navigations.vue'), generateNavigations());
    fs.writeFileSync(path.join(target_folder, 'NotificationDD.vue'), generateNotificationDD());
    fs.writeFileSync(path.join(target_folder, 'ProfileDD.vue'), generateProfileDD());
    fs.writeFileSync(path.join(target_folder, 'QuickLinks.vue'), generateQuickLinks());
    fs.writeFileSync(path.join(target_folder, 'RightMobileSidebar.vue'), generateRightMobileSidebar());
    fs.writeFileSync(path.join(target_folder, 'Searchbar.vue'), generateSearchbar());
    fs.writeFileSync(path.join(target_folder, 'VerticalHeader.vue'), generateVerticalHeader());

}  

function generateAppLink(): string {
    return expandToString`
<script setup lang="ts">
</script>
<template>
    <!-- ---------------------------------------------- -->
    <!-- apps link -->
    <!-- ---------------------------------------------- -->
    <v-row>
        <v-col cols="12" lg="6" v-for="(item, i) in appsLink" :key="i">
            <router-link :to="item.href" class="text-decoration-none custom-text-primary">
                <div class="d-flex align-center">
                    <v-avatar size="45" color="grey100" rounded="md">
                        <v-img :src="item.avatar" width="24" height="24" :alt="item.avatar" />
                    </v-avatar>
                    <div class="ml-3">
                        <h6 class="text-subtitle-1 mb-1 textPrimary font-weight-semibold custom-title">{{ item.title }}</h6>
                        <p class="text-subtitle-2 textSecondary">{{ item.subtext }}</p>
                    </div>
                </div>
            </router-link>
        </v-col>
    </v-row>
</template>`
}

function generatelanguageDD(): string {
    return expandToString`
<script setup lang="ts">
import { ref } from 'vue';
</script>
<template>
    <!-- ---------------------------------------------- -->
    <!-- language DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false" location="bottom">
        <template v-slot:activator="{ props }">
            <v-btn icon variant="text" color="primary" v-bind="props">
                <v-avatar size="22">
                    <img v-if="$i18n.locale === 'en'" :src="flag1" :alt="$i18n.locale" width="24" height="24" class="obj-cover" />
                    <img v-if="$i18n.locale === 'fr'" :src="flag4" :alt="$i18n.locale" width="24" height="24" class="obj-cover" />
                    <img v-if="$i18n.locale === 'ro'" :src="flag2" :alt="$i18n.locale" width="24" height="24" class="obj-cover" />
                    <img v-if="$i18n.locale === 'zh'" :src="flag3" :alt="$i18n.locale" width="24" height="24" class="obj-cover" />
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet rounded="md" width="200" elevation="10">
            <v-list class="theme-list">
                <v-list-item
                    v-for="(item, index) in languageDD"
                    :key="index"
                    color="primary"
                    :active="$i18n.locale == item.value"
                    class="d-flex align-center"
                    @click="() => ($i18n.locale = item.value)"
                >
                    <template v-slot:prepend>
                        <v-avatar size="22">
                            <img :src="item.avatar" :alt="item.avatar" width="22" height="22" class="obj-cover" />
                        </v-avatar>
                    </template>
                    <v-list-item-title class="text-subtitle-1 font-weight-regular">
                        {{ item.title }}
                        <span class="text-disabled text-subtitle-1 pl-2">({{ item.subtext }})</span>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-sheet>
    </v-menu>
</template>`
}

function generateMessagesDD(): string {
    return expandToString`
<script setup lang="ts">
</script>
<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn icon class="" flat v-bind="props" >
                    <v-badge dot color="secondary">
                        <MessageDotsIcon stroke-width="1.5" size="24"/>
                    </v-badge>
                </v-btn>
        </template>
        <v-sheet rounded="md" width="360" elevation="10">
            <div class="px-8 pb-4 pt-6">
                <div class="d-flex align-center justify-space-between">
                    <h6 class="text-h5">Notifications</h6>
                    <v-chip color="primary" variant="flat" size="small" class="text-white">5 New</v-chip>
                </div>
            </div>
            <perfect-scrollbar style="height: 400px">
                <v-list class="py-0 theme-list" lines="two">
                    <v-list-item v-for="item in notifications" :key="item.title" :value="item" color="primary" class="py-4 px-8">
                        <template v-slot:prepend>
                            <v-avatar size="48" class="mr-3">
                                <v-img :src="item.avatar" width="48" :alt="item.avatar" />
                            </v-avatar>
                        </template>
                        <div>
                            <h6 class="text-subtitle-1 font-weight-semibold mb-1">{{ item.title }}</h6>
                        </div>
                        <p class="text-subtitle-1 font-weight-regular textSecondary">{{ item.subtitle }}</p>
                    </v-list-item>
                    <v-divider></v-divider>
                </v-list>
            </perfect-scrollbar>
            <div class="py-4 px-6 text-center">
                <v-btn color="primary" variant="outlined" block>See all Notifications</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>`
}

function generateNavigations(): string {
    return expandToString`
<script setup lang="ts">
import { ref } from 'vue';
import QuickLinks from './QuickLinks.vue';
import AppsLink from './AppsLink.vue';
import { HelpIcon,ChevronDownIcon } from 'vue-tabler-icons';
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- mega menu DD -->
    <!-- ---------------------------------------------- -->
    <v-menu open-on-hover :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn class="hidden-sm-and-down" rounded="sm" variant="text" color="primary" v-bind="props"> Apps  <ChevronDownIcon size="16" class="mt-1 ml-1" /> </v-btn>
        </template>
        <v-sheet width="900" height="382" elevation="10" rounded="md" class="pa-4 pb-0">
            <div>
                <v-row>
                    <v-col cols="12" lg="8" class="d-flex py-0">
                        <div class="pa-4 pb-0 pr-0">
                            <AppsLink />
                            <v-divider class="mt-6"></v-divider>
                            <div class="pa-5 pl-0">
                                <div class="d-flex align-center justify-space-between">
                                    <router-link to="/" class="text-decoration-none d-flex align-center">
                                        <HelpIcon size="20" stroke-width="1.5" class="text-hover-primary" />
                                        <h6 class="text-subtitle-1 font-weight-bold text-hover-primary ml-2">Frequently Asked Questions</h6>
                                    </router-link>
                                    <v-btn color="primary" variant="flat">Check</v-btn>
                                </div>
                            </div>
                        </div>

                        <v-divider vertical></v-divider>
                    </v-col>
                    <v-col cols="12" lg="4" class="py-0">
                        <div class="pa-4">
                            <h5 class="text-h5">Quick Links</h5>
                            <QuickLinks />
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-sheet>
    </v-menu>
    <v-btn variant="text" color="primary">Chat </v-btn>
    <v-btn variant="text" color="primary">Calendar </v-btn>
    <v-btn variant="text" color="primary">Email </v-btn>
</template>`
}

function generateNotificationDD(): string {
    return expandToString`
<script setup lang="ts">
</script>
<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn icon class="" flat v-bind="props" >
                    <v-badge dot color="primary">
                        <BellIcon stroke-width="1.5" size="24"/>
                    </v-badge>
                </v-btn>
        </template>
        <v-sheet rounded="md" width="360" elevation="10">
            <div class="px-8 pb-4 pt-6">
                <div class="d-flex align-center justify-space-between">
                    <h6 class="text-h5">Notifications</h6>
                    <v-chip color="primary" variant="flat" size="small" class="text-white">5 New</v-chip>
                </div>
            </div>
            <perfect-scrollbar style="height: 400px">
                <v-list class="py-0 theme-list" lines="two">
                    <v-list-item v-for="item in notifications" :key="item.title" :value="item" color="primary" class="py-4 px-8">
                        <template v-slot:prepend>
                            <v-avatar size="48" >
                                <v-img :src="item.avatar" width="48" :alt="item.avatar" />
                            </v-avatar>
                        </template>
                        <div>
                            <h6 class="text-subtitle-1 font-weight-semibold mb-1">{{ item.title }}</h6>
                        </div>
                        <p class="text-subtitle-1 font-weight-regular text-medium-emphasis">{{ item.subtitle }}</p>
                    </v-list-item>
                    <v-divider></v-divider>
                </v-list>
            </perfect-scrollbar>
            <div class="py-4 px-6 text-center">
                <v-btn color="primary" variant="outlined" block>See all Notifications</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>`
} 

function generateProfileDD(): string {
    return expandToString`
<script setup lang="ts">
import { MailIcon } from 'vue-tabler-icons';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
                <v-avatar size="35">
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet rounded="md" width="360" elevation="10">
            <div class="px-8 pt-6">
                <h6 class="text-h5 font-weight-medium">User Profile</h6>
                <div class="d-flex align-center mt-4 pb-6">
                    <v-avatar size="80">
                    </v-avatar>
                    <div class="ml-3">
                        <h6 class="text-h6 mb-n1">Julia Roberts</h6>
                        <span class="text-subtitle-1 font-weight-regular textSecondary">Designer</span>
                        <div class="d-flex align-center mt-1">
                            <MailIcon size="18" stroke-width="1.5" />
                            <span class="text-subtitle-1 font-weight-regular textSecondary ml-2">info@modernize.com</span>
                        </div>
                    </div>
                </div>
                <v-divider></v-divider>
            </div>
            <perfect-scrollbar style="height: calc(100vh - 240px); max-height: 240px">
                <v-list class="py-0 theme-list" lines="two">
                    <v-list-item v-for="item in profileDD" :key="item.title" class="py-4 px-8 custom-text-primary" :to="item.href">
                        <template v-slot:prepend>
                            <v-avatar size="48" color="lightprimary" rounded="md">
                                <v-img :src="item.avatar" width="24" height="24" :alt="item.avatar" />
                            </v-avatar>
                        </template>
                        <div>
                            <h6 class="text-subtitle-1 font-weight-semibold mb-1 custom-title">{{ item.title }}</h6>
                        </div>
                        <p class="text-subtitle-1 font-weight-regular text-medium-emphasis">{{ item.subtitle }}</p>
                    </v-list-item>
                </v-list>
            </perfect-scrollbar>
            <div class="px-8 py-3">
                <div class="bg-lightprimary rounded-md pa-5 overflow-hidden position-relative">
                    <h5 class="text-h6">
                        Unlimited<br />
                        Access
                    </h5>
                    <v-btn variant="flat" color="primary" class="mt-3">Upgrade</v-btn>
                </div>
            </div>
            <div class="pt-4 pb-6 px-8 text-center">
                <v-btn color="primary" variant="outlined" block @click="authStore.logout()">Logout</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>`
}

function generateQuickLinks(): string {
    return expandToString`
<script setup lang="ts">
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- language DD -->
    <!-- ---------------------------------------------- -->
    <div v-for="(item, i) in quickLink" :key="i" class="py-2">
        <router-link :to="item.href" class="text-decoration-none text-hover-primary font-weight-semibold text-subtitle-1">{{ item.title }}</router-link>
    </div>
</template>
`
}

function generateRightMobileSidebar(): string {
    return expandToString`
<script setup lang="ts">
import { ref } from 'vue';
import { AppsIcon, CalendarIcon, MailIcon, MessagesIcon } from 'vue-tabler-icons';
import AppsLink from './AppsLink.vue';
import QuickLinks from './QuickLinks.vue';

const open = ref(['Apps']);
</script>

<template>
    <div class="pt-6">
        <h5 class="text-h5 mb-4 px-5">Navigation</h5>
        <v-list v-model:opened="open" class="right-sidebar">
            <v-list-group value="Apps">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props">
                        <template v-slot:prepend>
                            <AppsIcon width="21" stroke-width="1.5" />
                        </template>
                        <h5 class="text-subtitle-1 ml-2">Apps</h5>
                    </v-list-item>
                </template>
                <v-list-item class="pl-6 pb-6">
                    <div>
                        <AppsLink />
                    </div>
                </v-list-item>
            </v-list-group>
            <v-list-item>
                <template v-slot:prepend>
                    <MessagesIcon width="21" stroke-width="1.5" />
                </template>
                <h5 class="text-subtitle-1 ml-2">Chats</h5>
            </v-list-item>
            <v-list-item>
                <template v-slot:prepend>
                    <CalendarIcon width="21" stroke-width="1.5" />
                </template>
                <h5 class="text-subtitle-1 ml-2">Calendar</h5>
            </v-list-item>
            <v-list-item>
                <template v-slot:prepend>
                    <MailIcon width="21" stroke-width="1.5" />
                </template>
                <h5 class="text-subtitle-1 ml-2">Mail</h5>
            </v-list-item>
        </v-list>
        <div class="px-5">
            <h5 class="text-h5 my-4">Quick Links</h5>
            <QuickLinks />
        </div>
    </div>
</template>

<style scoped>
.right-sidebar .v-list-group__items .v-list-item {
    padding-inline-start: 26px !important;
}
</style>`
}

function generateSearchbar(): string {
    return expandToString`
<script setup>
import { SearchIcon } from 'vue-tabler-icons';
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- search1 -->
    <!-- ------------------------------------------------>
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn icon variant="text" class="custom-hover-primary ml-2" size="small" color="primary" v-bind="props">
                <SearchIcon size="22" />
            </v-btn>
        </template>
        <v-sheet width="360" elevation="10" rounded="md" >
            <div class="d-flex align-center justify-space-between pa-5">
                <v-text-field placeholder="Search" color="primary" density="compact" variant="outlined" hide-details></v-text-field>
            </div>
            <v-divider></v-divider>
            <h5 class="text-h5 mt-4 px-5 pb-4">Quick Page Links</h5>
            <perfect-scrollbar style="height: 380px">
                <v-list class="pt-0 pb-5" lines="two">
                    <v-list-item
                        :value="item"
                        v-for="(item, index) in searchSugg"
                        :key="index"
                        :to="item.href"
                        color="primary"
                        class="px-5 py-2"
                    >
                        <h6 class="text-subtitle-1 font-weight-medium mb-1">{{ item.title }}</h6>
                        <p class="text-subtitle-2 text-medium-emphasis">{{ item.href }}</p>
                    </v-list-item>
                </v-list>
            </perfect-scrollbar>
        </v-sheet>
    </v-menu>
</template>`
}

function generateVerticalHeader(): string {
    return expandToString`
<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useCustomizerStore } from '../../../stores/customizer';
import { useEcomStore } from '@/stores/apps/eCommerce';
import { GridDotsIcon, LanguageIcon, SearchIcon, Menu2Icon, BellIcon, ShoppingCartIcon } from 'vue-tabler-icons';
import LanguageDD from './LanguageDD.vue';
import NotificationDD from './NotificationDD.vue';
// import MessagesDD from './MessagesDD.vue';
import ProfileDD from './ProfileDD.vue';
import Searchbar from './Searchbar.vue';
import Logo from '../logo/Logo.vue';
// import LogoIcon from '../logo/LogoIcon.vue'
import RightMobileSidebar from './RightMobileSidebar.vue';
import Navigations from './Navigations.vue';

const customizer = useCustomizerStore();
const showSearch = ref(false);
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
function searchbox() {
    showSearch.value = !showSearch.value;
}
watch(priority, (newPriority) => {
    priority.value = newPriority;
});

// count items
const store = useEcomStore();
const getCart = computed(() => {
    return store.cart;
});
</script>

<template>
    <v-app-bar elevation="0" :priority="priority" height="64" color="background"  id="top">
        <v-btn
            class="hidden-md-and-down "
            icon
            color="primary"
            variant="text"
            @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
        >
            <Menu2Icon size="25"  />
        </v-btn>
        <v-btn class="hidden-lg-and-up" icon variant="text" @click.stop="customizer.SET_SIDEBAR_DRAWER" size="small">
            <Menu2Icon size="25" />
        </v-btn>

        <!-- ---------------------------------------------- -->
        <!-- Search part -->        <!-- ---------------------------------------------- -->
        
            <Searchbar />
     

        <!---/Search part -->

        <!-- ---------------------------------------------- -->
        <!-- Mega menu -->
        <!-- ---------------------------------------------- -->
        <!-- <div class="hidden-md-and-down">
            <Navigations />
        </div> -->
        <v-spacer />
        <!-- ---------------------------------------------- -->
        <!---right part -->
        <!-- ---------------------------------------------- -->
        <!-- ---------------------------------------------- -->
        <!-- translate -->
        <!-- ---------------------------------------------- -->
        
        <LanguageDD />

        <!-- ---------------------------------------------- -->
        <!-- MessagesDD -->
        <!-- ---------------------------------------------- -->
        <!-- <MessagesDD /> -->
        <!-- ---------------------------------------------- -->
        <!-- Notification -->
        <!-- ---------------------------------------------- -->
        <NotificationDD />
        <!-- ---------------------------------------------- -->
        <!-- User Profile -->
        <!-- ---------------------------------------------- -->
        <div class="ml-2">
            <ProfileDD />
        </div>
    </v-app-bar>

    <!-- ---------------------------------------------- -->
    <!-- Right Sidebar -->
    <!-- ---------------------------------------------- -->
    <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
        <RightMobileSidebar />
    </v-navigation-drawer>
</template>`
}