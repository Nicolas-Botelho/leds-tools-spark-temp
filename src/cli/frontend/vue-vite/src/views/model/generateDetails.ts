import { expandToString } from "langium/generate"
import { Attribute, EnumEntityAtribute, EnumX, LocalEntity } from "../../../../../../language/generated/ast.js"
import { capitalizeString } from "../../../../../util/generator-utils.js"
import { RelationInfo } from "../../../../../util/relations.js"
//import { processRelations } from "../../../../../util/relations.js"


export function generate(cls: LocalEntity, enumx: EnumX[], relations: RelationInfo[]): string {
    const path_form =  "`" + `/${cls.name}/form${cls.name}/\${id}` +  "`"

    let imports = ""
    let forms = ""
    let formattr = ""
    let relationGet = ""
    let relationOptions = ""
    let OnMounted = ""
    let factoryEnum = ""
    let factory = ""
    let attrFactory = ""

    for(const enumy of cls.enumentityatributes){
        formattr += `${capitalizeString(enumy.type.ref?.name || "")}: '', \n`
        factoryEnum += `form.${capitalizeString(enumy.type.ref?.name || "")} = factory${capitalizeString(enumy.type.ref?.name || "")}(form.${capitalizeString(enumy.type.ref?.name || "")}); \n`
        factory += generateFactory(enumy, enumx)
    }


    for(const attr of cls.attributes) {
      formattr += `${capitalizeString(attr.name)}: '', \n`
      forms += `
<v-col cols="12">
    <v-label class="font-weight-medium mb-2">${attr.name}</v-label>
    <VTextField  type="${generateTypeAttribute(attr)}" placeholder="${attr.name} ${attr.type}" hide-details v-model='form.${capitalizeString(attr.name)}' disabled name="${capitalizeString(attr.name)}"></VTextField>
</v-col>`
        if (attr.type === 'date'){
            attrFactory += `
if (form.${capitalizeString(attr.name)}) {
    form.${capitalizeString(attr.name)} = dayjs(form.${capitalizeString(attr.name)}).format('YYYY-MM-DD');
}`
        }
    }
    for(const rel of relations){
        const {formattrGenerated, formsGenerated, importsGenerated, relationGetGenerated, OnMountedGenerated, relationOptionsGenerated} = generateRelation(cls, rel)
        formattr += formattrGenerated
        forms += formsGenerated
        imports += importsGenerated
        relationGet += relationGetGenerated
        OnMounted += OnMountedGenerated
        relationOptions += relationOptionsGenerated
    }
    
    const form = generateFormExport(cls, forms, formattr, enumx, imports, relationGet, relationOptions, OnMounted, factoryEnum, factory, path_form, attrFactory);
    return form
}

function generateFormExport(cls: LocalEntity, forms: string, formattr: string, enumx: EnumX[], imports: string, relationGet: String, relationOptions: string, OnMounted: string, factoryEnum: string, factory: string, path_formid: string, attrFactory: string): string {
    return expandToString`  
<template>
<v-row justify="end" class="pa-3">
<v-btn color="error" class="ma-2" variant="outlined" @click="confirmDelete" name="DeleteButton">Excluir ${cls.name}</v-btn>
<v-btn color="primary" class="ma-2" @click="edita${cls.name}(form.Id)" name="EditButton">Editar ${cls.name}</v-btn>
</v-row>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <form @submit.prevent="onSubmit">
        <v-card elevation="10" class="" rounded="md">
            <v-card-text class="pa-sm-6 pa-3 pb-sm-6 pb-6">
                <v-row >
                    ${forms}
                    ${generateEnum(cls)}
                </v-row>
            </v-card-text>
        </v-card>
    </form>
    <!-- Diálogo de Confirmação de Exclusão -->
    <v-dialog v-model="dialogDelete" persistent max-width="290">
        <v-card>
            <v-card-title class="headline">Confirmar Exclusão</v-card-title>
            <v-card-text>Tem certeza de que deseja excluir esta ${cls.name}?</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deleta${cls.name}" name="confirmDeleteButton">Confirmar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script async setup lang="ts">
import { ref } from 'vue';
import Swal from 'sweetalert2';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ${cls.name}Service from '../../../services/requires/${cls.name}Requires';
${imports}
import dayjs from 'dayjs';

${relationGet}
const { list, remove, getById } = ${cls.name}Service();
const route = useRoute();
const params = route.params;
const router = useRouter();
const dialogDelete = ref(false);

${relationOptions}
const form = reactive({
    id: '',
    ${formattr.slice(0, formattr.lastIndexOf(','))}
});


const verificaArrayParams = () => {
    if (typeof params.id === 'string') {
        return params.id;
    } else if (Array.isArray(params.id)) {
        return params.id[0];
    }
    return '';
};

const getPost = async (id: any) => {
    try {
        let response = await getById(id);
        Object.assign(form, response.value[0]);
        ${attrFactory}
        ${factoryEnum}
    } catch (error) {
        console.error(error);
    }
};


const page = ref({ title: 'Detalhes ${cls.name}' });

onMounted(async () => {
    if (params.id) {
        await getPost(params.id);
        page.value.title = 'Detalhes ${cls.name}';
        breadcrumbs.value[1].text = page.value.title;      
    }
    
    ${onMountedRelations(OnMounted)}

});

const breadcrumbs = ref([
    {
        text: '${cls.name}',
        disabled: false,
        href: '/${cls.name}/Index${cls.name}'
    },
    {
        text: page.value.title,
        disabled: true,
        href: '#'
    }
]);

const navigateBack = () => {
    router.push({ path: '/${cls.name}/Index${cls.name}' });
};

function edita${cls.name}(id) {
    router.push({ path: ${path_formid} });
}

function confirmDelete() {
    dialogDelete.value = true;
}

const deleta${cls.name} = async () => {
    try {
        await remove(form.Id);
        Swal.fire({
        title: "Deletado com sucesso!",
        icon: "success",
        confirmButtonColor: "#D3D3D3"
      });
      router.push({ path: '/${cls.name}/Index${cls.name}' });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao salvar!",
        text: "Não foi possível apagar."
      });
    } finally {
        dialogDelete.value = false;
    }
};

${generateEnumValue(cls,enumx)}

${factory}
</script>`
}

