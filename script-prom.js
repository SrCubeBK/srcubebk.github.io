document.addEventListener("DOMContentLoaded", () => {
    // Datos simulados de estudiantes
    let students = [
      { id: 1, name: "Estudiante 1", grades: { parcial1: Array(8).fill(0), parcial2: Array(8).fill(0), parcial3: Array(8).fill(0) } },
      { id: 2, name: "Estudiante 2", grades: { parcial1: Array(8).fill(0), parcial2: Array(8).fill(0), parcial3: Array(8).fill(0) } },
      { id: 3, name: "Estudiante 3", grades: { parcial1: Array(8).fill(0), parcial2: Array(8).fill(0), parcial3: Array(8).fill(0) } },
    ];
  
    const studentsTableBody = document.getElementById("studentsTable").getElementsByTagName("tbody")[0];
  
    function displayStudents() {
      studentsTableBody.innerHTML = "";
      students.forEach((student, index) => {
        const row = studentsTableBody.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = student.name;
  
        [1, 2, 3].forEach(parcial => {
          student.grades[`parcial${parcial}`].forEach((grade, i) => {
            const input = document.createElement("input");
            input.type = "number";
            input.value = grade;
            input.dataset.studentId = student.id;
            input.dataset.parcial = parcial;
            input.dataset.gradeIndex = i;
            row.insertCell(-1).appendChild(input);
          });
        });
  
        const finalAverageCell = row.insertCell(-1);
        finalAverageCell.dataset.studentId = student.id;
      });
    }
  
    displayStudents();
  
    document.getElementById("calculateAverage").addEventListener("click", () => {
      students.forEach(student => {
        const allGrades = [];
        [1, 2, 3].forEach(parcial => {
          const grades = Array.from(document.querySelectorAll(`input[data-student-id='${student.id}'][data-parcial='${parcial}']`)).map(input => Number(input.value));
          allGrades.push(...grades);
        });
        student.average = allGrades.reduce((sum, grade) => sum + grade, 0) / allGrades.length;
  
        const finalAverageCell = document.querySelector(`td[data-student-id='${student.id}']`);
        finalAverageCell.textContent = student.average.toFixed(2);
        if (student.average < 7) {
          finalAverageCell.classList.add("average-risk");
        } else {
          finalAverageCell.classList.remove("average-risk");
        }
      });
      alert("Promedios calculados.");
    });
  
    document.getElementById("saveResults").addEventListener("click", () => {
      localStorage.setItem("studentsData", JSON.stringify(students));
      alert("Resultados guardados.");
    });
  
    document.getElementById("exportToPdf").addEventListener("click", () => {
      const { jsPDF } = window.jspdf;
  
      const doc = new jsPDF();
      doc.text("Calificaciones", 10, 10);
  
      let y = 20;
      doc.text("Promedios de Estudiantes", 10, y);
      y += 10;
  
      students.forEach((student, index) => {
        doc.text(`${index + 1}. ${student.name}`, 10, y);
        y += 10;
        [1, 2, 3].forEach(parcial => {
          student.grades[`parcial${parcial}`].forEach((grade, i) => {
            doc.text(`P${parcial} Act${i + 1}: ${grade}`, 20, y);
            y += 10;
          });
        });
        doc.text(`Promedio Final: ${student.average !== undefined ? student.average.toFixed(2) : ""}`, 20, y);
        y += 10;
      });
  
      doc.save("calificaciones.pdf");
      alert("Archivo exportado a PDF.");
    });
  
    document.getElementById("backToDashboard").addEventListener("click", () => {
      window.location.href = "dashboard.html"; // Redirige al dashboard
    });
  
    document.getElementById("addStudent").addEventListener("click", () => {
      const studentName = prompt("Ingrese el nombre del nuevo alumno:");
      if (studentName) {
        const newId = students.length ? students[students.length - 1].id + 1 : 1;
        students.push({
          id: newId,
          name: studentName,
          grades: { parcial1: Array(10).fill(0), parcial2: Array(10).fill(0), parcial3: Array(10).fill(0) }
        });
        displayStudents();
      }
    });
  
    document.getElementById("addActivity").addEventListener("click", () => {
      const parcial = prompt("¿En qué parcial desea agregar la actividad? (1, 2, o 3):");
      if ([1, 2, 3].includes(Number(parcial))) {
        students.forEach(student => {
          student.grades[`parcial${parcial}`].push(0);
        });
        displayStudents();
      } else {
        alert("Por favor ingrese un número de parcial válido (1, 2, o 3).");
      }
    });
  });
  