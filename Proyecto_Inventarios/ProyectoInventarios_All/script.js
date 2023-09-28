function validarFormulario(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    if (usuario === "usuario" && contrasena === "contrasena") {
        // Redirigir a la segunda ventana
        window.location.href = "bienvenido.html";
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

function irAlmacen() {
    window.location.href = "almacen.html";
}

function irSucursales() {
    window.location.href = "sucursales.html";
}

function CerrarSesion() {
    window.location.href = "index.html";
}


let codigoActual = 1;
let letra1 = 'A';
let letra2 = 'A';

function generarCodigo() {
    const codigoNumeros = String(codigoActual).padStart(3, '0');
    const codigo = letra1 + letra2 + codigoNumeros;

    if (codigoActual < 999) {
        codigoActual++;
    } else {
        codigoActual = 1;
        letra2 = String.fromCharCode(letra2.charCodeAt(0) + 1);
        if (letra2 > 'Z') {
            letra2 = 'A';
            letra1 = String.fromCharCode(letra1.charCodeAt(0) + 1);
            if (letra1 > 'Z') {
                letra1 = 'A'; // Reiniciamos a 'A' si hemos llegado a 'Z'
            }
        }
    }

    return codigo;
}

function agregarProducto() {
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    // Acá Inserte algo nuevo
    const seccion = document.getElementById('seccion').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;
    const codigo = generarCodigo();

    const inventario = document.getElementById('inventario');

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${nombre}</td>
        <td>${descripcion}</td>
        <td>${seccion}</td>
        <td>${precio}</td>
        <td>${stock}</td>
        <td>${codigo}</td>
        <td>
            <button type="button" onclick="sumarStockProducto(this)">+ Stock</button>
            <button type="button" onclick="restarStockProducto(this)">- Stock</button>
        </td>
    `;

    inventario.appendChild(newRow);
    // Mostrar alerta
    alert("Producto añadido con éxito.");

}

function sumarStockProducto(button) {
    const row = button.parentElement.parentElement;
    const stockCell = row.querySelector('td:nth-child(5)');
    stockCell.textContent = Number(stockCell.textContent) + 1;
}

function restarStockProducto(button) {
    const row = button.parentElement.parentElement;
    const stockCell = row.querySelector('td:nth-child(5)');
    if (Number(stockCell.textContent) > 0) {
        stockCell.textContent = Number(stockCell.textContent) - 1;
    }
}

function sumarStock() {
    const codigo = document.getElementById('codigoStock').value;
    const cantidad = Number(document.getElementById('cantidad').value);

    const inventario = document.getElementById('inventario').getElementsByTagName('tr');
    for (let i = 1; i < inventario.length; i++) {
        const codigoProducto = inventario[i].getElementsByTagName('td')[5].textContent;
        if (codigo === codigoProducto) {
            const stockCell = inventario[i].getElementsByTagName('td')[4];
            stockCell.textContent = Number(stockCell.textContent) + cantidad;
            break;
        }
    }

    // Mostrar alerta
    alert("El producto ha sido correctamente modificado.");
}

function restarStock() {
    const codigo = document.getElementById('codigoStock').value;
    const cantidad = Number(document.getElementById('cantidad').value);

    const inventario = document.getElementById('inventario').getElementsByTagName('tr');
    for (let i = 1; i < inventario.length; i++) {
        const codigoProducto = inventario[i].getElementsByTagName('td')[5].textContent;
        if (codigo === codigoProducto) {
            const stockCell = inventario[i].getElementsByTagName('td')[4];
            if (Number(stockCell.textContent) >= cantidad) {
                stockCell.textContent = Number(stockCell.textContent) - cantidad;
            }
            break;
        }
    }
        // Mostrar alerta
        alert("El producto ha sido correctamente modificado.");
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
                <th>Sección</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Código</th>
            </tr>
        </table>
        <button type="button" onclick="distribuirStock('${nombreSucursal}')">Distribuir Stock</button>
    `;
    sucursal.tabla = nuevaTabla.querySelector('table');
    sucursalesContenido.appendChild(nuevaTabla);
    alert("Sucursal añadida con éxito.");
}

function distribuirStock(sucursalNombre) {
    const sucursal = sucursales.find(s => s.nombre === sucursalNombre);
    if (!sucursal) return;

    const codigo = prompt(`Ingrese el código del producto para la sucursal ${sucursalNombre}`);
    const cantidad = parseInt(prompt(`Ingrese la cantidad de stock a distribuir a la sucursal ${sucursalNombre}`));

    const inventario = document.getElementById('inventario').getElementsByTagName('tr');
    for (let i = 1; i < inventario.length; i++) {
        const codigoProducto = inventario[i].getElementsByTagName('td')[5].textContent;
        if (codigo === codigoProducto) {
            const stockCell = inventario[i].getElementsByTagName('td')[4];
            const cantidadDistribuida = Math.min(cantidad, Number(stockCell.textContent));
            stockCell.textContent = Number(stockCell.textContent) - cantidadDistribuida;

            const newRow = sucursal.tabla.insertRow();
            newRow.innerHTML = `
                <td>${inventario[i].getElementsByTagName('td')[0].textContent}</td>
                <td>${inventario[i].getElementsByTagName('td')[1].textContent}</td>
                <td>${inventario[i].getElementsByTagName('td')[2].textContent}</td>
                <td>${inventario[i].getElementsByTagName('td')[3].textContent}</td>
                <td>${cantidadDistribuida}</td>
                <td>${codigo}</td>
            `;
            sucursal.inventario.push({
                nombre: inventario[i].getElementsByTagName('td')[0].textContent,
                descripcion: inventario[i].getElementsByTagName('td')[1].textContent,
                seccion: inventario[i].getElementsByTagName('td')[2].textContent,
                precio: inventario[i].getElementsByTagName('td')[3].textContent,
                stock: cantidadDistribuida,
                codigo: codigo
            });
            
            break;
        }
    }
}

let productoSeleccionado = null;

function buscarProducto() {
    const codigo = document.getElementById('codigoProducto').value;
    const inventario = document.getElementById('inventario').getElementsByTagName('tr');

    for (let i = 1; i < inventario.length; i++) {
        const codigoProducto = inventario[i].getElementsByTagName('td')[5].textContent;

        if (codigo === codigoProducto) {
            const nombre = inventario[i].getElementsByTagName('td')[0].textContent;
            const descripcion = inventario[i].getElementsByTagName('td')[1].textContent;
            const seccion = inventario[i].getElementsByTagName('td')[2].textContent;
            const precio = inventario[i].getElementsByTagName('td')[3].textContent;
            const stock = inventario[i].getElementsByTagName('td')[4].textContent;

            productoSeleccionado = {
                nombre: nombre,
                descripcion: descripcion,
                seccion: seccion,
                precio: precio,
                stock: stock,
                codigo: codigo
            };

            // Mostrar los detalles del producto en la interfaz de modificación
            document.getElementById('nombreMod').value = nombre;
            document.getElementById('descripcionMod').value = descripcion;
            document.getElementById('seccionMod').value = seccion;
            document.getElementById('precioMod').value = precio;
            document.getElementById('stockMod').value = stock;

            // Mostrar la interfaz de modificación
            document.getElementById('modificarProducto').style.display = 'block';
            return; // Salir de la función después de encontrar el producto
        }
    }

    // Si llegamos aquí, significa que no se encontró el producto con el código ingresado
    alert("No se encontró ningún producto con el código proporcionado.");
}

function confirmarModificacion() {
    // Mostrar cuadro de diálogo de confirmación
    const confirmacion = confirm("¿Está seguro de que quiere modificar este producto?");

    if (confirmacion) {
        // Modificar el producto en la tabla de inventario
        const inventario = document.getElementById('inventario').getElementsByTagName('tr');

        for (let i = 1; i < inventario.length; i++) {
            const codigoProducto = inventario[i].getElementsByTagName('td')[5].textContent;

            if (productoSeleccionado.codigo === codigoProducto) {
                inventario[i].getElementsByTagName('td')[0].textContent = document.getElementById('nombreMod').value;
                inventario[i].getElementsByTagName('td')[1].textContent = document.getElementById('descripcionMod').value;
                inventario[i].getElementsByTagName('td')[2].textContent = document.getElementById('seccionMod').value;
                inventario[i].getElementsByTagName('td')[3].textContent = document.getElementById('precioMod').value;
                inventario[i].getElementsByTagName('td')[4].textContent = document.getElementById('stockMod').value;

                // Ocultar la interfaz de modificación después de modificar el producto
                document.getElementById('modificarProducto').style.display = 'none';

                // Mostrar alerta de modificación exitosa
                alert("Producto modificado con éxito.");
                return; // Salir de la función después de modificar el producto
            }
        }
    }
}

function cancelarModificacion() {
    // Ocultar la interfaz de modificación si se cancela
    document.getElementById('modificarProducto').style.display = 'none';
}

// HTML necesario:
// - Un cuadro de texto con el ID 'codigoProducto'
// - Un botón "Siguiente" que llama a la función buscarProducto
// - Una interfaz de modificación con campos para nombre, descripción, sección, precio y stock, y un botón "Aceptar" que llama a la función confirmarModificacion, y un botón "Cancelar" que llama a la función cancelarModificacion
// ...

function buscarProductos() {
    const criterio = document.getElementById('criterio').value;
    const busqueda = document.getElementById('busqueda').value.toLowerCase();
    const inventario = document.getElementById('inventario').getElementsByTagName('tr');
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';

    for (let i = 1; i < inventario.length; i++) {
        const valorCelda = inventario[i].getElementsByTagName('td')[getIndiceCriterio(criterio)].textContent.toLowerCase();

        if (valorCelda.includes(busqueda)) {
            const nombre = inventario[i].getElementsByTagName('td')[0].textContent;
            const descripcion = inventario[i].getElementsByTagName('td')[1].textContent;
            const seccion = inventario[i].getElementsByTagName('td')[2].textContent;
            const precio = inventario[i].getElementsByTagName('td')[3].textContent;
            const stock = inventario[i].getElementsByTagName('td')[4].textContent;
            const codigo = inventario[i].getElementsByTagName('td')[5].textContent;

            resultadosDiv.innerHTML += `
                <div>
                    <h3>${nombre}</h3>
                    <p>Descripción: ${descripcion}</p>
                    <p>Sección: ${seccion}</p>
                    <p>Precio: ${precio}</p>
                    <p>Stock: ${stock}</p>
                    <p>Código: ${codigo}</p>
                </div>
            `;
        }
    }
}

function getIndiceCriterio(criterio) {
    switch (criterio) {
        case 'nombre':
            return 0;
        case 'descripcion':
            return 1;
        case 'seccion':
            return 2;
        case 'precio':
            return 3;
        case 'stock':
            return 4;
        case 'codigo':
            return 5;
        default:
            return 0;
    }
}

// ...



