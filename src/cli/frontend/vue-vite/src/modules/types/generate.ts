import { LocalEntity, Model } from "../../../../../../language/generated/ast.js";
import fs from "fs"
import { expandToString } from "langium/generate";
import path from "path"

export function generate(model: Model, cls: LocalEntity, target_folder: string) : void {
    fs.writeFileSync(path.join(target_folder, `${cls.name.toLowerCase}.d.ts`), generateType(model, cls))
}

function generateType(model: Model, cls: LocalEntity) : string {
    const str: string = expandToString`
export type ${cls.name} = {
`

    for (const attr of cls.attributes) {
        str.concat(expandToString`
  Id : string
  ${attr.name} : ${attr.type}
`)
    }

    str.concat(`export type ${cls.name}CreateReq = Pick<AreaTecnica,`)
    const auxStr = ""

    for (const attr of cls.attributes) {
        if (cls.attributes.indexOf(attr) + 1 == cls.attributes.length) {
            auxStr.concat(expandToString` "${attr.name}">

`)
        }
        else {
            auxStr.concat(` "${attr.name}" |`)
        }
    }

    str.concat(expandToString`
export type ${cls.name}ListRes = {
  "@odata.context": string
  value: ${cls.name}[]
}

export type ${cls.name}CreateRes = {
  statusCode: number
  uri: string
  message: string
}

export type ${cls.name}GetRes = ${cls.name}ListRes

export type ${cls.name}UpdateRes = {
  statusCode: number
  message: string
}

export type ${cls.name}DeleteRes = ${cls.name}UpdateRes
`)

    return str
}