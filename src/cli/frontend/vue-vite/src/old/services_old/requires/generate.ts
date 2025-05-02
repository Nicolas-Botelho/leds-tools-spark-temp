import path from "path"
import { LocalEntity, Model, isLocalEntity, isModule } from "../../../../../../language/generated/ast.js"
import fs from "fs"
import { expandToString } from "langium/generate";

export function generate(model: Model, target_folder: string) : void {
    
    const modules =  model.abstractElements.filter(isModule);
    
    for(const mod of modules) {
        for(const cls of mod.elements.filter(isLocalEntity)) {
            fs.writeFileSync(path.join(target_folder, `${cls.name}Requires.ts`), generateRequires(cls))
        }
        
    }
}

function generateRequires(cls: LocalEntity): string{
    return expandToString`
import serviceFactory from './factory.js'

export default function ${cls.name}Service() {
  return serviceFactory('api/${cls.name}')
}`
}