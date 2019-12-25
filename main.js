/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

class toDoObject {
     constructor(title, description, dueDate, priority, checklist)
     {
          this.title = title;
          this.description = description;
          this.dueDate = dueDate;
          this.priority = priority;
          this.checklist = checklist || [];
     }

     //add checklist
     addToChecklist(item)
     {
          this.checklist.push({title: item, checked: false});
     }

     //check item by getting data key from card
     checkItem(itemNumber)
     {
         this.checklist[itemNumber].checked = !this.checklist[itemNumber].checked;
     }

     editItem(title, description, dueDate, priority)
     {
          this.title = title;
          this.description = description;
          this.dueDate = dueDate;
          this.priority = priority;
     }

     // remove item by getting data key from card
     removeChecklistItem(keyNumber)
     {
          this.checklist.splice(keyNumber, 1);
     }
}

class Store {
    
     // loads data and presents it for use
     static loadData(){
          let tempData = localStorage.getItem("data");
          if (tempData === null)
          {
               //initialize
               tempData = [];
          }
          else
          {
               //create objects for usable methods
               tempData = JSON.parse(localStorage.getItem("data"));
               for (let i = 0; i < tempData.length; i++)
               {
                    tempData[i] = new toDoObject(tempData[i].title, tempData[i].description, 
                         tempData[i].dueDate, tempData[i].priority, tempData[i].checklist);
               }
          }
          
          return tempData;
     }

     // starts when dom is loaded
     static displayTodos(){
          Store.loadData().forEach((item) =>{
               DOMHandler.insertTodoIntoDOM(item);
          });
     }

     // adds todo to database
     static addTodo(todo){
          const todos = Store.loadData();
          todos.push(todo);
          localStorage.setItem("data", JSON.stringify(todos));
     }

     // adds checklist item to found card in database
     // needs update to key method
     static addChecklistItem(titleIdentifer, item)
     {
          const todos = Store.loadData();
          todos.forEach((todo) => {
               if (todo.title === titleIdentifer)
               {
                    todo.addToChecklist(item);
               }
          });

          localStorage.setItem("data", JSON.stringify(todos));
     }

     // uses key method for card and checklist to inverse current checked value
     static checkChecklistItem(cardNumber, keyNumber)
     {
          const todos = Store.loadData();
          todos[cardNumber].checkItem(keyNumber);
          localStorage.setItem("data", JSON.stringify(todos));
     }

     // uses key method for card and checklist to remove it from database
     static removeChecklistItem(cardNumber, keyNumber)
     {
          const todos = Store.loadData();
          todos[cardNumber].removeChecklistItem(keyNumber);
          localStorage.setItem("data", JSON.stringify(todos));
     }

     static removeItem(cardNumber)
     {
          const todos = Store.loadData();
          todos.splice(cardNumber, 1);
          localStorage.setItem("data", JSON.stringify(todos));
     }

     static editItem(cardNumber, title, description, dueDate, priority){
          const todos = Store.loadData();
          todos[cardNumber].editItem(title, description, dueDate, priority);
          localStorage.setItem("data", JSON.stringify(todos));
     }

     static returnObject(cardNumber)
     {
          const todos = Store.loadData();
          return todos[cardNumber];
     }
     
}

class DOMHandler {

     static clearContainer(){
          container.innerHTML = "";
     }

     static insertTodoIntoDOM(object) {
          const container = document.querySelector("#container");

          //creates card element
          const card = document.createElement("div");
          card.classList.add("card");

          const date = new Date(object.dueDate);

          // inserts title and row to add checklist items
          card.innerHTML = `<div class="top-card"><h2>${object.title}</h2><h3>${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}</h3></div>
          <div class="to-do-card"></div>
          <div class="addRow"><a class="addRowPlus" href="#">
          <i class="fa fa-plus-circle addTodoThing"></i>
          </a></div><svg class="svg-icon" viewBox="0 0 20 20">
          <path fill="none" d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z"></path>
          </svg><a class="x-card" href="#"><img src="./x-button.png"></i></a>`;

          //add event listener for x
          const x = card.querySelector(".x-card");

          x.addEventListener("mouseenter", function(){
                    x.style.opacity = .65;
          })
          x.addEventListener("mouseleave", function(){
               x.style.opacity = 0;
          })
          x.addEventListener("click", function(e){
               let card;
               if (e.target.tagName.toLowerCase() === "img")
               {
                    card = e.target.parentElement.parentElement;
               }
               else
               {
                    card = e.target.parentElement;
               }
               Store.removeItem(parseInt(card.getAttribute("data-key")));
               card.remove();
          });

          //add event listener for svg
          card.querySelector("svg").addEventListener("click", function(e){
               document.querySelector("#checkmarkshape").classList.add("editform");
               let a, card;
               if (e.target.tagName === "path")
               {
                    card = e.target.parentElement.parentElement;
                    a = card.getAttribute("data-key");
               }
               else
               {
                    card = e.target.parentElement;
                    a = card.getAttribute("data-key");
               }
               let object = Store.returnObject(parseInt(a));
               document.querySelector("#namefield").value = object.title;
               document.querySelector("#textfield").value = object.description;
               document.querySelector("#datefield").value = object.dueDate;
               document.querySelector(`#${object.priority}`).checked = true;
               document.querySelector(".form").classList.toggle("hidden");
               card.classList.add("editing-card");
          });

          // generates data-key for card
          let b;
          if(container.children.length > 0)
          {
               b = parseInt(container.lastElementChild.getAttribute("data-key"));
               b++;
          }
          else
          {    
               b = 0;
          }
          card.setAttribute("data-key", b);

          // creates input and adds it to the add-row div
          const input = document.createElement("input");
          input.type = "text";
          input.className = "addRowInput";
          card.querySelector(".addRow").appendChild(input);

          // event listener for x element
          object.checklist.forEach((item) =>{
               this.insertChecklistItemIntoDom(item.title, card.getElementsByTagName('div')[1], item.checked);
          });
          container.appendChild(card);
     }

