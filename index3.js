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
    

    // Fetch data from the API
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

    // Display search results in dropdown
    function displaySearchResults(products) {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.item.toLowerCase().includes(searchTerm) ||
            product.price.toString().includes(searchTerm) ||
            product.quantity.toString().includes(searchTerm)
        );

        // Clear previous results
        searchResults.innerHTML = "";

        // Display dropdown only if there are matching results
        if (filteredProducts.length > 0) {
            const dropdown = document.createElement("div");
            dropdown.classList.add("dropdown");

            filteredProducts.forEach(product => {
                const option = document.createElement("div");
                option.textContent =
                    `${product.item} - Price: ${product.price}, Quantity: ${product.quantity}`;
                option.classList.add("dropdown-option");
                option.addEventListener("click", function () {
                    // Set the selected item in the input field
                    searchInput.value = product.item;

                    searchInput.value = '';

                    displaySelectedProduct(product);
                    // Clear the dropdown
                    searchResults.innerHTML = "";

                });
                dropdown.appendChild(option);
            });

            // Append dropdown to searchResults div
            searchResults.appendChild(dropdown);
        }
    }

    // Display selected product in the displayBox
    function displaySelectedProduct(product) {
        const row = document.createElement("tr");
        row.innerHTML = `
    <td>${product.item}</td>
    <td>${product.price}</td>
    <td class="quantity-cell" >${product.quantity}</td>
    <td>${product.price * product.quantity}</td>
`;
        displayBox.appendChild(row);






        const quantityCell = row.querySelector(".quantity-cell");
        quantityCell.addEventListener("click", function () {
            const currentQuantity = parseInt(quantityCell.textContent);
            const newQuantity = currentQuantity + 1;
            quantityCell.textContent = newQuantity;
            const price = parseFloat(row.querySelector("td:nth-child(2)").textContent);
            const newTotal = price * newQuantity;
            row.querySelector("td:nth-child(4)").textContent = newTotal;
        });
    }


   




    searchInput.addEventListener("focus", function () {
        fetchData();
    });
    // Event listener for input changes

    searchInput.addEventListener("input", function () {
        fetchData();
    });


});