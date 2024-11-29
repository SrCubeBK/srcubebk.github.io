document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const userID = document.getElementById("userID").value;
  const password = document.getElementById("password").value;

  // Lista de usuarios válidos
  const users = [
    { id: "11101", password: "111111", name: "María" },
    { id: "11102", password: "111112", name: "Carlos" },
    { id: "11103", password: "111113", name: "Ana" },
  ];

  // Validación
  const user = users.find((u) => u.id === userID && u.password === password);

  if (user) {
    alert(`Inicio de sesión exitoso. Bienvenido, ${user.name}!`);
    
    // Almacenar el usuario autenticado en el localStorage
    localStorage.setItem("currentUser", JSON.stringify(user));
    
    // Redirigir al panel principal
    window.location.href = "dashboard.html";
  } else {
    alert("ID o contraseña incorrectos");
  }
});
