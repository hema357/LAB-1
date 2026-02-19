const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

let debounceTimer;

function debounce(callback, delay) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, delay);
}

searchInput.addEventListener("input", function () {

    const query = searchInput.value.trim().toLowerCase();

    debounce(() => {

        if (query === "") {
            resultsDiv.innerHTML = "";
            return;
        }

        resultsDiv.innerHTML = "<p class='loading'>Searching...</p>";

        fetch("products.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then(data => {

                const filtered = data.products.filter(product =>
                    product.name.toLowerCase().includes(query)
                );

                displayResults(filtered);
            })
            .catch(error => {
                resultsDiv.innerHTML = "<p class='error'>⚠ Error loading products</p>";
            });

    }, 500);
});

function displayResults(products) {

    resultsDiv.innerHTML = "";

    if (products.length === 0) {
        resultsDiv.innerHTML = "<p class='no-results'>No results found</p>";
        return;
    }

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p class="price">₹${product.price}</p>
            <span class="category">${product.category}</span>
        `;

        resultsDiv.appendChild(card);
    });
}

