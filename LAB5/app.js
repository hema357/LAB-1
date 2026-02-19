let students = [];

// ================= INIT =================
window.onload = function () {
    loadStudents();
    document.getElementById("addBtn").addEventListener("click", addStudent);
};

// ================= FETCH JSON =================
function loadStudents() {
    fetch("students.json")
        .then(response => {
            if (!response.ok) throw new Error("Fetch failed");
            return response.json(); // ✅ required
        })
        .then(data => {
            students = data;
            displayStudents();
            showMessage("Students loaded successfully.", "green");
        })
        .catch(err => {
            showMessage("JSON loading/parsing error.", "red");
            console.error(err);
        });
}

// ================= DISPLAY =================
function displayStudents() {
    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    if (students.length === 0) {
        showMessage("No student records.", "orange");
        return;
    }

    students.forEach((s, index) => {
        table.innerHTML += `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.course}</td>
            <td>${s.marks}</td>
            <td>
                <button class="action-btn edit" onclick="updateStudent(${index})">Update</button>
                <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

// ================= VALIDATION =================
function validateInputs(id, name, course, marks) {
    if (!id || !name || !course || !marks) {
        showMessage("Please fill all fields.", "red");
        return false;
    }
    return true;
}

// ================= CREATE =================
function addStudent() {
    const id = document.getElementById("sid").value.trim();
    const name = document.getElementById("sname").value.trim();
    const course = document.getElementById("course").value.trim();
    const marks = document.getElementById("marks").value.trim();

    if (!validateInputs(id, name, course, marks)) return;

    // duplicate check
    if (students.some(s => s.id == id)) {
        showMessage("Student ID already exists!", "red");
        return;
    }

    const newStudent = {
        id: Number(id),
        name: name,
        course: course,
        marks: Number(marks)
    };

    students.push(newStudent);

    displayStudents();
    clearForm();
    showMessage("Student added successfully (temporary).", "green");
}

// ================= UPDATE =================
function updateStudent(index) {
    const newCourse = prompt("Enter new course:");
    const newMarks = prompt("Enter new marks:");

    if (newCourse) students[index].course = newCourse;
    if (newMarks) students[index].marks = Number(newMarks);

    displayStudents();
    showMessage("Student updated.", "blue");
}

// ================= DELETE =================
function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
    showMessage("Student deleted.", "red");
}

// ================= UTIL =================
function clearForm() {
    document.getElementById("sid").value = "";
    document.getElementById("sname").value = "";
    document.getElementById("course").value = "";
    document.getElementById("marks").value = "";
}

function showMessage(msg, color) {
    const m = document.getElementById("message");
    m.style.color = color;
    m.textContent = msg;
}