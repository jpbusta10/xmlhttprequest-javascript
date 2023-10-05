const baseUrl = 'https://utn-lubnan-api-1.herokuapp.com/';
const companiesRoute = 'api/company';
const employeeRoute = 'api/employee';

const makeHttpRequest = (method, url) => {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.onload = () => {
            if (xhr.status == 200 && xhr.readyState == 4) {
                resolve(JSON.parse(xhr.responseText));
            }
            else {
                reject(new Error(`Error fetching data: ${xhr.status} ${xhr.statusText}`))
            }
        };

        xhr.onerror = () => {
            reject(new Error('network error'))
        };
        xhr.send();
    })
}

async function fetchEmployeeData() {
    try {
        const employeeUrl = baseUrl + employeeRoute;
        const employeeData = await makeHttpRequest('GET', employeeUrl);
        document.getElementById('result').textContent = 'Employee: ' + JSON.stringify(employeeData);
    } catch (error) {
        document.getElementById('result').textContent = 'Error: ' + error.message;
    }
}

async function getEmployees() {
    try {
        const employeeUrl = baseUrl + employeeRoute;
        const employeeData = await makeHttpRequest('GET', employeeUrl);
        return employeeData;
    } catch (error) {
        throw error;
    }
}

function renderEmployeeList(employees) {
    const listContainer = document.getElementById('employee-list');

    listContainer.innerHTML = '';

    if (employees.length === 0) {
        listContainer.textContent = 'No employees found';
        return;
    }

    const ul = document.createElement('ul');
    ul.className = 'employee-list';

    employees.forEach((employee) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <strong>Employee ID:</strong> ${employee.employeeId}<br>
        <strong>Company ID:</strong> ${employee.companyId}<br>
        <strong>First Name:</strong> ${employee.firstName}<br>
        <strong>Last Name:</strong> ${employee.lastName}<br>
        <strong>Email:</strong> ${employee.email}<br>
        <hr>
        `;
        ul.appendChild(li);
    });

    listContainer.appendChild(ul);
}

// Add an event listener to the button to fetch and render employees when clicked
const fetchButton = document.getElementById('fetch-button');
fetchButton.addEventListener('click', async () => {
    const resultDiv = document.getElementById('employee-list');
    resultDiv.textContent = 'Fetching employee data... ';

    try {
        const employees = await getEmployees();
        renderEmployeeList(employees);
    } catch (error) {
        resultDiv.textContent = 'Error: ' + error.message;
    }
});