let products = [];
let filteredProducts = [];

// ================= INIT =================
window.onload = function () {
    loadProducts();
    document.getElementById("addBtn").addEventListener("click", addProduct);
    document.getElementById("searchCategory").addEventListener("input", searchByCategory);
};

// ================= FETCH =================
function loadProducts() {
    fetch("inventory.json")
        .then(res => {
            if (!res.ok) throw new Error("Fetch failed");
            return res.json();
        })
        .then(data => {
            products = data;
            filteredProducts = [...products];
            displayProducts();
            updateTotalValue();
            showMessage("Inventory loaded.", "green");
        })
        .catch(err => {
            showMessage("JSON loading/parsing error.", "red");
            console.error(err);
        });
}

// ================= DISPLAY =================
function displayProducts() {
    const table = document.getElementById("inventoryTable");
    table.innerHTML = "";

    filteredProducts.forEach((p, index) => {
        const lowStockClass = p.stock <= 5 ? "low-stock" : "";

        table.innerHTML += `
        <tr class="${lowStockClass}">
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>₹${p.price}</td>
            <td>${p.stock}</td>
            <td>
                <button class="action-btn edit" onclick="editProduct(${index})">Edit</button>
                <button class="action-btn delete" onclick="deleteProduct(${index})">Delete</button>
            </td>
        </tr>`;
    });

    updateTotalValue();
}

// ================= VALIDATION =================
function validateInputs(id,name,cat,price,stock){
    if(!id||!name||!cat||!price||!stock){
        showMessage("Please fill all fields.","red");
        return false;
    }
    if(price<0||stock<0){
        showMessage("Invalid numeric values.","red");
        return false;
    }
    return true;
}

// ================= ADD =================
function addProduct(){
    const id=pid.value.trim();
    const name=pname.value.trim();
    const cat=pcategory.value.trim();
    const priceVal=price.value.trim();
    const stockVal=stock.value.trim();

    if(!validateInputs(id,name,cat,priceVal,stockVal)) return;

    if(products.some(p=>p.id==id)){
        showMessage("Product ID exists!","red");
        return;
    }

    const newProduct={
        id:Number(id),
        name:name,
        category:cat,
        price:Number(priceVal),
        stock:Number(stockVal)
    };

    products.push(newProduct);
    filteredProducts=[...products];

    displayProducts();
    clearForm();
    showMessage("Product added (temporary).","green");
}

// ================= EDIT =================
function editProduct(index){
    const p=filteredProducts[index];

    const newPrice=prompt("Enter new price:",p.price);
    const newStock=prompt("Enter new stock:",p.stock);

    if(newPrice!==null) p.price=Number(newPrice);
    if(newStock!==null) p.stock=Number(newStock);

    displayProducts();
    showMessage("Product updated.","blue");
}

// ================= DELETE =================
function deleteProduct(index){
    const id=filteredProducts[index].id;
    products=products.filter(p=>p.id!==id);
    filteredProducts=[...products];

    displayProducts();
    showMessage("Product deleted.","red");
}

// ================= SEARCH =================
function searchByCategory(){
    const key=searchCategory.value.toLowerCase();

    filteredProducts=products.filter(p=>
        p.category.toLowerCase().includes(key)
    );

    displayProducts();
}

// ================= TOTAL VALUE =================
function updateTotalValue(){
    const total=filteredProducts.reduce((sum,p)=>sum+p.price*p.stock,0);
    document.getElementById("totalValue").textContent=
        "Total Value: ₹"+total.toLocaleString();
}

// ================= UTIL =================
function clearForm(){
    pid.value="";
    pname.value="";
    pcategory.value="";
    price.value="";
    stock.value="";
}

function showMessage(msg,color){
    const m=document.getElementById("message");
    m.style.color=color;
    m.textContent=msg;
}