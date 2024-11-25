document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const category = document.getElementById('category');

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.category, task.completed));
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task-text').textContent,
                category: li.dataset.category,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to DOM
    const addTaskToDOM = (taskText, taskCategory, isCompleted = false) => {
        const li = document.createElement('li');
        li.dataset.category = taskCategory;
        li.className = isCompleted ? 'completed' : '';

        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div>
                <span class="task-category">(${taskCategory})</span>
                <button class="complete-btn">✔</button>
                <button class="delete-btn">✖</button>
            </div>
        `;

        li.querySelector('.complete-btn').addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        taskList.appendChild(li);
    };

    // Add task event
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const taskCategory = category.value;

        if (taskText) {
            addTaskToDOM(taskText, taskCategory);
            saveTasks();
            taskInput.value = '';
        }
    });

    // Load tasks on page load
    loadTasks();
});
