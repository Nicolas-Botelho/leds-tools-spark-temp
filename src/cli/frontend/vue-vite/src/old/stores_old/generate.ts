import { Model } from "../../../../../language/generated/ast.js"
import fs from "fs";
import { expandToString } from "langium/generate";
import path from "path";
import { createPath } from "../../../../util/generator-utils.js";
import { generate as generateApps } from "./apps/generate.js";

export function generate(model: Model, target_folder: string) : void {

  const apps_folder = createPath(target_folder, "apps")

  fs.mkdirSync(apps_folder, {recursive:true})

  const viteapi_users = "`${import.meta.env.VITE_API_URL}/users`"
  const authenticate = "`${baseUrl}/authenticate`"

  fs.writeFileSync(path.join(target_folder, "auth.ts"), generateAuth(viteapi_users, authenticate))
  fs.writeFileSync(path.join(target_folder, "authUser.ts"), generateAuthUser(viteapi_users))
  fs.writeFileSync(path.join(target_folder, "customizer.ts"), generateCustomizer())

  generateApps(model, apps_folder)
}  

function generateAuth(viteapi_users: string, authenticate: string): string {
    return expandToString`
import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';

const baseUrl = ${viteapi_users};

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(username: string, password: string) {
            const user = await fetchWrapper.post(${authenticate}, { username, password });

            // update pinia state
            this.user = user;
            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            // redirect to previous url or default to home page
            router.push(this.returnUrl || '/dashboards/modern');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/');
        }
    }
});`
}

function generateAuthUser(viteapi_users: string): string {
    return expandToString`
import { defineStore } from 'pinia';

import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';

const baseUrl = ${viteapi_users};

export const useUsersStore = defineStore({
    id: 'Authuser',
    state: () => ({
        users: {}
    }),
    actions: {
        async getAll() {
            this.users = { loading: true };
            fetchWrapper
                .get(baseUrl)
                .then((users) => (this.users = users))
                .catch((error) => (this.users = { error }));
        }
    }
});`
}

function generateCustomizer(): string {
    return expandToString`
import { defineStore } from "pinia";
import config from '@/config'


export const useCustomizerStore = defineStore({
  id: "customizer",
  state: () => ({
    Sidebar_drawer: config.Sidebar_drawer,
    Customizer_drawer: config.Customizer_drawer,
    mini_sidebar: config.mini_sidebar,
    setHorizontalLayout: config.setHorizontalLayout, // Horizontal layout
    setRTLLayout:config.setRTLLayout, // RTL layout
    actTheme: config.actTheme,
    inputBg: config.inputBg,
    boxed: config.boxed,
    setBorderCard: config.setBorderCard
  }),

  getters: {},
  actions: {
    SET_SIDEBAR_DRAWER() {
      this.Sidebar_drawer = !this.Sidebar_drawer;
    },
    SET_MINI_SIDEBAR(payload: any) {
      this.mini_sidebar = payload;
    },
    SET_CUSTOMIZER_DRAWER(payload: any) {
      this.Customizer_drawer = payload;
    },

    SET_LAYOUT(payload: any) {
      this.setHorizontalLayout = payload;
    },
    SET_THEME(payload: any) {
      this.actTheme = payload;
    },
    SET_CARD_BORDER(payload: any){
      this.setBorderCard = payload
    }
  },
});`
}