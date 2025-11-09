export const me: Person = {
    id: "user-1",
    name: "John Doe",
}

export const someoneElse: Person = {
    id: "user-2",
    name: "Jane Smith",
}

export type Person = {
    id: string;
    name: string;
}