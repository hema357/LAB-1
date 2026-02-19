let xmlDoc = null;

function loadEmployees() {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                xmlDoc = xhr.responseXML;

                if (!xmlDoc) {
                    showMessage("Malformed XML!", "red");
                    return;
                }

                displayEmployees();
            } else {
                showMessage("Error loading XML file.", "red");
            }
        }
    };

    xhr.open("GET", "employees.xml", true);
    xhr.send();
}

function displayEmployees() {
    const table = document.getElementById("empTable");
    table.innerHTML = "";

    const employees = xmlDoc.getElementsByTagName("employee");

    if (employees.length === 0) {
        showMessage("No employee records found.", "orange");
        return;
    }

    for (let i = 0; i < employees.length; i++) {
        const emp = employees[i];

        const id = emp.getElementsByTagName("id")[0].textContent;
        const name = emp.getElementsByTagName("name")[0].textContent;
        const dept = emp.getElementsByTagName("department")[0].textContent;
        const salary = emp.getElementsByTagName("salary")[0].textContent;

        const row = `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${dept}</td>
                <td>${salary}</td>
                <td>
                    <button class="action-btn edit" onclick="editEmployee(${i})">Edit</button>
                    <button class="action-btn delete" onclick="deleteEmployee(${i})">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    }

    showMessage("Employees loaded successfully.", "green");
}

function addEmployee() {
    if (!xmlDoc) return;

    const id = document.getElementById("empId").value;
    const name = document.getElementById("empName").value;
    const dept = document.getElementById("empDept").value;
    const salary = document.getElementById("empSalary").value;

    const newEmp = xmlDoc.createElement("employee");

    newEmp.appendChild(createNode("id", id));
    newEmp.appendChild(createNode("name", name));
    newEmp.appendChild(createNode("department", dept));
    newEmp.appendChild(createNode("salary", salary));

    xmlDoc.documentElement.appendChild(newEmp);

    displayEmployees();
    showMessage("Employee added (local only).", "green");
}

function createNode(tag, value) {
    const node = xmlDoc.createElement(tag);
    node.appendChild(xmlDoc.createTextNode(value));
    return node;
}

function editEmployee(index) {
    const emp = xmlDoc.getElementsByTagName("employee")[index];

    const newDept = prompt("Enter new department:");
    const newSalary = prompt("Enter new salary:");

    if (newDept)
        emp.getElementsByTagName("department")[0].textContent = newDept;

    if (newSalary)
        emp.getElementsByTagName("salary")[0].textContent = newSalary;

    displayEmployees();
    showMessage("Employee updated.", "blue");
}

function deleteEmployee(index) {
    const emp = xmlDoc.getElementsByTagName("employee")[index];
    emp.parentNode.removeChild(emp);

    displayEmployees();
    showMessage("Employee deleted.", "red");
}

function showMessage(msg, color) {
    const m = document.getElementById("message");
    m.style.color = color;
    m.textContent = msg;
}
