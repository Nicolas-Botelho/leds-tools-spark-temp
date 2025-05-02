import { Model } from "../../../../../../language/generated/ast.js"
import fs from "fs";
import { expandToString } from "langium/generate";
import path from "path";
import { createPath } from "../../../../../util/generator-utils.js";
import { generate as generateUserprofile } from "./userprofile/generate.js";

export function generate(model: Model, target_folder: string) : void {

  const kanban_folder = createPath(target_folder, "kanban")
  const userprofile_folder = createPath(target_folder, "userprofile")

  fs.mkdirSync(kanban_folder, {recursive:true})
  fs.mkdirSync(userprofile_folder, {recursive:true})

  fs.writeFileSync(path.join(target_folder, "blog.ts"), generateBlog())
  fs.writeFileSync(path.join(target_folder, "chat.ts"), generateChat())
  fs.writeFileSync(path.join(target_folder, "contact.ts"), generateContact())
  fs.writeFileSync(path.join(target_folder, "eCommerce.ts"), generateECommerce())
  fs.writeFileSync(path.join(target_folder, "notes.ts"), generateNotes())
  fs.writeFileSync(path.join(kanban_folder, "task.ts"), generateKanban())

  generateUserprofile(model, userprofile_folder)
}  

function generateBlog(): string {
    return expandToString`
import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import type { blogpostType } from '@/types/apps/BlogTypes';

interface blogTypeDe {
    blogposts: blogpostType[];
    recentPosts: blogpostType[];
    blogSearch: string;
    sortBy: string;
    selectedPost: blogpostType[] | any;
}

export const useBlogStore = defineStore({
    id: 'blog',

    state: (): blogTypeDe => ({
        blogposts: [],
        recentPosts: [],
        blogSearch: '',
        sortBy: 'newest',
        selectedPost: []
    }),
    getters: {
        // Get Post from Getters
        getPosts(state) {
            return state.blogposts;
        }
    },
    actions: {
        // Fetch Blog from action
        async fetchPosts() {
            try {
                const data = await axios.get('/api/data/blog/BlogPosts');
                this.blogposts = data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async fetchPost(title: string) {
            try {
                const response = await axios.post('/api/data/blog/post', { title });
                this.selectedPost = response.data.post;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});`
}

function generateChat(): string{
    return expandToString`
import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import { uniqueId } from 'lodash';
import { sub } from 'date-fns';

interface chatType {
    chats: any;
    chatContent: any;
}

export const useChatStore = defineStore({
    id: 'chat',
    state: (): chatType => ({
        chats: [],
        chatContent: 1
    }),
    getters: {
        // Get Chats from Getters
        // getChats(state) {
        //     return state.chats;
        // }
    },
    actions: {
        // Fetch Chat from action
        async fetchChats() {
            try {
                const data = await axios.get('/api/data/chat/ChatData');
                this.chats = data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        //select chat
        SelectChat(itemID: number) {
            this.chatContent = itemID;
        },
        sendMsg(itemID: number, item: string) {
            const newMessage = {
                id: itemID,
                msg: item,
                type: 'text',
                attachments: [],
                createdAt: sub(new Date(), { seconds: 1 }),
                senderId: itemID
            };

            this.chats = this.chats.filter((chat: any) => {
                return chat.id === itemID
                    ? {
                          ...chat,
                          ...chat.chatHistory.push(newMessage)
                      }
                    : chat;
            });
        }
    }
});`
}

function generateContact(): string {
    return expandToString`
import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';

export const useContactStore = defineStore({
    id: 'Contact',
    state: () => ({
        contacts: []
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        async fetchContacts() {
            try {
                const response = await axios.get('/api/contacts');
                this.contacts = response.data.contacts;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});`
}

