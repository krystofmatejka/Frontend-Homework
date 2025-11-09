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

const some_items = [
    { id: "1", title: "Apple", isActive: true },
    { id: "2", title: "Banana", isActive: false },
]

export async function fetchList(id: string): Promise<List | null | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (id === "1") {
        return {
            id: "1",
            title: "Fruits",
            items: some_items
        };
    }
    if (id === "2") {
        return {
            id: "2",
            title: "Vegetables",
            items: [
                { id: "3", title: "Corn", isActive: true },
                { id: "4", title: "Tomato", isActive: true },
                { id: "5", title: "Guacamole", isActive: false },
            ]
        };
    }
    if (id === "failed") {
        throw new Error("Failed to fetch items.");
    }

    null;
}

export async function addItemAction(prevState: unknown, formData: FormData) {
    const listId = formData.get('listId') as string;

    await new Promise(resolve => setTimeout(resolve, 500));

    some_items.push({
        id: Math.random().toString(36).substring(7),
        title: formData.get('name') as string,
        isActive: true,
    });

    revalidatePath(`/detail/${listId}`);

    return {
        success: true,
        message: 'it worked',
        item: {
            id: Math.random().toString(36).substring(7),
            title: formData.get('name') as string,
            isActive: true,
        }
    };
}

export async function resetListAction(prevState: unknown, formData: FormData) {
    for (let i = some_items.length; i > 2; i--) {
        some_items.pop();
    }
    revalidatePath(`/detail/${formData.get('listId')}`);
}
