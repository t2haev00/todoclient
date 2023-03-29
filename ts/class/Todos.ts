import { Task } from './Task.js';

// Description: Todos class
class Todos {
    tasks: Array<Task> = []
    #backend_url = ''

    constructor(url: string) {
        this.#backend_url = url
    }


// Get the tasks from the backend
getTasks = async () => {
        return new Promise((resolve, reject) => {
            fetch(this.#backend_url)
                .then(response => response.json())
                .then((response) => {
                    this.#readJson(response)
                    resolve(this.tasks)
                }, (error) => {
                    reject(error)
                })
        }) 
}

// Read the JSON response from the backend
#readJson(tasksAsJson: any): void {
    tasksAsJson.forEach(node => {
        const task = new Task(node.id, node.description)
        this.tasks.push(task)
    })
}

// Add a new item to the array
#addToArray (id: number, text: string){
    const task = new Task(id, text)
    this.tasks.push(task)
    return task
}

// Add a new item to the list
addTask = async (text: string) => {
    return new Promise(async (resolve, reject) => {
        const json = JSON.stringify({description: text})
        fetch(this.#backend_url + '/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        })
        .then(response => response.json())
        .then((response) => {
            resolve(this.#addToArray(response.id, text))
        }), (error) => {
            reject(error)
        }
    })
}

// Remove a task from the array
#removeFromArray (id: number): void {
    const arrayWithoutRemoved = this.tasks.filter(task => task.id !== id)
    this.tasks = arrayWithoutRemoved
}

// Remove a task from the list
removeTask = (id: number) => {
    return new Promise(async (resolve, reject) => {
        fetch(this.#backend_url + '/delete/' + id, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then((response) => {
            this.#removeFromArray(id)
            resolve(response)
        }, (error) => {
            reject(error)
        })
    })
}

}

// Export the class
export { Todos }