function generateECommerce(): string {
    return expandToString`
import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
// types
import type { ProductStateProps } from '@/types/apps/EcommerceType';
import { filter, map, sum } from 'lodash';

export const useEcomStore = defineStore({
    id: 'eCommerceone',
    state: (): ProductStateProps => ({
        products: [],
        cart: [],
        gender: '',
        category: [],
        price: '',
        subTotal: 0,
        discount: 5,
        total: 0,
        addresses: [],
        color: 'All',
    }),
    getters: {},
    actions: {
        // Fetch Customers from action
        async fetchProducts() {
            try {
                const data = await axios.get('/api/products/list');
                this.products = data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        // Fetch Customers from addresses
        async fetchAddress() {
            try {
                const data = await axios.get('/api/address/list');
                this.addresses = data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        //select gender
        SelectGender(items: any) {
            this.gender = items;
        },
        sortByColor(itemcolor: string) {
            this.color = itemcolor;
        },
        //select category
        SelectCategory(items: any) {
            this.category = items;
        },
        //select Price
        SelectPrice(items: any) {
            this.price = items;
        },
        //AddToCart
        AddToCart(item: any) {
            const product = item;
            this.cart = [...this.cart, product];
        },
        //qty
        incrementQty(item: any) {
            const productId = item;
            const updateCart = map(this.cart, (product: any) => {
                if (product.id === productId) {
                    return {
                        ...product,
                        qty: product.qty + 1
                    };
                }
                return product;
            });
            this.cart = updateCart;
            this.subTotal = sum(this.cart.map((product: any) => product.salePrice * product.qty));
            this.discount = Math.round(this.subTotal * (5 / 100));
            this.total = this.subTotal - this.discount;
        },
        //qty
        decrementQty(item: any) {
            const productId = item;
            const updateCart = map(this.cart, (product: any) => {
                if (product.id === productId) {
                    return {
                        ...product,
                        qty: product.qty - 1
                    };
                }
                return product;
            });
            this.cart = updateCart;
            this.subTotal = sum(this.cart.map((product: any) => product.salePrice * product.qty));
            this.subTotal = sum(this.cart.map((product: any) => product.salePrice * product.qty));
            this.discount = Math.round(this.subTotal * (5 / 100));
            this.total = this.subTotal - this.discount;
        },
        // delete Cart
        deleteCart(item: any) {
            const updateCart = filter(this.cart, (p) => p.id !== item);
            this.cart = updateCart;
        },
        //subtotal
        getsubTotal() {
            this.subTotal = sum(this.cart.map((product: any) => product.salePrice * product.qty));
        },
        //total
        getTotal() {
            this.total = this.subTotal - this.discount;
        },
        //discount
        getDiscount() {
            this.discount = Math.round(this.subTotal * (5 / 100));
        },

        //Reset Filter
        filterReset(){}


    }
});`
}

function generateNotes(): string {
    return expandToString`
import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import { map } from 'lodash';

interface NotesType {
    id?: number | any;
    color?: string;
    title?: string;
    datef?: Date | any;
    deleted?: boolean;
}

interface noteType {
    notes: NotesType[];
    notesContent: number;
    noteSearch: string;
}

export const useNoteStore = defineStore({
    id: 'notes',
    state: (): noteType => ({
        notes: [],
        notesContent: 1,
        noteSearch: ''
    }),
    actions: {
        // Fetch notes
        async fetchNotes() {
            try {
                const data = await axios.get('/api/data/notes/NotesData');
                this.notes = data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },

        //select chat
        SelectNote(itemID: number) {
            this.notesContent = itemID;
        },

        deleteNote(itemID: number) {
            const index = this.notes.findIndex((p) => p.id == itemID);
            this.notes.splice(index, 1);
        },
        updateNote(itemID: number, itemColor: any) {
            this.notes = map(this.notes, (note: any) => {
                if (note.id === itemID) {
                    return {
                        ...note,
                        color: itemColor
                    };
                }
                return note;
            });
        }
    }
});`
}

function generateKanban(): string {
    return expandToString`
import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import { map } from 'lodash';
import { uniqueId } from 'lodash';
import { sub } from 'date-fns';
import type { Ref } from 'vue';


interface TaskType {
    id?: string | any;
    title?: string;
    subtitle?: string;
    datef?: Date | any;
    cardbg?: string;
    deleted?: boolean;
    taskimg?: string;
    date?: Date | any;
    category?: string;
    categorybg?: string;
    tasks?: TaskType[];
}

interface taskType {
    tasks: TaskType[];
    taskContent: string;
}

export const useTaskStore = defineStore({
    id: 'tasks',
    state: (): taskType => ({
        tasks: [],
        taskContent: '1'
    }),
    actions: {
        // Fetch tasks
        async fetchTasks() {
            try {
                const data = await axios.get('/api/data/task/TaskData');
                this.tasks = data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },

        //select chat
        SelectTask(itemID: string) {
            this.taskContent = itemID;
        },

        deleteTask(itemID: string) {
            const taskObj = this.tasks.map((task) => {
                const tasks = task.tasks?.filter((t) => t.id !== itemID);
                return {
                    ...task,
                    tasks
                };
            });
            this.tasks = taskObj;
        },
        addTask(columnId:string, title:string, subtitle:string, category:string, categorybg:string) {
            const newTask = {
                id: uniqueId('#task_'),
                title: title,
                subtitle: subtitle,
                category:category,
                date: sub(new Date(), { seconds: 1 }),
                categorybg:categorybg
            };
            this.tasks = map(this.tasks, (task: any) => {
                if (task.id === columnId) {
                    return {
                        ...task,
                        ...task.tasks.push(newTask)
                    };
                }
                return task;
            });
        }
    }
});`
}