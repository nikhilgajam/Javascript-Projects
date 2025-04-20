"use client"

type TodoItemProps = {
    id: string
    title: string
    complete: boolean
    toggleTodo: (id: string, complete: boolean) => void
    deleteTodo: (id: string) => void
};


export function TodoItem({ id, title, complete, toggleTodo, deleteTodo }: TodoItemProps) {
    return (
        <li className="flex gap-x-1 space-y-1 items-center">
            <input
                id={id}
                type="checkbox"
                className="cursor-pointer peer"
                defaultChecked={complete}
                onChange={e => toggleTodo(id, e.target.checked)}
            />
            <label
                htmlFor={id}
                className="peer-checked:line-through peer-checked:text-slate-500 cursor-pointer"
            >
                {title}
            </label>
            <button
                id="delete-button"
                onClick={() => deleteTodo(id)}
                className="border border-red-300 text-red-300 px-2 py-1 rounded hover:bg-red-700 focus-within:bg-red-700 outline-none"
            >
                Delete
            </button>
        </li>
    );
}