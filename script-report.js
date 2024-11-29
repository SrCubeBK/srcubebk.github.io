document.addEventListener("DOMContentLoaded", () => {
    const classGroupSelect = document.getElementById("classGroup");
    const studentNameFilterSelect = document.getElementById("studentNameFilter");
    const reportTableBody = document.getElementById("reportTable").getElementsByTagName("tbody")[0];
  
    // Simulación de datos
    const classes = ["Clase A", "Clase B", "Clase C"];
    const studentsByClass = {
      "Clase A": [
        { name: "Fernanda Garza", globalPerformance: 8.5, reportDate: "2024-11-30", average: 8.5 },
        { name: "Jose Cruz", globalPerformance: 6.2, reportDate: "2024-11-30", average: 6.2 }
      ],
      "Clase B": [
        { name: "Diana Diaz", globalPerformance: 9.1, reportDate: "2024-11-30", average: 9.1 },
        { name: "Ricardo Lopez", globalPerformance: 7.3, reportDate: "2024-11-30", average: 7.3 }
      ],
      "Clase C": [
        { name: "Maria Sanchez", globalPerformance: 7.8, reportDate: "2024-11-30", average: 7.8 },
        { name: "Carlos Hernandez", globalPerformance: 8.2, reportDate: "2024-11-30", average: 8.2 }
      ]
    };
  
    // Llenar select de clases o grupos
    classes.forEach(cls => {
      const option = document.createElement("option");
      option.value = cls;
      option.textContent = cls;
      classGroupSelect.appendChild(option);
    });
  
    // Función para llenar select de nombres de estudiantes según la clase seleccionada
    function populateStudentNames() {
      const selectedClass = classGroupSelect.value;
      studentNameFilterSelect.innerHTML = ""; // Limpiar las opciones actuales
      if (studentsByClass[selectedClass]) {
        studentsByClass[selectedClass].forEach(student => {
          const option = document.createElement("option");
          option.value = student.name;
          option.textContent = student.name;
          studentNameFilterSelect.appendChild(option);
        });
      }
    }
  
    // Evento para actualizar el listado de nombres de estudiantes al cambiar la clase
    classGroupSelect.addEventListener("change", populateStudentNames);
  
    // Llenar select de nombres de estudiantes al cargar la página por defecto
    populateStudentNames();
  
    function populateReportTable() {
      reportTableBody.innerHTML = "";
      const selectedClass = classGroupSelect.value;
      const students = studentsByClass[selectedClass] || [];
      students.forEach(student => {
        const row = reportTableBody.insertRow();
        row.insertCell(0).textContent = student.globalPerformance.toFixed(2);
        const dateCell = row.insertCell(1);
        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.value = student.reportDate;
        dateCell.appendChild(dateInput);
        row.insertCell(2).textContent = student.name;
        const selectCell = row.insertCell(3);
        const selectButton = document.createElement("button");
        selectButton.textContent = "Seleccionar";
        selectButton.addEventListener("click", () => selectStudent(student));
        selectCell.appendChild(selectButton);
      });
    }
  
    populateReportTable();
  
    function selectStudent(selectedStudent) {
      const selectedClass = classGroupSelect.value;
      const students = studentsByClass[selectedClass] || [];
      const student = students.find(student => student.name === selectedStudent.name);
      if (student) {
        Array.from(reportTableBody.rows).forEach(row => {
          if (row.cells[2].textContent === student.name) {
            row.cells[0].textContent = student.average.toFixed(2);
          }
        });
        alert(`Estudiante ${student.name} seleccionado con rendimiento global actualizado.`);
      }
    }
  
    document.getElementById("generateReport").addEventListener("click", () => {
      alert("Reporte generado.");
    });
  
    document.getElementById("exportToPdf").addEventListener("click", () => {
      const { jsPDF } = window.jspdf;
  
      const doc = new jsPDF();
      doc.text("Reporte de Calificaciones", 10, 10);
  
      let y = 20;
      doc.text("Reporte de Estudiantes", 10, y);
      y += 10;
  
      Array.from(reportTableBody.rows).forEach(row => {
        const studentName = row.cells[2].textContent;
        const globalPerformance = row.cells[0].textContent;
        const reportDate = row.cells[1].querySelector("input").value;
  
        doc.text(`Nombre: ${studentName}`, 10, y);
        y += 10;
        doc.text(`Rendimiento: ${globalPerformance}`, 10, y);
        y += 10;
        doc.text(`Fecha del Reporte: ${reportDate}`, 10, y);
        y += 10;
        y += 10;  // Añadir un espacio entre estudiantes
      });
  
      doc.save("reporte_estudiantes.pdf");
      alert("Archivo exportado a PDF.");
    });
  
    document.getElementById("sendEmail").addEventListener("click", () => {
      alert("Reporte enviado por correo.");
    });
  
    document.getElementById("backToDashboard").addEventListener("click", () => {
      window.location.href = "dashboard.html"; // Redirige al dashboard
    });
  });
  