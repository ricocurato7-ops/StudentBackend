const API_URL = "http://localhost:5000/api/students";

function goToAdd() { window.location.href = "add.html"; }
function goToView() { window.location.href = "view.html"; }
function goBack() { window.location.href = "dashboard.html"; }
function logout() { window.location.href = "index.html"; }

async function addStudent() {
    // Collect data from the input fields
    const studentData = {
        name: document.getElementById('name').value,
        course: document.getElementById('course').value,
        year: document.getElementById('year').value,
        record: document.getElementById('record').value,
        age: parseInt(document.getElementById('age').value),
        parentName: document.getElementById('parentName').value,
        parentContact: document.getElementById('parentContact').value
    };

    if (!studentData.name || !studentData.record) {
        alert("Please fill in the Student Name and ID Number.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            alert("Record saved successfully!");
            window.location.href = "dashboard.html";
        } else {
            alert("Error saving record. Check if the server is running.");
        }
    } catch (error) {
        console.error("Connection error:", error);
    }
}


async function loadTable() {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return; // Only run if we are on the view page

    try {
        const response = await fetch(API_URL);
        const students = await response.json();


        tableBody.innerHTML = students.map(s => `
            <tr>
                <td>${s.name}</td>
                <td>${s.age}</td>
                <td>${s.course}</td>
                <td>${s.year}</td>
                <td>${s.record}</td>
                <td>${s.parentName}</td>
                <td>${s.parentContact}</td>
                <td>
                    <button class="delete-btn" onclick="deleteStudent(${s.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error("Could not load records:", error);
    }
}

async function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadTable(); // Refresh the list
        }
    } catch (error) {
        console.error("Delete error:", error);
    }
}

if (window.location.pathname.includes("view.html")) {
    window.onload = loadTable;
}
async function addStudent() {
    const data = {
        name: document.getElementById('name').value,
        course: document.getElementById('course').value,
        year: document.getElementById('year').value,
        record: document.getElementById('record').value,
        age: parseInt(document.getElementById('age').value),
        parentName: document.getElementById('parentName').value,
        parentContact: document.getElementById('parentContact').value
    };

    const response = await fetch("http://localhost:YOURPORT/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert("Saved!");
        window.location.href = "dashboard.html";
    }
}