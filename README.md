# To-Do List Application

A modern, feature-rich to-do list application with persistent local storage functionality. Built with vanilla JavaScript, HTML, and CSS.

## ✨ Features

### Core Functionality
- ✅ **Add Tasks** - Easily add new tasks with a simple interface
- ✅ **Mark Complete** - Check off tasks as you complete them
- ✅ **Delete Tasks** - Remove tasks you no longer need
- ✅ **Local Storage** - All tasks are automatically saved to your browser's local storage
- ✅ **Persistent Data** - Your tasks remain even after closing the browser

### Advanced Features
- 🔍 **Filter Tasks** - View all tasks, only active tasks, or only completed tasks
- 📊 **Statistics** - Real-time count of total, active, and completed tasks
- 🗑️ **Clear Completed** - Quickly delete all completed tasks
- 💾 **Export Tasks** - Download your tasks as a JSON file for backup
- 📥 **Import Tasks** - Load tasks from a previously exported JSON file
- 🎨 **Priority Levels** - Tasks have priority indicators (high, medium, low)
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎯 **User-Friendly** - Intuitive interface with smooth animations and visual feedback

## 🚀 Quick Start

### Option 1: Direct File Access
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start managing your tasks!

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (with http-server)
npx http-server
```
Then navigate to `http://localhost:8000` in your browser.

## 📖 Usage Guide

### Adding a Task
1. Type your task in the input field
2. Click "Add Task" button or press Enter
3. Your task appears in the list below

### Completing a Task
- Click the checkbox next to a task to mark it as complete
- Completed tasks appear with strikethrough text

### Deleting a Task
- Click the "Delete" button next to any task to remove it

### Filtering Tasks
- Click "All" to see all tasks
- Click "Active" to see only incomplete tasks
- Click "Completed" to see only completed tasks

### Managing Tasks in Bulk
- **Clear Completed**: Click "Clear Completed" to delete all finished tasks at once
- **Export**: Click "Export Tasks" to download tasks as a JSON file (includes timestamp)
- **Import**: Click "Import Tasks" to load tasks from a previously saved JSON file
  - You can choose to merge with existing tasks or replace them entirely

### Statistics
The app displays real-time statistics showing:
- **Total**: Number of all tasks
- **Active**: Number of incomplete tasks
- **Completed**: Number of finished tasks

## 💾 Local Storage

Your tasks are automatically saved to your browser's local storage. This means:
- ✅ Tasks persist when you close and reopen the browser
- ✅ Tasks are stored locally on your device (no server needed)
- ✅ No internet connection required to access your tasks
- ✅ Your data is private and stays on your device

### Storage Details
- **Storage Key**: `todoAppData`
- **Storage Type**: Browser localStorage
- **Max Size**: Typically 5-10MB per domain (browser dependent)

## 📁 File Structure

```
todo-list-app/
├── index.html      # Main HTML structure
├── styles.css      # Styling and animations
├── script.js       # Application logic and local storage
└── README.md       # This file
```

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Flexbox, gradients, animations
- **JavaScript (ES6+)**: Object-oriented design with TodoApp class
- **Browser APIs**: localStorage, FileReader, Blob

### Key Classes and Methods

#### TodoApp Class
```javascript
class TodoApp {
    // Initialize the application
    init()
    
    // Add a new todo
    addTodo()
    
    // Delete a todo by ID
    deleteTodo(id)
    
    // Toggle completion status
    toggleTodo(id)
    
    // Set active filter
    setFilter(filter)
    
    // Get todos based on current filter
    getFilteredTodos()
    
    // Clear all completed todos
    clearCompleted()
    
    // Export todos to JSON file
    exportTasks()
    
    // Import todos from JSON file
    importTasks(event)
    
    // Update statistics display
    updateStats()
    
    // Render the UI
    render()
    
    // Save todos to localStorage
    saveToStorage()
    
    // Load todos from localStorage
    loadFromStorage()
    
    // Show notification toast
    showToast(message)
}
```

### Data Structure
```javascript
{
    id: 1234567890,           // Timestamp-based unique ID
    text: "Task description", // Task text
    completed: false,         // Completion status
    priority: "medium",       // Priority level (low/medium/high)
    createdAt: "9/8/2026...", // Creation date/time
    dueDate: null             // Optional due date
}
```

## 🎨 Design Features

- **Gradient Background**: Modern purple gradient backdrop
- **Smooth Animations**: Fade-in effects for new tasks, smooth transitions
- **Color-Coded Priority**: Visual indicators for task priorities
- **Responsive Layout**: Adapts beautifully to all screen sizes
- **Accessibility**: High contrast, keyboard navigation support
- **Toast Notifications**: User feedback for all actions
- **Custom Scrollbar**: Styled scrollbar for task list

## 🔐 Privacy & Security

- ✅ **No Server**: Completely client-side application
- ✅ **No Tracking**: No external APIs or tracking services
- ✅ **Local Storage Only**: Data stays on your device
- ✅ **No Cloud Sync**: Full control over your data

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Here are some ideas for improvements:
- [ ] Add due dates and reminders
- [ ] Implement task categories/tags
- [ ] Add dark mode theme
- [ ] Create drag-and-drop reordering
- [ ] Add task search functionality
- [ ] Implement recurring tasks
- [ ] Add keyboard shortcuts
- [ ] Create PWA support for offline access

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋 Support

If you encounter any issues or have suggestions:
1. Check existing issues on GitHub
2. Create a new issue with a detailed description
3. Include steps to reproduce any bugs
4. Provide your browser and OS information

## 🎯 Roadmap

- [ ] Sync across devices (Firebase/Backend)
- [ ] Task reminders and notifications
- [ ] Recurring/repeating tasks
- [ ] Dark mode theme
- [ ] Task categories/projects
- [ ] Collaboration features
- [ ] Mobile app version
- [ ] Cloud backup options

## ✨ Future Enhancements

### Phase 2
- Task subtasks
- Time tracking
- Task notes/descriptions
- Calendar view
- Custom themes

### Phase 3
- Multi-user accounts
- Collaboration and sharing
- Task automation/workflows
- Analytics and insights
- API integrations

---

**Happy task managing! 🚀**