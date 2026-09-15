// To-Do List Application with Local Storage

class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.storageKey = 'todoAppData';
        this.init();
    }

    generateTodoId() {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID();
        }

        return `${Date.now()}-${Math.random().toString(16).slice(2)}-${Math.random().toString(16).slice(2)}`;
    }

    normalizeTodo(todo, fallbackText = 'Untitled task') {
        const text = typeof todo?.text === 'string' ? todo.text.trim() : '';
        const priority = ['low', 'medium', 'high'].includes(todo?.priority) ? todo.priority : 'medium';

        return {
            id: String(todo?.id ?? this.generateTodoId()),
            text: text || fallbackText,
            completed: Boolean(todo?.completed),
            priority,
            createdAt: todo?.createdAt || new Date().toLocaleString(),
            dueDate: todo?.dueDate ?? null
        };
    }

    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Add task button
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());
        
        // Enter key to add task
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });

        // Action buttons
        document.getElementById('clearCompletedBtn').addEventListener('click', () => this.clearCompleted());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportTasks());
        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });
        
        document.getElementById('fileInput').addEventListener('change', (e) => this.importTasks(e));
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();

        if (!text) {
            this.showToast('Please enter a task');
            return;
        }

        const todo = {
            id: this.generateTodoId(),
            text: text,
            completed: false,
            priority: 'medium',
            createdAt: new Date().toLocaleString(),
            dueDate: null
        };

        this.todos.push(todo);
        this.saveToStorage();
        this.render();
        input.value = '';
        input.focus();
        this.showToast('Task added successfully!');
    }

    deleteTodo(id) {
        const targetId = String(id);
        this.todos = this.todos.filter(todo => String(todo.id) !== targetId);
        this.saveToStorage();
        this.render();
        this.showToast('Task deleted');
    }

    toggleTodo(id) {
        const targetId = String(id);
        const todo = this.todos.find(t => String(t.id) === targetId);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
            this.render();
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });
        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        if (completedCount === 0) {
            this.showToast('No completed tasks to clear');
            return;
        }

        if (confirm(`Are you sure you want to delete ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(todo => !todo.completed);
            this.saveToStorage();
            this.render();
            this.showToast(`${completedCount} task(s) deleted`);
        }
    }

    exportTasks() {
        if (this.todos.length === 0) {
            this.showToast('No tasks to export');
            return;
        }

        const dataStr = JSON.stringify(this.todos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        this.showToast('Tasks exported successfully!');
    }

    normalizeImportedTodos(importedTodos) {
        const usedIds = new Set(this.todos.map(todo => String(todo.id)));

        return importedTodos.map((todo, index) => {
            const normalizedTodo = this.normalizeTodo(todo, `Imported task ${index + 1}`);
            let nextId = String(normalizedTodo.id);

            while (usedIds.has(nextId)) {
                nextId = this.generateTodoId();
            }

            normalizedTodo.id = nextId;
            usedIds.add(nextId);
            return normalizedTodo;
        });
    }

    importTasks(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedTodos = JSON.parse(e.target.result);
                
                if (!Array.isArray(importedTodos)) {
                    this.showToast('Invalid file format');
                    return;
                }

                const valid = importedTodos.every(todo => 
                    typeof todo === 'object' && todo !== null && typeof todo.completed === 'boolean'
                );

                if (!valid) {
                    this.showToast('Invalid task data');
                    return;
                }

                const mergeChoice = confirm(
                    `Found ${importedTodos.length} task(s). Merge with existing tasks? (Cancel to replace)`
                );

                if (mergeChoice) {
                    const newTodos = this.normalizeImportedTodos(importedTodos);
                    this.todos.push(...newTodos);
                    this.showToast(`Merged ${newTodos.length} new task(s)`);
                } else {
                    this.todos = this.normalizeImportedTodos(importedTodos);
                    this.showToast('Tasks replaced successfully!');
                }

                this.saveToStorage();
                this.render();
            } catch (error) {
                this.showToast('Error reading file');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);
        
        // Reset file input
        event.target.value = '';
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const active = total - completed;

        document.getElementById('totalCount').textContent = total;
        document.getElementById('completedCount').textContent = completed;
        document.getElementById('activeCount').textContent = active;
    }

    render() {
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');
        const filteredTodos = this.getFilteredTodos();

        this.updateStats();

        if (filteredTodos.length === 0) {
            todoList.innerHTML = '';
            emptyState.classList.add('show');
            return;
        }

        emptyState.classList.remove('show');
        todoList.innerHTML = filteredTodos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="checkbox"
                    ${todo.completed ? 'checked' : ''}
                    onchange="app.toggleTodo('${String(todo.id).replace(/'/g, "\\'")}')"
                >
                <span class="todo-priority ${todo.priority}">${String(todo.priority).toUpperCase()}</span>
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <button class="delete-btn" onclick="app.deleteTodo('${String(todo.id).replace(/'/g, "\\'")}')">Delete</button>
            </li>
        `).join('');
    }

    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
        } catch (error) {
            console.error('Error saving to storage:', error);
            this.showToast('Error saving tasks');
        }
    }

    loadFromStorage() {
        try {
            const data = localStorage.getItem(this.storageKey);
            const parsedData = data ? JSON.parse(data) : [];

            if (!Array.isArray(parsedData)) {
                this.todos = [];
                return;
            }

            this.todos = parsedData.map((todo, index) => this.normalizeTodo(todo, `Stored task ${index + 1}`));
        } catch (error) {
            console.error('Error loading from storage:', error);
            this.todos = [];
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TodoApp();
    console.log('To-Do App initialized successfully!');
});