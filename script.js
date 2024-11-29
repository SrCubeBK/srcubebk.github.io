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
      // Redirigir al panel principal
      window.location.href = "dashboard.html";
    } else {
      alert("ID o contraseña incorrectos");
    }
  });

  // Simulación de datos del usuario tras iniciar sesión
const loggedUser = { id: "11101", name: "María" };

// Asignar datos al perfil
document.getElementById("userID").textContent = loggedUser.id;
document.getElementById("userName").textContent = loggedUser.name;

// Funcionalidad del botón de cerrar sesión
document.querySelector(".btn-logout").addEventListener("click", () => {
  alert("Has cerrado sesión");
  window.location.href = "index.html"; // Redirige a la página de inicio de sesión
});

// Configuración futura
document.querySelector(".btn-config").addEventListener("click", () => {
  alert("Función de configuración en desarrollo.");
});
