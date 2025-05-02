import { Model } from "../../../../../language/generated/ast.js"
import fs from "fs";
import { expandToString } from "langium/generate";
import path from "path";
import { createPath } from "../../../../util/generator-utils.js";

export function generate(model: Model, target_folder: string) : void {

    const helpers_folder = createPath(target_folder, "helpers")

    fs.mkdirSync(helpers_folder, {recursive:true})    

    const bearer_user = "`Bearer ${user.token}`"

    fs.writeFileSync(path.join(target_folder, "axios.ts"), generateAxios())
    fs.writeFileSync(path.join(target_folder, "updateColors.ts"), generateUpdateColors())
    fs.writeFileSync(path.join(helpers_folder, "fetch-wrapper.ts"), generateFetchWrapper(bearer_user))

}  

function generateAxios(): string {
    return expandToString`
/**
 * axios setup to use mock service
 */

import axios from "axios";

const axiosServices = axios.create();

// interceptor for http
axiosServices.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject((error.response && error.response.data) || "Wrong Services")
);

export default axiosServices;`
}

function generateUpdateColors(): string {
    return expandToString`
import { computed } from 'vue';
import * as themeColors from '@/theme/LightTheme';
import * as DarkThemeColors from '@/theme/DarkTheme';
import { useCustomizerStore } from '@/stores/customizer';

const custmizer = useCustomizerStore();

const getPrimary = computed(() => {
    if (custmizer.actTheme === 'RED_THEME') {
        return themeColors.RED_THEME.colors.primary;
    } else if (custmizer.actTheme === 'PURPLE_THEME') {
        return themeColors.PURPLE_THEME.colors.primary;
    } else if (custmizer.actTheme === 'GREEN_THEME') {
        return themeColors.GREEN_THEME.colors.primary;
    } else if (custmizer.actTheme === 'INDIGO_THEME') {
        return themeColors.INDIGO_THEME.colors.primary;
    } else if (custmizer.actTheme === 'ORANGE_THEME') {
        return themeColors.ORANGE_THEME.colors.primary;
    } else if (custmizer.actTheme === 'DARK_RED_THEME') {
        return DarkThemeColors.DARK_RED_THEME.colors.primary;
    } else if (custmizer.actTheme === 'DARK_PURPLE_THEME') {
        return DarkThemeColors.DARK_PURPLE_THEME.colors.primary;
    } else if (custmizer.actTheme === 'DARK_GREEN_THEME') {
        return DarkThemeColors.DARK_GREEN_THEME.colors.primary;
    } else if (custmizer.actTheme === 'DARK_INDIGO_THEME') {
        return DarkThemeColors.DARK_INDIGO_THEME.colors.primary;
    } else if (custmizer.actTheme === 'DARK_ORANGE_THEME') {
        return DarkThemeColors.DARK_ORANGE_THEME.colors.primary;
    } else if (custmizer.actTheme === 'DARK_BLUE_THEME') {
        return DarkThemeColors.DARK_BLUE_THEME.colors.primary;
    } else {
        return themeColors.BLUE_THEME.colors.primary;
    }
});

const getLightPrimary = computed(() => {
    if (custmizer.actTheme === 'RED_THEME') {
        return themeColors.RED_THEME.colors.lightprimary;
    } else if (custmizer.actTheme === 'PURPLE_THEME') {
        return themeColors.PURPLE_THEME.colors.lightprimary;
    } else if (custmizer.actTheme === 'GREEN_THEME') {
        return themeColors.GREEN_THEME.colors.lightprimary;
    } else if (custmizer.actTheme === 'INDIGO_THEME') {
        return themeColors.INDIGO_THEME.colors.lightprimary;
    } else if (custmizer.actTheme === 'ORANGE_THEME') {
        return themeColors.ORANGE_THEME.colors.lightprimary;
    }
    if (custmizer.actTheme === 'DARK_RED_THEME') {
        return DarkThemeColors.DARK_RED_THEME.colors.lightprimary;
    } else if (custmizer.actTheme === 'DARK_PURPLE_THEME') {
        return DarkThemeColors.DARK_PURPLE_THEME.colors.lightprimary;
    } else if (custmizer.actTheme === 'DARK_GREEN_THEME') {
        return DarkThemeColors.DARK_GREEN_THEME.colors.lightprimary;
    } else if (custmizer.actTheme === 'DARK_INDIGO_THEME') {
        return DarkThemeColors.DARK_INDIGO_THEME.colors.lightprimary;
    } else if (custmizer.actTheme === 'DARK_ORANGE_THEME') {
        return DarkThemeColors.DARK_ORANGE_THEME.colors.lightprimary;
    } else if (custmizer.actTheme === 'DARK_BLUE_THEME') {
        return DarkThemeColors.DARK_BLUE_THEME.colors.lightprimary;
    } else {
        return themeColors.BLUE_THEME.colors.lightprimary;
    }
});

const getSecondary = computed(() => {
    if (custmizer.actTheme === 'RED_THEME') {
        return themeColors.RED_THEME.colors.secondary;
    } else if (custmizer.actTheme === 'PURPLE_THEME') {
        return themeColors.PURPLE_THEME.colors.secondary;
    } else if (custmizer.actTheme === 'GREEN_THEME') {
        return themeColors.GREEN_THEME.colors.secondary;
    } else if (custmizer.actTheme === 'INDIGO_THEME') {
        return themeColors.INDIGO_THEME.colors.secondary;
    } else if (custmizer.actTheme === 'ORANGE_THEME') {
        return themeColors.ORANGE_THEME.colors.secondary;
    } else if (custmizer.actTheme === 'DARK_RED_THEME') {
        return DarkThemeColors.DARK_RED_THEME.colors.secondary;
    } else if (custmizer.actTheme === 'DARK_PURPLE_THEME') {
        return DarkThemeColors.DARK_PURPLE_THEME.colors.secondary;
    } else if (custmizer.actTheme === 'DARK_GREEN_THEME') {
        return DarkThemeColors.DARK_GREEN_THEME.colors.secondary;
    } else if (custmizer.actTheme === 'DARK_INDIGO_THEME') {
        return DarkThemeColors.DARK_INDIGO_THEME.colors.secondary;
    } else if (custmizer.actTheme === 'DARK_ORANGE_THEME') {
        return DarkThemeColors.DARK_ORANGE_THEME.colors.secondary;
    } else if (custmizer.actTheme === 'DARK_BLUE_THEME') {
        return DarkThemeColors.DARK_BLUE_THEME.colors.secondary;
    } else {
        return themeColors.BLUE_THEME.colors.secondary;
    }
});

const getLightSecondary = computed(() => {
    if (custmizer.actTheme === 'RED_THEME') {
        return themeColors.RED_THEME.colors.lightsecondary;
    } else if (custmizer.actTheme === 'PURPLE_THEME') {
        return themeColors.PURPLE_THEME.colors.lightsecondary;
    } else if (custmizer.actTheme === 'GREEN_THEME') {
        return themeColors.GREEN_THEME.colors.lightsecondary;
    } else if (custmizer.actTheme === 'INDIGO_THEME') {
        return themeColors.INDIGO_THEME.colors.lightsecondary;
    } else if (custmizer.actTheme === 'ORANGE_THEME') {
        return themeColors.ORANGE_THEME.colors.lightsecondary;
    } if (custmizer.actTheme === 'DARK_RED_THEME') {
        return DarkThemeColors.DARK_RED_THEME.colors.lightsecondary;
    } else if (custmizer.actTheme === 'DARK_PURPLE_THEME') {
        return DarkThemeColors.DARK_PURPLE_THEME.colors.lightsecondary;
    } else if (custmizer.actTheme === 'DARK_GREEN_THEME') {
        return DarkThemeColors.DARK_GREEN_THEME.colors.lightsecondary;
    } else if (custmizer.actTheme === 'DARK_INDIGO_THEME') {
        return DarkThemeColors.DARK_INDIGO_THEME.colors.lightsecondary;
    } else if (custmizer.actTheme === 'DARK_ORANGE_THEME') {
        return DarkThemeColors.DARK_ORANGE_THEME.colors.lightsecondary;
    } else if (custmizer.actTheme === 'DARK_BLUE_THEME') {
        return DarkThemeColors.DARK_BLUE_THEME.colors.lightsecondary;
    } else {
        return themeColors.BLUE_THEME.colors.lightsecondary;
    }
});

const getLight100 = computed(() => {
    if (
        custmizer.actTheme === 'RED_THEME' ||
        custmizer.actTheme === 'PURPLE_THEME' ||
        custmizer.actTheme === 'GREEN_THEME' ||
        custmizer.actTheme === 'INDIGO_THEME' ||
        custmizer.actTheme === 'ORANGE_THEME'
    ) {
        return themeColors.RED_THEME.colors.grey100;
    } else if (
        custmizer.actTheme === 'DARK_RED_THEME' ||
        custmizer.actTheme === 'DARK_PURPLE_THEME' ||
        custmizer.actTheme === 'DARK_GREEN_THEME' ||
        custmizer.actTheme === 'DARK_INDIGO_THEME' ||
        custmizer.actTheme === 'DARK_ORANGE_THEME' ||
        custmizer.actTheme === 'DARK_BLUE_THEME'
    ) {
        return DarkThemeColors.DARK_RED_THEME.colors.grey100;
    } else {
        return themeColors.BLUE_THEME.colors.grey100;
    }
});

export { getPrimary, getSecondary, getLightPrimary, getLightSecondary, getLight100 };`
}

function generateFetchWrapper(bearer_user: string): string {
    return `
import { useAuthStore } from '@/stores/auth';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method: string) {
    return (url: any, body?: any) => {
        const requestOptions: any = {
            method,
            headers: authHeader(url)
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    };
}

// helper functions

function authHeader(url: any) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.token;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: ${bearer_user} };
    } else {
        return {};
    }
}

function handleResponse(response: any) {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const { user, logout } = useAuthStore();
            if ([401, 403].includes(response.status) && user) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}`
}