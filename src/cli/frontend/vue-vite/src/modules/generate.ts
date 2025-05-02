import { LocalEntity, Model, Module } from "../../../../../language/generated/ast.js";
import { createPath } from "../../../../util/generator-utils.js";
import { generate as generateAPI} from "./api/generate.js"
import { generate as generateControllers} from "./controllers/generate.js"
import { generate as generateRoutes} from "./routes/generate.js"
import { generate as generateTypes} from "./types/generate.js"
import { generate as generateViews } from "./views/generate.js"

import fs from "fs"
import { expandToString } from "langium/generate";
import path from "path"

export function generate(model: Model, target_folder: string) : void {
    const classList : LocalEntity[] = []

    const modulesList : Module[] = []
    for (const absElem of model.abstractElements) {
        if (absElem.$type == "Module") modulesList.push(absElem)
    }
    for (const mod of modulesList) {
        for (const elem of mod.elements) {
            if (elem.$type == "LocalEntity") classList.push(elem)
        }
    }

    fs.writeFileSync(path.join(target_folder, 'index.ts'), generateModulesIndex(classList));

    for (const cls of classList) {
        const folder = createPath(target_folder, `${cls.name}`)
        fs.mkdirSync(folder, {recursive:true})
        generateModule(model, cls, folder)
    }
}

function generateModulesIndex(clsList : LocalEntity[]) : string {
    const str = expandToString`
import { type RouteRecordRaw } from 'vue-router'

`

    for (const cls of clsList) {
        str.concat(expandToString`
import { routes as ${cls.name}Routes } from './${cls.name}'
`)
    }

    str.concat(expandToString`
export const routes: RouteRecordRaw[] = [
`)
    
    for (const cls of clsList) {
        str.concat(expandToString`
...${cls.name}Routes,
`)
    }

    str.concat(`
]
`)

    return str
}

function generateModule(model: Model, cls: LocalEntity, target_folder: string) : void {
    fs.writeFileSync(path.join(target_folder, 'index.ts'), generateModIndex(cls))

    const api_folder = createPath(target_folder, "api")
    const controllers_folder = createPath(target_folder, "controllers")
    const routes_folder = createPath(target_folder, "routes")
    const types_folder = createPath(target_folder, "types")
    const views_folder = createPath(target_folder, "views")

    fs.mkdirSync(api_folder, {recursive:true})
    fs.mkdirSync(controllers_folder, {recursive:true})
    fs.mkdirSync(routes_folder, {recursive:true})
    fs.mkdirSync(types_folder, {recursive:true})
    fs.mkdirSync(views_folder, {recursive:true})

    generateAPI(model, cls, api_folder)
    generateControllers(model, cls, controllers_folder)
    generateRoutes(model, cls, routes_folder)
    generateTypes(model, cls, routes_folder)
    generateViews(model, cls, views_folder)
}

function generateModIndex(cls: LocalEntity) : string {
    return expandToString`
import { type RouteRecordRaw } from 'vue-router'
import { routes as _routes } from './routes'

export const routes: RouteRecordRaw[] = [
  {
    path: '/${cls.name}',
    children: _routes,
    meta: {
      requiresAuth: true
    }
  }
]
`
}