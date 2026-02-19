const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const message = document.getElementById("message");

let students = [];

// READ (Fetch students)
function loadStudents() {
    fetch("students.json")
        .then(response => {
            if (!response.ok) throw new Error("500");
            return response.json();
        })
        .then(data => {
            students = data.students;
            renderTable();
            showMessage("Students loaded (200 OK)", "success");
        })
        .catch(() => {
            showMessage("Server Error (500)", "error");
        });
}

// Render table
function renderTable() {
    table.innerHTML = "";
    students.forEach(student => {
        table.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.department}</td>
                <td>${student.marks}</td>
                <td>
                    <button onclick="editStudent('${student.id}')">Edit</button>
                    <button onclick="deleteStudent('${student.id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

// CREATE / UPDATE
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("studentId").value;
    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;
    const marks = document.getElementById("marks").value;

    const existing = students.find(s => s.id === id);

    if (existing) {
        // UPDATE
        existing.name = name;
        existing.department = department;
        existing.marks = marks;
        showMessage("Student Updated (200 OK)", "success");
    } else {
        // CREATE
        students.push({ id, name, department, marks });
        showMessage("Student Added (200 OK)", "success");
    }

    renderTable();
    form.reset();
});

// DELETE
function deleteStudent(id) {
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        showMessage("Student Not Found (404)", "error");
        return;
    }

    students.splice(index, 1);
    renderTable();
    showMessage("Student Deleted (200 OK)", "success");
}

// EDIT
function editStudent(id) {
    const student = students.find(s => s.id === id);

    if (!student) {
        showMessage("Student Not Found (404)", "error");
        return;
    }

    document.getElementById("studentId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("department").value = student.department;
    document.getElementById("marks").value = student.marks;
}

// Message
function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

// Initialize
loadStudents();