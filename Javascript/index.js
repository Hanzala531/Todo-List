const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUl = document.getElementById("todo-list");

// Get todos from local storage or initialize as empty
let allTodos = getTodos();
console.log(allTodos);
updateTodoList();

// Event listener for form submission
todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addTodo();
});

// Add a new todo
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false,
        };

        allTodos.push(todoObject);
        updateTodoList(); // Update the UI with the new todo
        saveTodos(); // Save the todos to local storage
        todoInput.value = ""; // Clear input field
    }
}

// Function to create and append a todo item to the list
function createTodoItem(todo, index) {
    const todoId = `todo-${index}`;
    const todoLi = document.createElement("li");
    const todoValue = todo.text;
    todoLi.className = "todo";
    todoLi.innerHTML = `
        <input type="checkbox" class="checkbox" id="${todoId}" />
        <label class="custom-checkbox" for="${todoId}">
            <svg
                fill="transparent"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color=" var(--primary-color)"
            >
                <path
                    d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </label>
        <label for="${todoId}" class="todo-text">${todoValue}</label>
        <button class="delete-button">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="var(--secondary-color)"
            >
                <path
                    d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                />
                <path
                    d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                />
                <path
                    d="M9.5 16.5L9.5 10.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                />
                <path
                    d="M14.5 16.5L14.5 10.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                />
            </svg>
        </button>`;

    const checkbox = todoLi.querySelector("input");
    checkbox.checked = todo.completed; // Ensure the checkbox reflects the 'completed' state
    checkbox.addEventListener("change", () => {
        allTodos[index].completed = checkbox.checked; // Update the 'completed' state
        saveTodos(); // Save the changes to local storage
    });

    const deleteButton = todoLi.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        deleteTodo(index);
    });

    return todoLi;
}

// Update the todo list UI
function updateTodoList() {
    todoListUl.innerHTML = "";
    allTodos.forEach((todo, index) => {
        const todoItem = createTodoItem(todo, index);
        todoListUl.appendChild(todoItem);
    });
}

// Delete a todo item
function deleteTodo(index) {
    allTodos.splice(index, 1); // Remove the todo from the array
    saveTodos(); // Save the updated todos to local storage
    updateTodoList(); // Refresh the UI
}

// Save todos to local storage
function saveTodos() {
    const todosJson = JSON.stringify(allTodos); // Convert the array to a JSON string
    localStorage.setItem("todos", todosJson); // Store it with a descriptive key
}

// Get todos from local storage
function getTodos() {
    const todos = localStorage.getItem("todos");
    try {
        return todos ? JSON.parse(todos) : []; // Parse if exists, else return empty array
    } catch (error) {
        console.error("Error parsing todos:", error);
        return []; // Return empty array if parsing fails
    }
}
