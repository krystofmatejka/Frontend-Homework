'use server';

import { revalidatePath } from "next/cache";
import { type Person, me, someoneElse } from "./users";

type List = {
    id: string;
    title: string;
    items: Item[];
    owner: Person;
    members: Person[];
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
            { id: "3", title: "Mango", isActive: true },
            { id: "4", title: "Banana", isActive: true },
        ],
        owner: me,
        members: [],
    },
    "2": {
        id: "2",
        title: "Vegetables",
        items: [
            { id: "3", title: "Corn", isActive: true },
            { id: "4", title: "Tomato", isActive: true },
            { id: "5", title: "Guacamole", isActive: false },
        ],
        owner: someoneElse,
        members: [me],
    },
    "3": {
        id: "3",
        title: "Vegetables",
        items: [
            { id: "3", title: "Corn", isActive: true },
            { id: "4", title: "Tomato", isActive: true },
            { id: "5", title: "Guacamole", isActive: false },
        ],
        owner: someoneElse,
        members: [],
    }
}

const wait = () => new Promise((resolve) => setTimeout(resolve, 0));

export async function fetchList(id: string, isActive: boolean): Promise<List | null | undefined> {
    await wait();

    if (id === "failed") {
        throw new Error("Failed to fetch items.");
    }

    const itemList = database[id];

    if (itemList) {
        // Check if the current user has access to this list
        const isOwner = itemList.owner.id === me.id;
        const isMember = itemList.members.some(member => member.id === me.id);
        
        // If user is neither owner nor member, return null to trigger 404
        if (!isOwner && !isMember) {
            return null;
        }

        return {
            ...itemList,
            items: itemList.items.filter(item => isActive ? item.isActive === isActive : true),
        };
    }

    return null;
}

export async function addItemAction(prevState: unknown, formData: FormData) {
    const listId = formData.get('listId') as string;

    await wait();

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

    database["1"] = {
        id: "1",
        title: "Fruits",
        items: [
            { id: "1", title: "Apple", isActive: true },
            { id: "2", title: "Banana", isActive: false },
        ],
        owner: me,
        members: [],
    }
    database["2"] = {
        id: "2",
        title: "Vegetables",
        items: [
            { id: "3", title: "Corn", isActive: true },
            { id: "4", title: "Tomato", isActive: true },
            { id: "5", title: "Guacamole", isActive: false },
        ],
        owner: someoneElse,
        members: [me],
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

    if (!list) {
        return {
            success: false,
            message: 'List not found',
        }
    }

    if (list.owner.id !== me.id) {
        return {
            success: false,
            message: 'Only the owner can update the list title',
        }
    }

    list.title = newTitle;

    revalidatePath(`/detail/${formData.get('listId')}`);

    return {
        success: true,
        message: 'Title updated successfully',
    }
}

export async function updateListMembersAction(prevState: unknown, formData: FormData) {
    const listId = formData.get('listId') as string;
    const members = formData.getAll('members') as string[];
    const list = database[listId];
    if (!list) {
        return {
            success: false,
            message: 'List not found',
        }
    }
    if (list.owner.id !== me.id) {
        return {
            success: false,
            message: 'Only the owner can update the list members',
        }
    }
    list.members = members.map(memberId => {
        if (memberId === me.id) {
            return me;
        }
        if (memberId === someoneElse.id) {
            return someoneElse;
        }
        throw new Error('Unknown member id');
    });

    revalidatePath(`/detail/${formData.get('listId')}`);
    return {
        success: true,
        message: 'Members updated successfully',
    }
}

export async function leaveListAction(prevState: unknown, formData: FormData) {
    const listId = formData.get('listId') as string;
    const list = database[listId];
    
    if (!list) {
        return {
            success: false,
            message: 'List not found',
        }
    }
    
    // Check if the current user is a member of the list
    const memberIndex = list.members.findIndex(member => member.id === me.id);
    
    if (memberIndex === -1) {
        return {
            success: false,
            message: 'You are not a member of this list',
        }
    }
    
    // Remove the current user from the members array
    list.members.splice(memberIndex, 1);
    
    revalidatePath(`/detail/${listId}`);
    
    return {
        success: true,
        message: 'You have left the list successfully',
    }
}