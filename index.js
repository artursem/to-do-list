class ToDoList {
    constructor(tasks) {
        if(tasks) {
            this.tasks = tasks;
        } else {
            this.tasks = [];
        };
    };
    addItems = (e) => {
        e.preventDefault();
        if(itemInput.value==false) {
            alert('please enter value');
        } else {
            this.tasks.push(itemInput.value);
            this.updateList();
            itemInput.value = '';
        }
    };
    updateList = () => {
        let newLi = document.createElement('li');
        let newDiv = document.createElement('div');
        
        newDiv.innerHTML += `<input type="checkbox">`;
        newDiv.innerHTML += itemInput.value;
        newDiv.innerHTML += `<button>x</button>`;


        newLi.appendChild(newDiv);
        ul.appendChild(newLi);
        console.log(this.tasks);
    }

}

const toDo = new ToDoList;

const ul = document.querySelector('#ul');
const itemInput = document.querySelector('#itemInput');
const submit = document.querySelector('#submit');
submit.addEventListener('click', toDo.addItems);