     static insertChecklistItemIntoDom(thing, toDoListHolder, checked) {
          
          // creates label for checklist item
          const label = document.createElement("label");
          label.classList.add("checkbox-container");
          label.innerHTML = `<input type="checkbox"><span class="checkmark"></span><h3>${thing}</h3>`;

          // generates data key for label
          let b;
          if(toDoListHolder.children.length > 0)
          {
               b = parseInt(toDoListHolder.lastElementChild.getAttribute("data-key"));
               b++;
          }
          else
          {    
               b = 0;
          }
          label.setAttribute("data-key", b);

          // adds input event listener for changing checked value 
          label.querySelector("input").addEventListener("change", function(e){
               Store.checkChecklistItem(parseInt(e.target.parentElement.parentElement.parentElement.getAttribute("data-key")), b);
          });

          // creating x element
          const a = document.createElement("a");
          a.className = "x";
          a.href = "#";
          a.innerHTML = `<i class="fa fa-minus-circle"></i>`;

          // event listeners to fade in and out of mouse hover
          a.addEventListener("mouseenter", function(){
               a.style.opacity = .5;
          });
          a.addEventListener("mouseleave", function(){
               a.style.opacity = 0;
          });

          // event listener when click to update database and remove it from dom
          a.querySelector("i").addEventListener("click", function(e){
               Store.removeChecklistItem(parseInt(e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-key")), b);
               e.target.parentElement.parentElement.remove();
          });
          label.querySelector("input").checked = checked;
          label.appendChild(a);
          toDoListHolder.appendChild(label);
     }

     static clearChecklistValue (eTarget)
     {
          eTarget.parentElement.nextElementSibling.value = "";
     }

     static clearFormValues()
     {
          document.querySelector("#namefield").value = "";
          document.querySelector("#textfield").value = "";;
          document.querySelector("#datefield").value = "1999-01-01";
          document.querySelector("#low").checked = true;
     }
}

// EVENT LISTENERS

//listens for DOM load
document.addEventListener("DOMContentLoaded", Store.displayTodos);

//toggles away hidden form for submitting new todos
document.querySelector(".plusbutton").addEventListener("click", function(e) {
     let form = document.querySelector(".form");
     document.querySelector("#checkmarkshape").classList.remove("editform");
     form.classList.toggle("hidden");
});

//gets rid of form if clicked outside of form screen
document.querySelector(".form").addEventListener("click", function(e) {
     let form = document.querySelector("form");
     if (!form.classList.contains("hidden"))
     {
          if(!form.contains(e.target))
          {
               document.querySelector(".form").classList.add("hidden");
               DOMHandler.clearFormValues();
               if (document.querySelector(".editing-card") !== null)
               {
                    document.querySelector(".editing-card").classList.remove("editing-card");
               }
          }
     }
});

// gathers inputs from form and submits it into dabase
document.querySelector("form").addEventListener("submit", function(e){
     e.preventDefault();

     //declaration of variables
     const title = document.querySelector("#namefield").value,
           description = document.querySelector("#textfield").value,
           date = document.querySelector("#datefield").value;
     const priority = document.querySelector("input.radio:checked").value;
     

     // editting values in todos and updating card

     if (document.querySelector(".editing-card") !== null && document.querySelector("#checkmarkshape").classList.contains("editform"))
     {
         const card = document.querySelector(".editing-card");
         const keyValue = card.getAttribute("data-key");
         Store.editItem(keyValue, title, description, date, priority);
         card.firstChild.firstChild.textContent = title;

         let formattedDate = new Date(date);
         card.firstChild.lastChild.textContent = `${formattedDate.getUTCMonth() + 1}/${formattedDate.getUTCDate()}/${formattedDate.getUTCFullYear()}`;
         card.classList.remove("editing-card");
     }
     else
     {
     // creation and storing and dom inserting of object
     const todoObject = new toDoObject(title, description, date, priority);
     Store.addTodo(todoObject);
     DOMHandler.insertTodoIntoDOM(todoObject);
     }
     document.querySelector(".form").classList.add("hidden");
     DOMHandler.clearFormValues();
});

document.querySelector("#container").addEventListener("click", function(e){
     if(e.target.classList.contains("addTodoThing"))
     {
         DOMHandler.insertChecklistItemIntoDom(e.target.parentElement.nextElementSibling.value, e.target.parentElement.parentElement.previousElementSibling, false);
         
         // find title, add checklist
         Store.addChecklistItem(e.target.parentElement.parentElement.parentElement.firstChild.firstChild.textContent, 
         e.target.parentElement.nextElementSibling.value);

         DOMHandler.clearChecklistValue(e.target);
     }
});

/***/ })

/******/ });