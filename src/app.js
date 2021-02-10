import { http } from "./http";
import { ui } from "./ui";

// get post on domLoad
document.addEventListener("DOMContentLoaded", getPosts);

// submit the posts
document.querySelector(".post-submit").addEventListener("click", getSubmit);

// delete and edit posts
document.querySelector("#posts").addEventListener("click", actionOnPost);

// cancle btn
document.querySelector(".card-form").addEventListener("click", cancleBtn);

// defining the function for particular events

// getpost function
function getPosts() {
    http
        .get("http://localhost:3000/posts")
        .then((data) => ui.showPost(data))
        .catch((err) => console.log(err));
    // console.log("post has been posted");
}

// getSubmit function
function getSubmit() {
    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;
    const id = document.querySelector("#id").value;

    const data = {
        title,
        body,
    };

    if (title === "" || body === "") {
        ui.showAlerts("please fill all details", "alert alert-danger");
    } else {
        if (id === "") {
            http
                .post("http://localhost:3000/posts", data)
                .then((data) => {
                    ui.showAlerts("post succesfully posted", "alert alert-success");
                    ui.clearFields();
                    getPosts();
                })
                .catch((err) => console.log(err - "error in get submit"));
        } else {
            http
                .put(`http://localhost:3000/posts/${id}`, data)
                .then((data) => {
                    ui.showAlerts("post succesfully updated", "alert alert-success");
                    ui.editBtn("add");
                    getPosts();
                })
                .catch((err) => console.log(err - "error in get submit"));
        }

        // console.log("post has been updated");
    }
}

// delete posts
function actionOnPost(e) {
    const id = e.target.parentElement.dataset.id;
    if (e.target.parentElement.classList.contains("delete")) {
        const id = e.target.parentElement.dataset.id;

        if (confirm("Are you sure bro")) {
            http
                .delete(`http://localhost:3000/posts/${id}`)
                .then((data) => {
                    ui.showAlerts("post succesfully deleted", "alert alert-success");
                    getPosts();
                })
                .catch((err) => console.log(err));
        }
    } else if (e.target.parentElement.classList.contains("edit")) {
        const title =
            e.target.parentElement.previousElementSibling.previousElementSibling
            .textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;
        // console.log(title);
        // console.log(body);
        const data = {
            title,
            body,
            id,
        };
        ui.editData(data);
    }
    e.preventDefault();
}

function cancleBtn(e) {
    if (e.target.classList.contains("post-cancle")) {
        ui.editBtn("n");
        e.preventDefault();
    }
}

//
// const greeting = "Hello World";
// console.log(greeting);
// const getData = async (url) => {
//   const response = await fetch(url);
//   const result = await response.json();
//   console.log(result);
// };
// getData('https://jsonplaceholder.typicode.com/posts');