function generateEnumValue(cls: LocalEntity, enumx: EnumX[]): string {
    return expandToString`
  ${cls.enumentityatributes.map(enumEntityAtribute =>createEnumValue(enumEntityAtribute, enumx)).join("\n")}`
  }
  
  function createEnumValue(Enum: EnumEntityAtribute, Enumx: EnumX[]): string {
    let EnumText = "";
    let count = 0;
    for (const enumx of Enumx){
      if(Enum.type.ref?.name == enumx.name){
        for (const a of enumx.attributes){
          EnumText += `
  {
      tipo: '${a.name}',
      value: ${count}
  },`
          count++;
        }
        return expandToString`
        const ${Enum.type.ref?.name} = ref([
            ${EnumText.slice(0, EnumText.lastIndexOf(','))}
        ]);`
      }
    }
    return ""
  }
  
function generateEnum (cls: LocalEntity):string {
    return expandToString`
  ${cls.enumentityatributes.map(enumEntityAtribute =>createEnum(enumEntityAtribute)).join("\n")}`
}
  
function createEnum(Enum: EnumEntityAtribute): string {
return expandToString`
<v-col cols="12">
    <v-label class="font-weight-medium mb-2">${Enum.type.ref?.name} *</v-label>
    <v-select
        :items="${capitalizeString(Enum.type.ref?.name || "")}"
        item-title="tipo"
        item-value="value"
        placeholder="Selecione ${Enum.type.ref?.name}"
        hide-details
        disabled
        name = "${capitalizeString(Enum.type.ref?.name || "")}"
        v-model="form.${capitalizeString(Enum.type.ref?.name || "")}"
    >
    </v-select>
</v-col>
`
}

function onMountedRelations(OnMounted: String): string {
    if (OnMounted.length > 5){
        return expandToString`
let response;
${OnMounted}`
    }
    return ''
}

