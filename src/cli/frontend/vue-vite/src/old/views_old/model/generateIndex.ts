import { expandToString } from "langium/generate";
import { LocalEntity } from "../../../../../../language/generated/ast.js";
import { capitalizeString } from "../../../../../util/generator-utils.js";
import { RelationInfo } from "../../../../../util/relations.js";

export function generate(cls: LocalEntity, relations: RelationInfo[]): string {
    const path_form =  "`" + `/${cls.name}/form${cls.name}/\${id}` +  "`"
    const path_details = "`" + `/${cls.name}/details${cls.name}/\${id}` + "`" 

    let interfaces = ""
    let headers = ""

    for(const attr of cls.attributes) {
        headers += `
{ title: '${attr.name}', sortable: false, key: '${capitalizeString(attr.name)}' },`
        interfaces += `
${capitalizeString(attr.name)}: string;`
    }
    headers += "\n"
    headers += cls.enumentityatributes.length > 0 
    ? `${cls.enumentityatributes.map(enumEntityAtribute => `{ title: '${enumEntityAtribute.type.ref?.name}', sortable: false, key: '${capitalizeString(enumEntityAtribute.type.ref?.name || "")}' }`).join(", \n")}, \n` 
    : '';
    relations.map(rel => headers +=  generateRelation(cls, rel))

    const index = generateIndexText(cls,path_form, headers, interfaces, path_details);
    return index
    

}

function generateIndexText(cls: LocalEntity, path_form: string, headers: string, interfaces: string, path_details: string): string {
    return expandToString`
<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="search"
          label="Buscar ${cls.name}"
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="4" class="d-flex align-start">
        <v-btn class="custom-width" color="primary" variant="flat" dark @click="search${cls.name}" name="SearchButton">Buscar</v-btn>
      </v-col>
      <v-col cols="2" class="d-flex justify-end">
        <v-btn class="custom-width-2" color="primary" variant="flat" dark @click="add${cls.name}" name="CreateButton">Cadastrar ${cls.name}</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table class="border rounded-md" :headers="headers" :items="filtered${cls.name}">
          <template v-slot:top>
            <v-row>
              <v-col class="d-flex justify-end">
              </v-col>
            </v-row>
            <v-spacer />
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5 text-center py-6">Tem certeza que deseja deletar esse item?</v-card-title>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="primary" variant="outlined" dark @click="closeDelete">Cancelar</v-btn>
                  <v-btn color="primary" variant="flat" dark @click="deleteItem">OK</v-btn>
                  <v-spacer />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.actions="{ item }">
          <v-icon class="mdi mdi-eye me-2" color="primary" size="small" @click="goToDetail(item.Id)" name="detailsList"/>
            <v-icon color="primary" size="small" class="me-2" @click="editItem(item.Id)">
              mdi-pencil
            </v-icon>
            <v-icon color="error" size="small" @click="confirmDeleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-label>Sem dados!</v-label>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </template>
  
  
<script async setup lang="ts">
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ${cls.name}Requires from '../../../services/requires/${cls.name}Requires';

const { list, remove, update, post } = ${cls.name}Requires();
const page = ref({ title: '${cls.name} ' });
const breadcrumbs = ref([
  { text: '${cls.name}', disabled: true, href: '#' },
  { text: '', disabled: true, href: '#' }
]);

const dialog = ref(false);
const router = useRouter();
const dialogDelete = ref(false);
const headers = ref([
  ${headers}
  { title: 'Ações', key: 'actions' }
]);
const ${cls.name} = ref([]);
const filtered${cls.name} = ref([]);
const editedIndex = ref(-1);
const editedItem = ref({}); 
const defaultItem = ref({}); 
const itemToDelete = ref<itemToDeleteInterface>();
const search = ref('');

interface ${cls.name}Interface {
${interfaces}
}

interface itemToDeleteInterface {
  Id: string;
}

const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'New Item' : 'Edit Item';
});

onMounted(() => {
  getPosts();
});

const getPosts = async () => {
  try {
    const data = await list();
    data.value.forEach((element: any) => {
      element.Data = dayjs(element.Data).format('DD/MM/YYYY');
    });
    ${cls.name}.value = data.value;
    filtered${cls.name}.value = data.value;
  } catch (error) {
    console.error('Error fetching:', error);
  }
};

const deleteItem = async () => {
  if (itemToDelete.value) {
    try {
      await remove(itemToDelete.value.Id);
      Swal.fire({
        title: "Deletado com sucesso!",
        icon: "success",
        confirmButtonColor: "#D3D3D3"
      });
      await getPosts();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro ao salvar!",
        text: "Não foi possível apagar."
      });
    } finally {
      closeDelete();
    }
  }
};

function confirmDeleteItem(item) {
  itemToDelete.value = item;
  dialogDelete.value = true;
}

function add${cls.name}() {
  router.push('/${cls.name}/form${cls.name}');
}

function editItem(id: any) {
  router.push({ path: ${path_form} });
}

function goToDetail(id: any) {
  router.push({ path: ${path_details} });
}

function closeDelete() {
  dialogDelete.value = false;
  itemToDelete.value = null;
}

function close() {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}

const search${cls.name} = () => {
  filter${cls.name}();
};

const filter${cls.name} = () => {
  if (!search.value) {
    filtered${cls.name}.value = ${cls.name}.value;
  } else {
    const searchQuery = search.value.toLowerCase();
    filtered${cls.name}.value = ${cls.name}.value.filter(item =>
      item.Nome.toLowerCase().includes(searchQuery)
    );
  }
};

watch(dialog, val => {
  if (!val) close();
});
watch(dialogDelete, val => {
  if (!val) closeDelete();
});
</script>

<style scoped>
.ementa-cell {
  white-space: normal;
  word-break: break-word;
  max-width: 800px;
}

.custom-width {
  height: 48px;
  width: 100px 
}

.custom-width-2 {
  height: 48px;
  width: 200px;
}
</style>`
}

function generateRelation(cls: LocalEntity, {tgt, card, owner}: RelationInfo) : string {
  let headersGenerated = "";
  
  switch(card) {
    case "OneToOne":
      if(owner) {
        headersGenerated += `{ title: '${tgt.name}', sortable: false, key: '${capitalizeString(tgt.name)}Id' }, \n`;
      }
      break;

    case "OneToMany":
      if(owner) {
        headersGenerated += `{ title: '${tgt.name}', sortable: false, key: '${capitalizeString(tgt.name)}Id' }, \n`;
      }
      break;

    case "ManyToOne":
      if(owner) {
      }
      break;

    case "ManyToMany":
      if(owner) {
        headersGenerated += `{ title: '${tgt.name}', sortable: false, key: '${capitalizeString(tgt.name)}Id' }, \n`;
      }
      break;
  }
  
  return headersGenerated;
}
