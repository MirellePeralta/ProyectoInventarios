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
function mostrarContenido(tab) {
    const tabs = document.querySelectorAll('.contenido-tab');
    tabs.forEach(t => t.style.display = 'none');
    document.getElementById(tab + 'Tab').style.display = 'block';
}
let sucursales = [];

function crearTablaSucursal() {
    const nombreSucursal = document.getElementById('nombreSucursal').value;
    const sucursal = { nombre: nombreSucursal, inventario: [] };
    sucursales.push(sucursal);

    const sucursalesContenido = document.getElementById('sucursalesContenido');
    const nuevaTabla = document.createElement('div');
    nuevaTabla.innerHTML = `
        <h2>Sucursal: ${nombreSucursal}</h2>
        <table>
            <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Código</th>
            </tr>
        </table>
        <button type="button" onclick="distribuirStock('${nombreSucursal}')">Distribuir Stock</button>
    `;
    sucursal.tabla = nuevaTabla.querySelector('table');
    sucursalesContenido.appendChild(nuevaTabla);
}

function distribuirStock(sucursalNombre) {
    const sucursal = sucursales.find(s => s.nombre === sucursalNombre);
    if (!sucursal) return;

    const codigo = prompt(`Ingrese el código del producto para la sucursal ${sucursalNombre}`);
    const cantidad = parseInt(prompt(`Ingrese la cantidad de stock a distribuir a la sucursal ${sucursalNombre}`));

    const inventario = document.getElementById('inventario').getElementsByTagName('tr');
    for (let i = 1; i < inventario.length; i++) {
        const codigoProducto = inventario[i].getElementsByTagName('td')[4].textContent;
        if (codigo === codigoProducto) {
            const stockCell = inventario[i].getElementsByTagName('td')[3];
            const cantidadDistribuida = Math.min(cantidad, Number(stockCell.textContent));
            stockCell.textContent = Number(stockCell.textContent) - cantidadDistribuida;

            const newRow = sucursal.tabla.insertRow();
            newRow.innerHTML = `
                <td>${inventario[i].getElementsByTagName('td')[0].textContent}</td>
                <td>${inventario[i].getElementsByTagName('td')[1].textContent}</td>
                <td>${inventario[i].getElementsByTagName('td')[2].textContent}</td>
                <td>${cantidadDistribuida}</td>
                <td>${codigo}</td>
            `;
            sucursal.inventario.push({
                nombre: inventario[i].getElementsByTagName('td')[0].textContent,
                descripcion: inventario[i].getElementsByTagName('td')[1].textContent,
                precio: inventario[i].getElementsByTagName('td')[2].textContent,
                stock: cantidadDistribuida,
                codigo: codigo
            });

            break;
        }
    }
}

