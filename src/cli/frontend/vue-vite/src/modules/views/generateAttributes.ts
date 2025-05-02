import { expandToString } from "langium/generate";
import { LocalEntity } from "../../../../../../language/generated/ast.js";


// Nome: nome.value, 
// Descricao: descricao.value
export function generateAttributesAsParameters(cls: LocalEntity) : string {
    const str = ""
    for (const attr of cls.attributes) {
        if (cls.attributes.indexOf(attr) + 1 == cls.attributes.length) {
            str.concat(expandToString`
${attr.name}: ${attr.name.toLowerCase}.value
`)
        }
        else {
            str.concat(expandToString`
${attr.name}: ${attr.name.toLowerCase}.value,
`)
        }
    }
    return str
}

//  nome.value = ''
//  descricao.value = ''
export function generateAttributesValue(cls: LocalEntity): string {
    const str = ""
    for (const attr of cls.attributes) {
        str.concat(expandToString`
    ${attr.name.toLowerCase}.value = ''
`)
    }
    return str
}


//  nome.value = class.Nome
//  descricao.value = class.Descricao

export function generateValuesEqualsAttributes(cls: LocalEntity): string {
    const str = ""
    for (const attr of cls.attributes) {
        str.concat(expandToString`
    ${attr.name.toLowerCase}.value = class.${attr.name}
`)
    }
    return str
}


//{ value: 'Nome', title: 'Nome' },
//{ value: 'Descricao', title: 'Descrição' }

export function generateAttributesAsHeader(cls: LocalEntity): string {
    const str = ""
    for (const attr of cls.attributes) {
        if (cls.attributes.indexOf(attr) + 1 == cls.attributes.length) {
            str.concat(expandToString`
  { value: '${attr.name}', title: '${attr.name}' }
`)
        }
        else {
            str.concat(expandToString`
  { value: '${attr.name}', title: '${attr.name}' },
`)
        }
    }
    return str
}