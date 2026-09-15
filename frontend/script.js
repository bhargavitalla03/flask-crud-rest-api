const API_URL = "http://localhost:4000/users";


// ===============================
// Get all users
// ===============================
async function getUsers() {

    try {

        const response = await fetch(API_URL);

        const users = await response.json();

        const table = document.getElementById("usersTable");

        table.innerHTML = "";

        users.forEach(user => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>

                <td>
                    <button
                        class="action-btn edit-btn"
                        onclick="editUser(${user.id}, '${user.username}', '${user.email}')">
                        Edit
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteUser(${user.id})">
                        Delete
                    </button>
                </td>
            `;

            table.appendChild(row);
        });

    } catch (error) {

        console.error("Error:", error);

        alert("Unable to connect to the backend.");
    }
}


// ===============================
// Add user
// ===============================
document.getElementById("userForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                email: email
            })
        });

        if (response.ok) {

            alert("User added successfully!");

            document.getElementById("userForm").reset();

            getUsers();

        } else {

            alert("Failed to add user.");
        }

    } catch (error) {

        console.error("Error:", error);

        alert("Unable to connect to the backend.");
    }

});


// ===============================
// Delete user
// ===============================
async function deleteUser(id) {

    if (!confirm("Are you sure you want to delete this user?")) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: "DELETE"
        });

        if (response.ok) {

            alert("User deleted successfully!");

            getUsers();

        } else {

            alert("Failed to delete user.");
        }

    } catch (error) {

        console.error("Error:", error);

        alert("Unable to connect to the backend.");
    }
}


// ===============================
// Edit user
// ===============================
async function editUser(id, oldUsername, oldEmail) {

    const username = prompt("Enter new username:", oldUsername);

    if (username === null) {
        return;
    }

    const email = prompt("Enter new email:", oldEmail);

    if (email === null) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                email: email
            })
        });

        if (response.ok) {

            alert("User updated successfully!");

            getUsers();

        } else {

            alert("Failed to update user.");
        }

    } catch (error) {

        console.error("Error:", error);

        alert("Unable to connect to the backend.");
    }
}


// ===============================
// Load users when page opens
// ===============================
getUsers();