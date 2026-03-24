let data = []; 
let currentPage = 1;
const rowsPerPage = 10; 

const tableBody = document.getElementById('table-body');
const pageNumSpan = document.getElementById('page-number');

async function fetchData() {
    try {
        const response = await fetch('https://randomuser.me/api/?results=50');
        const json = await response.json();
        
        // --- YE HAI ASLI LOGIC JO NAMES KO A TO Z KAREGA ---
        data = json.results.sort((a, b) => {
            if (a.name.first < b.name.first) return -1;
            if (a.name.first > b.name.first) return 1;
            return 0;
        });

        displayTable(); 
    } catch (error) {
        console.log("Error!");
    }
}

function displayTable() {
    if (!tableBody) return;
    tableBody.innerHTML = ''; 

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const currentRows = data.slice(start, end);

    currentRows.forEach(user => {
        const row = `
            <tr>
                <td>${user.name.first} ${user.name.last}</td>
                <td>${user.email}</td>
                <td>${user.login.username}</td>
                <td>${user.location.country}</td>
            </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });

    if (pageNumSpan) pageNumSpan.innerText = currentPage;
}

// Simple Buttons
document.getElementById('next-btn').onclick = () => {
    if ((currentPage * rowsPerPage) < data.length) {
        currentPage++;
        displayTable();
    }
};

document.getElementById('pre-btn').onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        displayTable();
    }
};

fetchData();