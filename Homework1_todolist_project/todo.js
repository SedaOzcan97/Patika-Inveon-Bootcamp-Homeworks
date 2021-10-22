//Tüm elementleri seçme

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListener();

function eventListener(){//tüm event listener
    
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            //bulamadı
            listItem.setAttribute("style", "display: none !important");

        }
        else {
            listItem.setAttribute("style", "display : block");
        }

    });

}
function clearAllTodos(e){
    //aratüzden todoları kaldır
    if (confirm("Tümünü silmek istediğinize emin misiniz?")){
        //arayüzden todoları temizle
        //todoList.innerHTML =" ";//YAVAŞ YÖNTEM


        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);

        }

        localStorage.removeItem("todos");

    }
}
function deleteTodo(e){
    if(e.target.className === 'fa fa-remove'){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo başarıyla silindi...");
    }
}
function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1); //arraydan değeri sil

        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));


}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function addTodo(e){
    const newTodo = todoInput.value.trim();
    if(newTodo === ""){
        /*                     <div class="alert alert-danger" role="alert">
                        This is a danger alert—check it out!
                      </div> */
        showAlert("danger", "Lütfen bir todo girin");// success yeşil danger kırmızı 
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "to do başarıyla eklendi");

    }

    //console.log(newTodo); 
    e.preventDefault();
}

function getTodosFromStorage(newTodo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos =[];

    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));


}
function showAlert(type, message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    firstCardBody.appendChild(alert);
    //set time out methodu
    setTimeout(function(){
        alert.remove();
    }, 3000);



}
function addTodoToUI(newTodo){//String değerini list item olarak UI' ya ekleyecek

    /*<li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>*/

       // list item oluşturma                 

       const listItem = document.createElement("li");

       //link oluşturma
       const link = document.createElement("a");
       link.href ="#";
       link.className = "delete-item";
       link.innerHTML = "<i class = 'fa fa-remove'></i>";

       listItem.className = "list-group-item d-flex justify-content-between";

       //text node ekleme

       listItem.appendChild(document.createTextNode(newTodo));
       listItem.appendChild(link);
       
       //todo list e list item ekleme
       todoList.appendChild(listItem);
       


       //console.log(listItem);                 
} 