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
        if(itemInput.value==false) {
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
        let selected = this.tasks.find(val => val.id === li);
        // console.log(selected.id);

        // REMOVE FROM JS
        this.tasks.splice(selected.id, 1);

        // UPDATE DOM
        this.updateDomList();
    };

    updateDomList = () => {
        // REMOVE ALL LIS @ DOM
        this.removeAllLis();

        // ADD ALL ITEMS
        for (let i in this.tasks) {
            let newLi = document.createElement('li');
            let newDiv = document.createElement('div');

            newDiv.innerHTML += `<input type="checkbox" id="check${i}">`; // checked
            newDiv.innerHTML += this.tasks[i].taskContent;
            newDiv.innerHTML += `<button class="trashBtn" id="trash${i}">${trashIcon}</button>`;

            newLi.appendChild(newDiv);
            ul.appendChild(newLi);
        };

        // TRASH BUTTONS
        let trashBtnAll = document.querySelectorAll('.trashBtn');
        trashBtnAll.forEach((button, nr) => {
            button.addEventListener('click', () => {
                console.log('clicked ', nr);
                
                this.removeLi(nr);
            });
        });
    };
};

class ListItem {
    constructor(id, taskContent) {
        this.id = id;
        this.done = false;
        this.taskContent = taskContent;
    }
}


const toDo = new ToDoList;

const trashIcon = '<i class="fas fa-trash"></i>';
const ul = document.querySelector('#ul');
const itemInput = document.querySelector('#itemInput');
const submit = document.querySelector('#submit');
submit.addEventListener('click', toDo.addItems);
