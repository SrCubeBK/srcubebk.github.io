document.addEventListener("DOMContentLoaded", () => {
    // Recupera el usuario actual del almacenamiento local
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
    if (currentUser) {
      // Asigna los datos del usuario al perfil
      document.getElementById("userID").textContent = currentUser.id;
      document.getElementById("userName").textContent = currentUser.name;
    } else {
      alert("No se encontró un usuario autenticado.");
      window.location.href = "index.html"; // Redirige al inicio de sesión si no hay usuario
    }
  
    // Funcionalidad del botón de cerrar sesión
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        alert("Has cerrado sesión");
        localStorage.removeItem("currentUser"); // Limpia el usuario actual
        window.location.href = "index.html"; // Redirige al inicio de sesión
      });
    }
  
    // Configuración futura
    const configButton = document.querySelector(".btn-config");
    if (configButton) {
      configButton.addEventListener("click", () => {
        alert("Función de configuración en desarrollo.");
      });
    }
  
    // Datos simulados
    const groups = [
      { id: 1, name: "Grupo A" },
      { id: 2, name: "Grupo B" },
      { id: 3, name: "Grupo C" },
    ];
  
    const students = {
      1: [
        { name: "Estudiante 1", status: "Aprobado" },
        { name: "Estudiante 2", status: "En riesgo" },
      ],
      2: [
        { name: "Estudiante 3", status: "Aprobado" },
        { name: "Estudiante 4", status: "En riesgo" },
      ],
      3: [
        { name: "Estudiante 5", status: "Aprobado" },
        { name: "Estudiante 6", status: "En riesgo" },
      ],
    };
  
    const alerts = [
      "Estudiante 2 está en riesgo",
      "Estudiante 4 está en riesgo",
    ];
  
    // Mostrar grupos en el menú 1
    const groupList = document.getElementById("groupList");
    groups.forEach(group => {
      const button = document.createElement("button");
      button.textContent = group.name;
      button.addEventListener("click", () => selectGroup(group.id));
      groupList.appendChild(button);
    });
  
    // Función para seleccionar un grupo
    function selectGroup(groupId) {
      document.getElementById("menu1").style.display = "none";
      document.getElementById("menu2").style.display = "block";
  
      // Mostrar resumen de estudiantes
      const studentSummary = document.getElementById("studentSummary");
      studentSummary.innerHTML = ""; // Limpiar lista anterior
      students[groupId].forEach(student => {
        const listItem = document.createElement("li");
        listItem.textContent = `${student.name} - ${student.status}`;
        studentSummary.appendChild(listItem);
      });
  
      // Mostrar alertas activas
      const activeAlerts = document.getElementById("activeAlerts");
      activeAlerts.innerHTML = ""; // Limpiar lista anterior
      alerts.forEach(alert => {
        const listItem = document.createElement("li");
        listItem.textContent = alert;
        activeAlerts.appendChild(listItem);
      });
  
      // Funcionalidad de botones
      document.getElementById("calculateAverage").addEventListener("click", () => {
        alert("Cálculo de promedio en desarrollo.");
      });
  
      document.getElementById("generateReport").addEventListener("click", () => {
        alert("Generación de reporte en desarrollo.");
      });
  
      // Funcionalidad del botón para regresar a grupos
      const backToGroupsButton = document.getElementById("backToGroups");
      backToGroupsButton.addEventListener("click", () => {
        document.getElementById("menu2").style.display = "none";
        document.getElementById("menu1").style.display = "block";
      });
    }
  });
  