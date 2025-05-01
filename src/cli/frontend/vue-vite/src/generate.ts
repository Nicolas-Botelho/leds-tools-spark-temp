import { Model } from "../../../../language/generated/ast.js"
import fs from "fs";
import { createPath } from "../../../util/generator-utils.js";
import { expandToString } from "langium/generate";
import path from "path";
// import { generate as generateComponents } from "./components/generate.js";
// import { generate as generateLayouts } from "./layouts/generate.js";
// import { generate as generatePlugins } from "./plugins/generate.js";
// import { generate as generateScss } from "./scss/generate.js";
// import { generate as generateServices } from "./services/generate.js";
// import { generate as generateTheme } from "./theme/generate.js";
// import { generate as generateRouter } from "./router/generate.js";
// import { generate as genrateUtils } from "./utils/generate.js";
// import { generate as generateStores } from "./stores/generate.js";
// import { generate as generateViews } from "./views/generate.js";
// import { generate as generateComposition } from "./composition/generate.js";
import { generate as generateAPI } from "./api/generate.js";
import { generate as generateAssets } from "./assets/generate.js";
import { generate as generateComponents} from "./components/generate.js"
import { generate as generateIcons} from "./components/icons/generate.js"
import { generate as generateSidenav} from "./components/sidenav/generate.js"
import { generate as generateLayouts} from "./layouts/generate.js"
import { generate as generateModules} from "./modules/generate.js"
import { generate as generatePlugins} from "./plugins/generate.js"
import { generate as generateRoutes} from "./routes/generate.js"
import { generate as generateStores} from "./stores/generate.js"
import { generate as generateViews} from "./views/generate.js"
import { generate as generateUtils} from "./utils/generate.js"

export function generate(model: Model, target_folder: string) : void {

    const src_folder = createPath(target_folder, "src")
    const api_folder = createPath(src_folder, "api")
    const assets_folder = createPath(src_folder, "assets")
    const components_folder = createPath(src_folder, "components")
    const icons_folder = createPath(components_folder, "icons")
    const sidenav_folder = createPath(components_folder, "sidenav")
    const layouts_folder = createPath(src_folder, "layouts")
    const modules_folder = createPath(src_folder, "modules")
    const plugins_folder = createPath(src_folder, "plugins")
    const routes_folder = createPath(src_folder, "routes")
    const stores_folder = createPath(src_folder, "stores")
    const views_folder = createPath(src_folder, "views")
    const util_folder = createPath(src_folder, "utils")



    fs.mkdirSync(src_folder, {recursive:true})

    fs.mkdirSync(api_folder, {recursive:true})
    fs.mkdirSync(assets_folder, {recursive:true})
    fs.mkdirSync(components_folder, {recursive:true})
    fs.mkdirSync(icons_folder, {recursive:true})
    fs.mkdirSync(sidenav_folder, {recursive:true})
    fs.mkdirSync(layouts_folder, {recursive:true})
    fs.mkdirSync(modules_folder, {recursive:true})
    fs.mkdirSync(plugins_folder, {recursive:true})
    fs.mkdirSync(routes_folder, {recursive:true})
    fs.mkdirSync(stores_folder, {recursive:true})
    fs.mkdirSync(views_folder, {recursive:true})
    fs.mkdirSync(util_folder, {recursive:true})

    fs.writeFileSync(path.join(src_folder, 'App.vue'), generateApp());
    fs.writeFileSync(path.join(src_folder, 'main.ts'), generateMain());



    // Falta criar os generates e as suas respectivas pastas
    // Seguir a estrutura gerada para os geradores (AKA PS_TEMP)
    // |- api
    // |- assets
    // |- components
    // | |- icons
    // | |- sidenav
    // |- layouts
    // |- modules
    // | |- [classe] (OBS: Uma pasta por classe no modelo)
    // | | |- api
    // | | |- controllers
    // | | |- routes
    // | | |- types
    // | | |- views
    // |- plugins
    // |- routes
    // |- stores
    // |- views
    // |- utils
    generateAPI(model, api_folder)
    generateAssets(model, assets_folder)
    generateComponents(model, components_folder)
    generateIcons(model, icons_folder)
    generateSidenav(model, sidenav_folder)
    generateLayouts(model, layouts_folder)
    generateModules(model, modules_folder)
    generatePlugins(model, plugins_folder)
    generateRoutes(model, routes_folder)
    generateStores(model, stores_folder)
    generateViews(model, views_folder)
    generateUtils(model, util_folder)

}  

function generateApp(): string {
    return expandToString`
<template>
  <RouterView />
</template>
`
}

function generateMain(): string {
    return expandToString`
/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
`
}