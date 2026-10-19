# Nature Planner — To-Do List App

## Project Overview

Nature Planner is a nature-inspired to-do list application built with HTML, Tailwind CSS v4, and vanilla JavaScript. It helps users organize daily tasks, track progress, and save their tasks in the browser.

## Features

### Required Features
- Add tasks with input validation.
- Mark tasks as completed or active.
- Edit tasks in place.
- Delete tasks with confirmation.
- Filter tasks by All, Active, and Completed.
- Display the remaining task count.
- Clear completed tasks.
- Save tasks using localStorage.
- Display an empty state when no tasks are available.

### Extra Features
- Assign Low, Medium, or High priority.
- Set an optional due date for each task.
- Search tasks by name.

## Technologies Used

- HTML5
- Tailwind CSS v4
- Vanilla JavaScript
- Vite
- Browser localStorage

## User Stories

- As a user, I want to add tasks so I can organize my daily activities.
- As a user, I want to complete and edit tasks so I can manage my progress.
- As a user, I want to delete tasks I no longer need.
- As a user, I want to filter and search tasks to find them easily.
- As a user, I want my tasks to remain saved after refreshing the page.
- As a user, I want to set priorities and due dates to organize important tasks.

## Application State

Each task is represented by an object containing information such as its identifier, task text, completion status, priority, and due date.

Example state shape:

```js
const tasks = [
  {
    id: 1,
    text: "Water the plants",
    completed: false,
    priority: "High",
    dueDate: "2026-10-20"
  }
];
```

This is an example of the data structure, not necessarily the exact variable used in the application.

## How to Run the Project

1. Install Node.js.
2. Open the project folder in VS Code.
3. Open the terminal.
4. Install dependencies:

   ```bash
   npm.cmd install
   ```

5. Start the development server:

   ```bash
   npm.cmd run dev
   ```

6. Open the local URL displayed in the terminal.

## How to Use

1. Enter a task description.
2. Select a priority and, if needed, a due date.
3. Add the task.
4. Mark tasks as completed using the checkbox.
5. Edit or delete tasks as needed.
6. Use the filters and search field to find tasks.
7. Clear completed tasks when appropriate.
8. Refresh the page to verify that tasks persist.

## Screenshots

Add screenshots of the application at mobile and desktop sizes here.

Suggested files:
- `screenshots/mobile-view.png`
- `screenshots/desktop-view.png`

## Challenges and What I Learned

During this project, I practiced building an interactive web application using HTML, Tailwind CSS,