function generateRelation(cls: LocalEntity, {tgt, card, owner}: RelationInfo) : {formattrGenerated: string, formsGenerated: string, importsGenerated: string, relationGetGenerated: string, OnMountedGenerated: string, relationOptionsGenerated: string} {
    let formsGenerated = "";
    let importsGenerated = "";
    let relationGetGenerated = "";
    let OnMountedGenerated = "";
    let relationOptionsGenerated = "";
    let formattrGenerated = "";
    
    switch(card) {
        case "OneToOne":
            if(owner) {
                formsGenerated +=`
<v-col cols="12">
    <v-label class="font-weight-medium mb-2">${capitalizeString(tgt.name)}</v-label>
    <v-select :items="${capitalizeString(tgt.name)}Options" item-title="Id" item-value="Id" placeholder="Select ${capitalizeString(tgt.name)}" hide-details v-model="form.${capitalizeString(tgt.name)}Id" disabled name="${capitalizeString(tgt.name)}"></v-select>
</v-col>`;
                relationOptionsGenerated +=  `const ${tgt.name}Options = ref([]); \n`;
                formattrGenerated =  `${capitalizeString(tgt.name)}Id: '', \n`;
                if(tgt.name != cls.name) {
                    importsGenerated += `import ${tgt.name}Service from '../../../services/requires/${tgt.name}Requires'; \n`;
                    relationGetGenerated += `const { list: list${tgt.name} } = ${tgt.name}Service(); \n`;
                    OnMountedGenerated += `
response = await list${tgt.name}();
${tgt.name}Options.value = response.value;`;
                }
            }
            break;
            
        case "OneToMany":
            if(owner) {
                formsGenerated +=`
<v-col cols="12">
    <v-label class="font-weight-medium mb-2">${capitalizeString(tgt.name)}</v-label>
    <v-select :items="${capitalizeString(tgt.name)}Options" item-title="Id" item-value="Id" placeholder="Select ${capitalizeString(tgt.name)}" hide-details v-model="form.${capitalizeString(tgt.name)}Id" disabled name="${capitalizeString(tgt.name)}"></v-select>
</v-col>`;
                relationOptionsGenerated +=  `const ${tgt.name}Options = ref([]); \n`;
                formattrGenerated =  `${capitalizeString(tgt.name)}Id: '', \n`;
                if(tgt.name != cls.name) {
                    importsGenerated += `import ${tgt.name}Service from '../../../services/requires/${tgt.name}Requires'; \n`;
                    relationGetGenerated += `const { list: list${tgt.name} } = ${tgt.name}Service(); \n`;
                    OnMountedGenerated += `
response = await list${tgt.name}();
${tgt.name}Options.value = response.value;`;
                }
            }
            break;
            
        case "ManyToOne":
            if(owner) {
                formsGenerated +=`
                <v-col cols="12">
                    <v-label class="font-weight-medium mb-2">${capitalizeString(tgt.name)}</v-label>
                    <v-select :items="${capitalizeString(tgt.name)}Options" item-title="Id" item-value="Id" placeholder="Select ${capitalizeString(tgt.name)}" hide-details v-model="form.${capitalizeString(tgt.name)}Id" disabled name="${capitalizeString(tgt.name)}"></v-select>
                </v-col>`;
                                relationOptionsGenerated +=  `const ${tgt.name}Options = ref([]); \n`;
                                formattrGenerated =  `${capitalizeString(tgt.name)}Id: '', \n`;
                                if(tgt.name != cls.name) {
                                    importsGenerated += `import ${tgt.name}Service from '../../../services/requires/${tgt.name}Requires'; \n`;
                                    relationGetGenerated += `const { list: list${tgt.name} } = ${tgt.name}Service(); \n`;
                                    OnMountedGenerated += `
                response = await list${tgt.name}();
                ${tgt.name}Options.value = response.value;`;
            }
            break;
        }
        case "ManyToMany":
            if(owner) {
                formsGenerated +=`
<v-col cols="12">
    <v-label class="font-weight-medium mb-2">${capitalizeString(tgt.name)}</v-label>
    <v-select :items="${capitalizeString(tgt.name)}Options" item-title="Id" item-value="Id" placeholder="Select ${capitalizeString(tgt.name)}" hide-details v-model="form.${capitalizeString(tgt.name)}Id" disabled name="${capitalizeString(tgt.name)}"></v-select>
</v-col>`;
                relationOptionsGenerated +=  `const ${tgt.name}Options = ref([]); \n`;
                formattrGenerated =  `${capitalizeString(tgt.name)}Id: '', \n`;
                if(tgt.name != cls.name) {
                    importsGenerated += `import ${tgt.name}Service from '../../../services/requires/${tgt.name}Requires'; \n`;
                    relationGetGenerated += `const { list: list${tgt.name} } = ${tgt.name}Service(); \n`;
                    OnMountedGenerated += `
response = await list${tgt.name}();
${tgt.name}Options.value = response.value;`;
                }
            }
            break;
    }
    
    return {formattrGenerated, formsGenerated, importsGenerated, relationGetGenerated, OnMountedGenerated, relationOptionsGenerated};
}

function generateFactory(Enum: EnumEntityAtribute, Enumx: EnumX[]): string {
    let EnumText = "";
    let count = 0;
    for (const enumx of Enumx){
      if(Enum.type.ref?.name == enumx.name){
        for (const a of enumx.attributes){
          EnumText += `
if(${capitalizeString(Enum.type.ref?.name)} == '${a.name}') return ${count};`
          count++;
        }
        return expandToString`
        const factory${capitalizeString(Enum.type.ref?.name)} = (${capitalizeString(Enum.type.ref?.name)}: string) => {
            ${EnumText}
        } \n \n`
      }
    }
    return ""
}

function generateTypeAttribute(attribute:Attribute): string{

    if (attribute.type.toString().toLowerCase() === "date"){
      return "date"
    }
    if (attribute.type.toString().toLowerCase() === "datetime"){
        return "datetime"
    }
    if (attribute.type.toString().toLowerCase() === "integer"){
      return "number"
    }
    if (attribute.type.toString().toLowerCase() === "decimal"){
        return "number"
    }
    if (attribute.type.toString().toLowerCase() === "boolean"){
        return "checkbox"
    }
    return "text"
  
  }