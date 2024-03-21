import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, push, set, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { createUserWithEmailAndPassword, getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDqT6KtHi5_OFVgl9z2gZjB0UqkUJRuuD0",
    authDomain: "todoapp-fb3f5.firebaseapp.com",
    databaseURL: "https://todoapp-fb3f5-default-rtdb.firebaseio.com",
    projectId: "todoapp-fb3f5",
    storageBucket: "todoapp-fb3f5.appspot.com",
    messagingSenderId: "150903451948",
    appId: "1:150903451948:web:cc650efd52b12433097c89",
    measurementId: "G-HBY8EQCWG6"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth();


var input = document.getElementById('inpt')
var list = document.getElementById('list1')
var userId = localStorage.getItem('userid')


let refrence = ref(db, `user/${userId}/userinput/`);

onValue(refrence, function (data) {
    list.innerHTML = "";
    let inptData = data.val();
    console.log(Object.values(inptData));
    for (let i = 0; i < Object.values(inptData).length; i++) {
        let b = Object.values(inptData)[i].id
        let createLi = document.createElement("li");
        createLi.setAttribute("data-id", b);
        let text = document.createTextNode(Object.values(inptData)[i].value);
        createLi.appendChild(text);
        list.appendChild(createLi);

        // Edit button
        let creatEditBtn = document.createElement("button");
        creatEditBtn.setAttribute("onclick", "edit(this)");
        creatEditBtn.setAttribute("class", "list-btn1");
        let editBtnTxt = document.createTextNode("Edit");
        creatEditBtn.appendChild(editBtnTxt);
        createLi.appendChild(creatEditBtn);

        // Delete button
        let creatDeleteBtn = document.createElement("button");
        creatDeleteBtn.setAttribute("onclick", "deleteText(this)");
        // creatDeleteBtn.setAttribute("id", b)
        creatDeleteBtn.setAttribute("class", "list-btn");
        let deleteBtnTxt = document.createTextNode("Delete");
        creatDeleteBtn.appendChild(deleteBtnTxt);
        createLi.appendChild(creatDeleteBtn);
    }
});

window.addList = function () {
    if (input.value === "") {
        alert("Input Field is required");
        return;
    }
    
    let obj1 = {
        value: input.value
    };

    let newItemRef = push(ref(db, `user/${userId}/userinput/`));
    let newItemKey = newItemRef.key;
    obj1.id = newItemKey;
    set(newItemRef, obj1).then(function() {
        input.value = "";
    }).catch(function(error) {
        console.error("Error adding item to the database: ", error);
    });
}


window.edit = function(a) {
    let b = prompt("Enter Updated Text");
    let id = a.parentNode.getAttribute("data-id");
    let itemRef = ref(db, `user/${userId}/userinput/${id}`);
    
    set(itemRef, { id: id, value: b }).then(function() {
        a.parentNode.firstChild.nodeValue = b;
    }).catch(function(error) {
        console.error("Error editing item in the database: ", error);
    });
}



window.deleteText = function(e) {
    let id1 = e.parentNode.getAttribute("data-id");
    let itemRef = ref(db, `user/${userId}/userinput/${id1}`);
    set(itemRef, null)
    .then(function() {
        e.parentNode.remove();
    })
    .catch(function(error) {
        console.log("Error deleting item from the database: ", error);
    });
}


window.deltAll = function () {
    let alItemRef = ref(db,`user/`)
    set(alItemRef,null)
    document.getElementById('list1').innerHTML = "" 
} 




