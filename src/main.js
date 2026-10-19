
import './style.css'

document.querySelector('#app').innerHTML = `
  <main class="min-h-screen bg-cream px-4 py-10 text-earth sm:px-8">
    <section class="mx-auto max-w-3xl">
      <header class="mb-8 text-center">
        <p class="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-sage-dark">
          Your daily growth
        </p>
        <h1 class="mb-3 text-4xl font-bold sm:text-5xl">Nature Planner</h1>
        <p class="text-earth/70">Small steps today, beautiful progress tomorrow.</p>
      </header>

      <section class="rounded-3xl border border-leaf bg-white p-5 shadow-sm sm:p-8">
        <form id="task-form" class="flex flex-col gap-3">
          <input
            id="task-input"
            type="text"
            placeholder="What would you like to accomplish?"
            aria-label="New task"
            class="w-full rounded-xl border border-leaf bg-cream px-4 py-3 outline-none focus:border-sage"
          />

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <select id="task-priority" aria-label="Task priority"
              class="rounded-xl border border-leaf bg-cream px-4 py-3">
              <option value="Low">Low priority</option>
              <option value="Medium" selected>Medium priority</option>
              <option value="High">High priority</option>
            </select>

            <input id="task-due-date" type="date" aria-label="Task due date"
              class="rounded-xl border border-leaf bg-cream px-4 py-3" />
          </div>

          <button type="submit"
            class="rounded-xl bg-sage px-6 py-3 font-semibold text-white transition hover:bg-sage-dark">
            + Add task
          </button>
        </form>

        <p id="form-message" class="mt-2 text-sm text-red-700" role="alert"></p>

        <div class="mt-7 flex flex-wrap items-center justify-between gap-3">
          <h2 class="text-xl font-bold">My tasks</h2>
          <p class="text-sm text-earth/70"><span id="task-count">0 tasks remaining</span></p>
        </div>

        <div class="mt-4 flex flex-wrap gap-2" aria-label="Filter tasks">
          <button type="button" data-filter="all"
            class="rounded-full bg-sage px-4 py-2 text-sm font-semibold text-white">All</button>
          <button type="button" data-filter="active"
            class="rounded-full border border-leaf px-4 py-2 text-sm">Active</button>
          <button type="button" data-filter="completed"
            class="rounded-full border border-leaf px-4 py-2 text-sm">Completed</button>
        </div>

        <input id="task-search" type="search"
          placeholder="Search your tasks..." aria-label="Search tasks"
          class="mt-5 w-full rounded-xl border border-leaf bg-cream px-4 py-3 outline-none focus:border-sage" />

        <ul id="task-list" class="mt-4 space-y-3"></ul>

        <div id="empty-state" class="py-10 text-center">
          <p class="mb-3 text-4xl" aria-hidden="true">🌱</p>
          <p id="empty-message" class="font-semibold">Your garden is ready to grow!</p>
          <p class="mt-1 text-sm text-earth/70">Add your first task to get started.</p>
        </div>

        <div class="mt-5 flex justify-end border-t border-leaf pt-4">
          <button id="clear-completed" type="button"
            class="text-sm font-semibold text-sage-dark hover:underline">Clear completed</button>
        </div>
      </section>

      <footer class="mt-6 text-center text-sm text-earth/60">
        Made with care, one task at a time. 🌿
      </footer>
    </section>
  </main>
`

const taskForm = document.querySelector('#task-form')
const taskInput = document.querySelector('#task-input')
const priorityInput = document.querySelector('#task-priority')
const dueDateInput = document.querySelector('#task-due-date')
const taskSearch = document.querySelector('#task-search')
const taskList = document.querySelector('#task-list')
const taskCount = document.querySelector('#task-count')
const emptyState = document.querySelector('#empty-state')
const emptyMessage = document.querySelector('#empty-message')
const formMessage = document.querySelector('#form-message')
const clearCompletedButton = document.querySelector('#clear-completed')
const filterButtons = document.querySelectorAll('[data-filter]')

let tasks = []

try {
  const savedTasks = localStorage.getItem('naturePlannerTasks')
  const parsedTasks = savedTasks ? JSON.parse(savedTasks) : []
  tasks = Array.isArray(parsedTasks) ? parsedTasks : []
} catch {
  tasks = []
}

let currentFilter = 'all'
let searchText = ''
// Saves the current tasks to browser localStorage.
function saveTasks() {
  try {
    localStorage.setItem('naturePlannerTasks', JSON.stringify(tasks))
  } catch {
    formMessage.textContent = 'Could not save tasks in this browser.'
  }
}
// Creates a reusable button with the given label and CSS classes.
function makeButton(label, extraClasses = '') {
  const button = document.createElement('button')
  button.type = 'button'
  button.textContent = label
  button.className =
    `rounded-lg border border-leaf px-3 py-2 text-sm hover:bg-leaf ${extraClasses}`
  return button
}

