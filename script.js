const messageEl = document.getElementById("message");

function showMessage(text, type = "success") {
  messageEl.textContent = text;
  messageEl.className = type;
}

function showError(error) {
  showMessage(error.message, "error");
}

async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error("Помилка завантаження користувачів");
    }

    const users = await response.json();
    const list = document.getElementById("usersList");
    list.innerHTML = "";

    users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.id}. ${user.name} (${user.email})`;
      list.appendChild(li);
    });

    showMessage("Користувачів завантажено");
  } catch (error) {
    showError(error);
  }
}

document.getElementById("createForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const postData = {
    title: document.getElementById("title").value,
    body: document.getElementById("body").value,
    userId: document.getElementById("userId").value
  };

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error("Помилка створення поста");
    } 

    const data = await response.json();
    showMessage(`Пост створено з ID: ${data.id}`);
  } catch (error) {
    showError(error);
  }
});

document.getElementById("updateForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("updateId").value;

  const updatedData = {
    title: document.getElementById("updateTitle").value,
    body: document.getElementById("updateBody").value
  };

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
      throw new Error("Помилка оновлення поста");
    } 

    const data = await response.json();
    showMessage(`Пост ${data.id} оновлено`);
  } catch (error) {
    showError(error);
  }
});

async function deletePost() {
  const id = document.getElementById("deleteId").value;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Помилка видалення поста");
    }
    
    showMessage(`Пост ${id} видалено`);
  } catch (error) {
    showError(error);
  }
}