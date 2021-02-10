class UI {
    constructor() {
        this.post = document.querySelector("#posts");
        this.titleInput = document.querySelector("#title");
        this.bodyInput = document.querySelector("#body");
        this.idInput = document.querySelector("#id");
        this.postSubmit = document.querySelector(".post-submit");
        this.forState = "add";
    }

    showPost(posts) {
        let output = "";
        posts.forEach((post) => {
            output += `
            <div class="card mb-3">
                <div class="card-body">
                <h4 class="card-title">${post.title}</h4>
                <p class="card-text">${post.body}</p>
                <a href="#" class="edit card-link" data-id="${post.id}">
                    <i class="fa fa-pencil"></i>
                </a>
    
                <a href="#" class="delete card-link" data-id="${post.id}">
                <i class="fa fa-remove"></i>
                </a>
                </div>
            </div>
            `;
            this.post.innerHTML = output;
        });
    }

    showAlerts(message, className) {
        this.clearAlerts();
        // create div
        const div = document.createElement("div");
        div.className = className;
        div.appendChild(document.createTextNode(message));
        // get parent
        const container = document.querySelector(".postsContainer");
        // get posts
        const post = document.querySelector("#posts");
        // insert div befor posts
        container.insertBefore(div, post);

        // clear alert after 3s
        setTimeout(() => {
            this.clearAlerts();
        }, 3000);
    }

    clearAlerts() {
        const currentAlerts = document.querySelector(".alert");
        if (currentAlerts) {
            currentAlerts.remove();
        }
    }

    clearFields() {
        this.titleInput.value = "";
        this.bodyInput.value = "";
    }

    clearIdInput() {
        this.idInput.value = "";
    }

    editData(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;
        this.editBtn("edit");
    }
    editBtn(btnType) {
        if (btnType === "edit") {
            this.postSubmit.textContent = "update";
            this.postSubmit.className = "post-submit btn btn-warning btn-block";
            //  add cancle btn
            const btn = document.createElement("button");
            btn.className = "post-cancle btn btn-light btn-block";
            btn.appendChild(document.createTextNode("cancle"));
            // get parent
            const cardForm = document.querySelector(".card-form");
            // get insert before element
            const formEnd = document.querySelector(".form-end");
            cardForm.insertBefore(btn, formEnd);
        } else {
            this.postSubmit.textContent = "Post it";
            this.postSubmit.className = "post-submit btn btn-primary btn-block";

            // remove cancle btn
            if (document.querySelector(".post-cancle")) {
                document.querySelector(".post-cancle").remove();
            }

            // clear fields
            this.clearFields();
            // clear inputId
            this.clearIdInput();
        }
    }
}

export const ui = new UI();