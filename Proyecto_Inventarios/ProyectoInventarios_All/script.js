function agregarProducto() {
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;
    const codigo = document.getElementById('codigo').value;

    const inventario = document.getElementById('inventario');

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${nombre}</td>
        <td>${descripcion}</td>
        <td>${precio}</td>
        <td>${stock}</td>
        <td>${codigo}</td>
        <td>
            <button type="button" onclick="sumarStockProducto(this)">+ Stock</button>
            <button type="button" onclick="restarStockProducto(this)">- Stock</button>
        </td>
    `;

    inventario.appendChild(newRow);
}

function sumarStockProducto(button) {
    const row = button.parentElement.parentElement;
    const stockCell = row.querySelector('td:nth-child(4)');
    stockCell.textContent = Number(stockCell.textContent) + 1;
}

function restarStockProducto(button) {
    const row = button.parentElement.parentElement;
    const stockCell = row.querySelector('td:nth-child(4)');
    if (Number(stockCell.textContent) > 0) {
        stockCell.textContent = Number(stockCell.textContent) - 1;
    }
}

function sumarStock() {
    const codigo = document.getElementById('codigoStock').value;
    const cantidad = Number(document.getElementById('cantidad').value);

    const inventario = document.getElementById('inventario').getElementsByTagName('tr');
    for (let i = 1; i < inventario.length; i++) {
        const codigoProducto = inventario[i].getElementsByTagName('td')[4].textContent;
        if (codigo === codigoProducto) {
            const stockCell = inventario[i].getElementsByTagName('td')[3];
            stockCell.textContent = Number(stockCell.textContent) + cantidad;
            break;
        }
    }
}

function restarStock() {
    const codigo = document.getElementById('codigoStock').value;
    const cantidad = Number(document.getElementById('cantidad').value);

    const inventario = document.getElementById('inventario').getElementsByTagName('tr');
    for (let i = 1; i < inventario.length; i++) {
        const codigoProducto = inventario[i].getElementsByTagName('td')[4].textContent;
        if (codigo === codigoProducto) {
            const stockCell = inventario[i].getElementsByTagName('td')[3];
            if (Number(stockCell.textContent) >= cantidad) {
                stockCell.textContent = Number(stockCell.textContent) - cantidad;
            }
            break;
        }
    }
}




