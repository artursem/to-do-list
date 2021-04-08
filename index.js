class ToDoList {
    constructor(tasks) {
        if(tasks) {
            this.tasks = tasks;
        } else {
            this.tasks = [];
        };
        this.counter = 0;
    };
    addItems = (e) => {
        e.preventDefault();
        if(itemInput.value==='') {
            alert('please enter value');
        } else {
            let taskContent = itemInput.value;
            let newItem = new ListItem(this.counter, taskContent);

            this.tasks.push(newItem); // update js list

            this.updateDomList();  // update DOM list
            
            itemInput.value = ''; //clear the input form
            this.counter++; // counter up!
        }
    };

    removeAllLis = () => {
        let allLis = [].slice.call(ul.children);
        for (let i in allLis) {
            allLis[i].remove();
        }
    };
    
    removeLi = (li) => {
        const { tasks } = this;
        let selected = tasks.find(el => el.id == li);
        console.log('selected id = ', selected.id)
        // REMOVE FROM JS
        tasks.splice(tasks.indexOf(selected), 1);

        // UPDATE DOM
        this.updateDomList();
    };

    updateDomList = () => {
        // REMOVE ALL LIS @ DOM
        this.removeAllLis();

        // ADD ALL ITEMS
        for (let i in this.tasks) {
            const { tasks } = this;
            let newLi = document.createElement('li');
            let newDiv = document.createElement('div');

            newDiv.innerHTML += tasks[i].checkbox;
            newDiv.innerHTML += tasks[i].taskContent;
            newDiv.innerHTML += tasks[i].trashBtn; 

            newLi.appendChild(newDiv);
            ul.appendChild(newLi);
        };

        // TRASH BUTTONS
        let trashBtnAll = document.querySelectorAll('.trashBtn');
        trashBtnAll.forEach((button) => {
            button.addEventListener('click', () => {
                let selectedID = parseInt(button.id.slice(6));
                this.removeLi(selectedID);
            });
        });
    };
};

class ListItem {
    constructor(id, taskContent) {
        this.id = id;
        this.done = false;
        this.taskContent = `<span id="content-${this.id}">${taskContent}</span>`;
        this.checkbox = `<input type="checkbox" id="checkbox-${this.id}">`;
        this.trashBtn = `<button class="trashBtn" id="trash-${this.id}">${trashIcon}</button>`;
    }
}


const toDo = new ToDoList;

const trashIcon = '<i class="fas fa-trash"></i>';
const ul = document.querySelector('#ul');
const itemInput = document.querySelector('#itemInput');
const submit = document.querySelector('#submit');
submit.addEventListener('click', toDo.addItems);
