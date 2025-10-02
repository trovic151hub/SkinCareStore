function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function setLoggedInUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// Register
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;

    const users = getUsers();

    if (users.some(u => u.email === email)) {
      alert("Email already registered.");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);

    alert("Account created. Please login.");
    window.location.href = "login.html";
  });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid email or password.");
      return;
    }

    setLoggedInUser(user);
    alert(`Welcome, ${user.name}!`);
    window.location.href = "index.html"; // redirect to homepage
  });
}

window.addEventListener("pageshow", function (event) {
  if (event.persisted || (window.performance && performance.navigation.type === 2)) {
    window.location.reload();
  }
});

