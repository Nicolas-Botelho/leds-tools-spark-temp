import { Model } from "../../../../../language/generated/ast.js"
import fs from "fs";
import { expandToString } from "langium/generate";
import path from "path";

export function generate(model: Model, target_folder: string) : void {

    const urlid = "`${url}/${id}`"
    const url = "`${url}`"
    const urlformid = "`${url}/${form.id}`"

    fs.writeFileSync(path.join(target_folder, 'UseApi.ts'), generateUseApi(urlid, urlformid, url));

}  

function generateUseApi(urlid: string, urlformid: string, url: string): string {
    return expandToString`
import api from '../services/api'

export default function useApi(url: string) {
  const list = async () => {
    const { data } = await api.get(url)
    return data
  }

  const getById = async (id?: string) => {
    if (id){
      const response = await api.get(${urlid})
      return response.data
    }
    const response = await api.get(${url})
    return response.data
  }

  const post = async<T=Record<string, any>> (form: T) => {
    const { data } = await api.post(url, form)
    return data
  }

  const update = async<T=Record<string, any>> (form: { id: T }) => {
    const { data } = await api.put(${urlformid}, form)
    console.log(data)
    return data
  }

  const remove = async (id: string) => {
    const { data } = await api.delete(${urlid})
    return data
  }


  return {
    list,
    post,
    update,
    remove,
    getById
  }
}`
}