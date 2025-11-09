'use server';

import { revalidatePath } from "next/cache";

type List = {
    id: string;
    title: string;
    items: Item[];
}

type Item = {
    id: string;
    title: string;
    isActive: boolean;
}

const database: Record<string, List> = {
    "1": {
        id: "1",
        title: "Fruits",
        items: [
            { id: "1", title: "Apple", isActive: true },
            { id: "2", title: "Banana", isActive: false },
        ]
    },
    "2": {
        id: "2",
        title: "Vegetables",
        items: [
            { id: "3", title: "Corn", isActive: true },
            { id: "4", title: "Tomato", isActive: true },
            { id: "5", title: "Guacamole", isActive: false },
        ]
    }
}

export async function fetchList(id: string, isActive: boolean): Promise<List | null | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (id === "failed") {
        throw new Error("Failed to fetch items.");
    }

    const itemList = database[id];

    if (itemList) {
        return {
            ...itemList,
            items: itemList.items.filter(item => isActive ? item.isActive === isActive : true),
        };
    }

    return null;
}

export async function addItemAction(prevState: unknown, formData: FormData) {
    const listId = formData.get('listId') as string;

    await new Promise(resolve => setTimeout(resolve, 500));

    const newItem = {
        id: Math.random().toString(36).substring(7),
        title: formData.get('name') as string,
        isActive: true,
    }

    database[listId].items.push(newItem);

    revalidatePath(`/detail/${listId}`);

    return {
        success: true,
        message: 'it worked',
        item: newItem
    };
}

export async function removeItemAction(prevState: unknown, formData: FormData) {
    const listId = formData.get('listId') as string;
    const itemId = formData.get('itemId') as string;

    const index = database[listId].items.findIndex(item => item.id === itemId);

    if (index >= 0) {
        database[listId].items.splice(index, 1);
    }

    revalidatePath(`/detail/${formData.get('listId')}`);
}

export async function resetListAction(prevState: unknown, formData: FormData) {
    for (const key of Object.keys(database)) {
        delete database[key];
    }

    database["1"] =  {
        id: "1",
        title: "Fruits",
        items: [
            { id: "1", title: "Apple", isActive: true },
            { id: "2", title: "Banana", isActive: false },
        ]
    }
    database["2"] = {
        id: "2",
        title: "Vegetables",
        items: [
            { id: "3", title: "Corn", isActive: true },
            { id: "4", title: "Tomato", isActive: true },
            { id: "5", title: "Guacamole", isActive: false },
        ]
    }

    revalidatePath(`/detail/${formData.get('listId')}`);
}

export async function toggleItemIsActive(prevState: unknown, formData: FormData) {
    const listId = formData.get('listId') as string;
    const itemId = formData.get('itemId') as string;

    const list = database[listId];

    const index = list.items.findIndex(item => item.id === itemId);
    if (index >= 0) {
        list.items[index].isActive = !list.items[index].isActive;
    }

    revalidatePath(`/detail/${formData.get('listId')}`);
}

export async function updateListTitleAction(prevState: unknown, formData: FormData) {
    const listId = formData.get('listId') as string;
    const newTitle = formData.get('title') as string;

    const list = database[listId];
    list.title = newTitle;

    revalidatePath(`/detail/${formData.get('listId')}`);
}
