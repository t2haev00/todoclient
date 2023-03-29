const BACKEND_ROOT_URL = 'https://todo-backend-v2cp.onrender.com'

// Import the classes
import { Task } from './class/Task.js'
import { Todos } from './class/Todos.js'

// Create a new instance of the Todos class
const todos = new Todos(BACKEND_ROOT_URL)

// Get the list and input field
const list = <HTMLUListElement>document.querySelector('#todolist')
const input = <HTMLInputElement>document.querySelector('#newtodo')

// Disable the input field
input.disabled = true

// Change the getTasks function / replace  fetch function

todos.getTasks().then((tasks: Array<Task>) => {
    tasks.forEach(task => {
        renderTask(task)
    })
    input.disabled = false
}) .catch(error => {
    alert(error)
});

// Get the tasks from the backend / fetch function replaced by getTasks function
/*fetch(BACKEND_ROOT_URL)
    .then(response => response.json())
    .then((response) => {
        response.forEach(node => {
            renderTask(node.description)
        })
        input.disabled = false
    }, (error) => {
        alert(error)
    })
*/

// Add a new item to the list
input.addEventListener('keypress', event => {
    if (event.key === "Enter") {
        const text = input.value.trim()
        if (text !== '') {
            todos.addTask(text).then((task) => {
               input.value = ''
               input.focus()
                renderTask(<Task>task)
            })
        }
        event.preventDefault()
    }
})

/*
input.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        event.preventDefault()
        const text = input.value.trim()
        if (text !== '') {
            const list_item = document.createElement('li')
            list_item.innerHTML = text
            list_item.setAttribute('class','list-group-item')
            list.append(list_item)
            input.value = ''
        }
    }
})
*/
/*
// Add a new item to the list
input.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        event.preventDefault()
        const text = input.value.trim()
        if (text !== '') {
            renderTask(text)
            input.value = ''
        }
    }
})
*/ 
/*
// Add a new item to the list
input.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        event.preventDefault()
        const text = input.value.trim()
        if (text !== '') {
          const json = JSON.stringify({description: text})
            fetch(BACKEND_ROOT_URL + 'new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
            .then(response => response.json())
            .then((response) => {
                renderTask(response.description)
                input.value = ''
            }, (error) => {
                alert(error)
            })
        }
    }
})
*/

// Render a task

/*
const renderTask = (text: string) => {
    const list_item = document.createElement('li')
    list_item.setAttribute('class','list-group-item')
    list_item.innerHTML = text
    list.append(list_item)
}
*/

// Change parameter for renderTask function
/* const renderTask = (task: Task) => {
    const list_item = document.createElement('li')
    list_item.setAttribute('class','list-group-item')
    list_item.innerHTML = task.text
    list.append(list_item)
} */

// 

const renderTask = (task: Task) => {
    const list_item: HTMLLIElement = document.createElement('li')
    list_item.setAttribute('class','list-group-item')
    list_item.setAttribute('data-key', task.id.toString())
    renderSpan(list_item, task.text)
    renderLink(list_item, task.id)

    list.append(list_item)
}

const renderSpan = (list_item: HTMLLIElement, text: string) => {
    const span = list_item.appendChild(document.createElement('span'))
    span.innerHTML = text
}

const renderLink = (list_item: HTMLLIElement, id: number) => {
    const link = list_item.appendChild(document.createElement('a'))
    link.innerHTML ='<i class="bi bi-trash"></i>'
    link.setAttribute('style','float: right;')
    link.addEventListener('click', event => {
        todos.removeTask(id).then((id) => {
            const elementToRemove: HTMLElement = document.querySelector(`[data-key='${id}']`)
            if (elementToRemove) {
                list.removeChild(elementToRemove)
            }
        }).catch(error => {
            alert(error)
        })
    })
}


