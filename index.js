window.onload = function () {
    let storedHeading = localStorage.getItem('customHeading');
    if (storedHeading) {
        document.getElementById('heading').innerText = storedHeading;
    }
};

function changeHeading() {
    let newHeadingText = document.getElementById('newinputheading').value;
    document.getElementById('heading').innerText = newHeadingText;
};


function saveHeading() {
    let newHeadingText = document.getElementById('newinputheading').value;
    localStorage.setItem('customHeading', newHeadingText);
    document.getElementById("newinputheading").value = "";
};

function toggleDropdown() {
    const dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.classList.toggle('show');
}

document.getElementById('dropdownBtn').addEventListener('click', toggleDropdown);

window.addEventListener('click', function (event) {
    const dropdownContent = document.getElementById("dropdownContent");
    const dropdownBtn = document.getElementById("dropdownBtn");
    if (!event.target.matches('.dropbtn') && !dropdownContent.contains(event.target)) {
        dropdownContent.classList.remove("show");
    }
});




document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const displayBox = document.getElementById("displaybox").querySelector("tbody");
    const totalRow = document.createElement("tr");
    const sellButton = document.getElementById("sell");

    let totalSum = 0;

    // The following function is responsible for fetching data from the API endpoint 
    // The fetched data is then filtered based on a search term entered into an input field and displayed in a dropdown
    function fetchData() {
        fetch("http://localhost:3000/products")
            .then(response => response.json())
            .then(data => {
                displaySearchResults(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }


    function displaySearchResults(products) {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.item.toLowerCase().includes(searchTerm) ||
            product.price.toString().includes(searchTerm) ||
            product.quantity.toString().includes(searchTerm)
        );


        searchResults.innerHTML = "";


        if (filteredProducts.length > 0) {
            const dropdown = document.createElement("div");
            dropdown.classList.add("dropdown");
            
            filteredProducts.forEach(product => {
                const option = document.createElement("div");
                option.classList.add("dropdown-option");
                
                
                const itemColumn = document.createElement("div");
                itemColumn.textContent = product.item;
                itemColumn.classList.add("column");
                
                const priceColumn = document.createElement("div");
                priceColumn.textContent = `Price: ${product.price}`;
                priceColumn.classList.add("column");
                
                const quantityColumn = document.createElement("div");
                quantityColumn.textContent = `Quantity: ${product.quantity}`;
                quantityColumn.classList.add("column");
                
                
                
                option.addEventListener("click", function () {
                    searchInput.value = product.item;
                    searchInput.value = '';
                    displaySelectedProduct(product);
                    searchResults.innerHTML = "";
                });


                option.appendChild(itemColumn);
                option.appendChild(priceColumn);
                option.appendChild(quantityColumn);
                
                dropdown.appendChild(option);
            });

            const changePriceButton = document.createElement("button");
            changePriceButton.textContent = "Change Prices";
            changePriceButton.addEventListener("click", function () {

                const newPrices = Array.from(dropdown.querySelectorAll("input")).map(input => parseFloat(input.value));
                console.log(newPrices);
                alert("Changes saved!");
            });

            dropdown.appendChild(changePriceButton)
            
            searchResults.appendChild(dropdown);
        }
    }

    // When a product is selected from the dropdown, it is displayed in a table (displayBox) along with its price and quantity.
    // Clicking on the quantity increases the quantity and updates the total price 
    function displaySelectedProduct(product) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${product.item}</td>
    <td>${product.price}</td>
    <td class="quantity-cell" >0</td>
    <td>${0}</td>
    `;
    displayBox.appendChild(row);
    
    const quantityCell = row.querySelector(".quantity-cell");
    quantityCell.addEventListener("click", function () {
            let currentQuantity = parseInt(quantityCell.textContent);
            if (isNaN(currentQuantity)) {
                currentQuantity = 0;
            }
            const newQuantity = currentQuantity + 1;
            quantityCell.textContent = newQuantity;
            const price = parseFloat(row.querySelector("td:nth-child(2)").textContent);
            const newTotal = price * newQuantity;
            row.querySelector("td:nth-child(4)").textContent = newTotal;
            updateTotal();
        });
    }
    
    // The total price of all selected items is calculated and displayed in a separate row
    function updateTotal() {
        totalSum = 0;
        const rows = displayBox.querySelectorAll("tr");
        rows.forEach(row => {
            const totalCell = row.querySelector("td:nth-child(4)");
            if (totalCell && totalCell.textContent !== "") {
                totalSum += parseFloat(totalCell.textContent);
            }
        });
        totalRow.innerHTML = `
            <td colspan="3">Total</td>
            <td>${totalSum}</td>
        `;
    }
    // There's a Sell button that prompts the user for the amount given by the customer and calculates the balance.

    displayBox.parentNode.appendChild(totalRow);


    updateTotal();


    searchInput.addEventListener("focus", fetchData);
    searchInput.addEventListener("input", fetchData);

    sellButton.addEventListener("click", function () {

        const amountGiven = parseFloat(prompt("Amount given by customer:"));
        if (amountGiven < totalSum) {
            alert("Amount not enough")
        }
        if (!isNaN(amountGiven)) {
            const balance = amountGiven - totalSum;
            alert(`Balance: ${balance}`);
        } else {
            alert("Invalid input. Please enter a valid amount.");
        }
    });
});

// There's functionality to show an employee list when clicking a button (showEmployeesButton).
document.addEventListener('DOMContentLoaded', function () {
    const showEmployeesButton = document.getElementById('showEmployeesButton');
    const employeeList = document.getElementById('employeeList');

    showEmployeesButton.addEventListener('click', function () {
        if (employeeList.style.display === 'none') {
            employeeList.style.display = 'block';
        } else {
            employeeList.style.display = 'none';
        }
    });

    const employeeNames = document.querySelectorAll('.employeeName');
    employeeNames.forEach(name => {
        name.addEventListener('click', function () {
            const newName = prompt('Enter new name for employee:', this.textContent);
            if (newName !== null && newName !== '') {
                this.textContent = newName;
            }
        });
    });
});

