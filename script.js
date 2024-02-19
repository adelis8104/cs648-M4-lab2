// CREATE AN ARRAY OF EMPLOYEES
var employees = [
    [12345678, "Jotaro Kujo", 6016, "starplatinum@speedwagon.com", "Engineering"],
    [92104818, "Joseph Joestar", 7474, "hermetpurple@speedwagon.com", "Administrative"],
    [84013842, "Mohammed Avdol", 2410, "magiciansred@speedwagon.com", "Executive"],
    [66718391, "Noriaki Kakyoin", 1102, "hierophantgreen@speedwagon.com", "Sales"],
    [29896773, "Jean Pierre Polnareff", 6134, "silverchariot@speedwagon.com", "QA"]
];

var $ = (id) => {
    "use strict";
    return window.document.getElementById(id);
};

var empCount = employees.length;
$("empCount").textContent = "(" + empCount + ")";

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
if(localStorage.employees) {
    employees = JSON.parse(localStorage.employees);
}
else {
    localStorage.employees = JSON.stringify(employees);
}

// GET DOM ELEMENTS
var empTable = $("empTable");
var form = $("addForm");

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid();

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    "use strict";
    var id, name, extension, email, department, newEmployee;

    // PREVENT FORM SUBMISSION
    e.preventDefault();

    // GET THE VALUES FROM THE TEXT BOXES
    id = $('id').value;
    name = $('name').value;
    extension = $('extension').value;
    email = $('email').value;
    department = $('department').value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    newEmployee = [id, name, extension, email, department];

    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee);

    // BUILD THE GRID
    buildGrid();

    // RESET THE FORM
    form.reset();
    
    // SET FOCUS BACK TO THE ID TEXT BOX
    $("id").focus();

});

// DELETE EMPLOYEE
function deleteEmployee(e)  {
    "use strict";
    // CONFIRM THE DELETE
    if (window.confirm("Are you sure you want to delete this employee?")) {
        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        var index = e.target.parentNode.parentNode.rowIndex;

        // REMOVE EMPLOYEE FROM ARRAY
        employees.splice(index - 1, 1);

        // BUILD THE GRID
        buildGrid();   
    }

};

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    "use strict";
    var oldTBody, newTBody, employee, newRow, deleteButton;

    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    oldTBody = empTable.querySelector("tbody");
    if (oldTBody) {
        oldTBody.remove();
    }

    // REBUILD THE TBODY FROM SCRATCH
    newTBody = document.createElement("tbody");

    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (employee of employees) {
        newRow = document.createElement("tr");
        newRow.innerHTML = 
            `
            <td>${employee[0]}</td>
            <td>${employee[1]}</td>
            <td>${employee[2]}</td>
            <td>${employee[3]}</td>
            <td>${employee[4]}</td>
            <td><button>X</button></td>
            `;

        // ADD THE DELETE BUTTON event handler
        deleteButton = newRow.querySelector('button');
        deleteButton.addEventListener("click", deleteEmployee);

        newTBody.appendChild(newRow);
    }

    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(newTBody);

    // UPDATE EMPLOYEE COUNT
    empCount = employees.length;
    $("empCount").textContent = "(" + empCount + ")";

    // STORE THE ARRAY IN STORAGE
    localStorage.employees = JSON.stringify(employees);

};