// Updates the task list, counter, empty state, and active filter.
function renderTasks() {
  taskList.innerHTML = ''

  const visibleTasks = tasks.filter((task) => {
    const matchesFilter =
      currentFilter === 'all' ||
      (currentFilter === 'active' && !task.completed) ||
      (currentFilter === 'completed' && task.completed)

    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchText.toLowerCase())

    return matchesFilter && matchesSearch
  })

  visibleTasks.forEach((task) => {
    const li = document.createElement('li')
    li.className =
      'flex flex-wrap items-center gap-3 rounded-xl border border-leaf bg-cream p-4'

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = task.completed
    checkbox.setAttribute('aria-label', `Complete ${task.text}`)
    checkbox.className = 'h-5 w-5 accent-sage'

    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked
      saveTasks()
      renderTasks()
    })

    const details = document.createElement('div')
    details.className = 'min-w-0 flex-1'

    const taskText = document.createElement('p')
    taskText.textContent = task.text
    taskText.className = 'break-words font-medium'

    if (task.completed) {
      taskText.classList.add('line-through', 'opacity-60')
    }

    const metadata = document.createElement('p')
    metadata.className = 'mt-1 text-xs text-earth/70'

    const priority = task.priority || 'Medium'
    const dueDate = task.dueDate
      ? ` • Due: ${new Date(task.dueDate + 'T00:00:00').toLocaleDateString()}`
      : ''

    metadata.textContent = `${priority} priority${dueDate}`
    details.append(taskText, metadata)

    const editButton = makeButton('Edit')

    editButton.addEventListener('click', () => {
      const editInput = document.createElement('input')
      editInput.type = 'text'
      editInput.value = task.text
      editInput.setAttribute('aria-label', 'Edit task')
      editInput.className =
        'w-full rounded-lg border border-leaf bg-white px-3 py-2 outline-none focus:border-sage'

      const saveButton = makeButton('Save')
      const cancelButton = makeButton('Cancel')

      taskText.replaceWith(editInput)
      editButton.replaceWith(saveButton)
      saveButton.after(cancelButton)
      editInput.focus()

      saveButton.addEventListener('click', () => {
        const newText = editInput.value.trim()

        if (!newText) {
          formMessage.textContent = 'A task cannot be empty.'
          editInput.focus()
          return
        }

        task.text = newText
        formMessage.textContent = ''
        saveTasks()
        renderTasks()
      })

      cancelButton.addEventListener('click', () => {
        renderTasks()
      })

      editInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') saveButton.click()
        if (event.key === 'Escape') cancelButton.click()
      })
    })
// Removes completed tasks after user confirmation.
    const deleteButton = makeButton(
      'Delete',
      'border-red-200 text-red-700 hover:bg-red-50'
    )

    deleteButton.addEventListener('click', () => {
      const confirmed = window.confirm(
        `Are you sure you want to delete "${task.text}"?`
      )

      if (confirmed) {
        tasks = tasks.filter((item) => item.id !== task.id)
        saveTasks()
        renderTasks()
      }
    })

    li.append(checkbox, details, editButton, deleteButton)
    taskList.appendChild(li)
  })
// Handles clicks on the task filter buttons.
  const remaining = tasks.filter((task) => !task.completed).length
  taskCount.textContent =
    `${remaining} task${remaining === 1 ? '' : 's'} remaining`

  emptyState.classList.toggle('hidden', visibleTasks.length > 0)

  if (visibleTasks.length > 0) {
    emptyMessage.textContent = ''
  } else if (searchText) {
    emptyMessage.textContent = 'No tasks match your search.'
  } else if (currentFilter === 'active') {
    emptyMessage.textContent = 'No active tasks!'
  } else if (currentFilter === 'completed') {
    emptyMessage.textContent = 'No completed tasks yet!'
  } else {
    emptyMessage.textContent = 'Your garden is ready to grow!'
  }

 // Updates filter styling and announces the selected filter to assistive technology.
filterButtons.forEach((button) => {
  const selected = button.dataset.filter === currentFilter

  button.setAttribute('aria-pressed', String(selected))

  button.className = selected
    ? 'rounded-full bg-sage px-4 py-2 text-sm font-semibold text-white'
    : 'rounded-full border border-leaf px-4 py-2 text-sm hover:bg-leaf'
})
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const text = taskInput.value.trim()

  if (!text) {
    formMessage.textContent = 'Please enter a task before adding it.'
    taskInput.focus()
    return
  }

  tasks.push({
    id: `${Date.now()}-${Math.random()}`,
    text,
    completed: false,
    priority: priorityInput.value,
    dueDate: dueDateInput.value,
  })

  saveTasks()
  formMessage.textContent = ''
  taskInput.value = ''
  dueDateInput.value = ''
  priorityInput.value = 'Medium'
  currentFilter = 'all'
  searchText = ''
  taskSearch.value = ''

  renderTasks()
  taskInput.focus()
})

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter
    renderTasks()
  })
})

taskSearch.addEventListener('input', () => {
  searchText = taskSearch.value.trim()
  renderTasks()
})

clearCompletedButton.addEventListener('click', () => {
  const completedCount = tasks.filter((task) => task.completed).length

  if (completedCount === 0) {
    formMessage.textContent = 'There are no completed tasks to clear.'
    return
  }

  const confirmed = window.confirm(
    `Clear all ${completedCount} completed task(s)?`
  )

  if (confirmed) {
    tasks = tasks.filter((task) => !task.completed)
    formMessage.textContent = ''
    saveTasks()
    renderTasks()
  }
})

renderTasks()
