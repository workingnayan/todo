export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface CreateTodoInput {
    text: string;
}

export interface UpdateTodoInput {
    id: number;
    text: string;
    completed: boolean;
}

export interface DeleteTodoInput {
    id: number;
}

