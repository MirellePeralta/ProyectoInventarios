document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var nombre = document.getElementById('nombre').value;
    var descripcion = document.getElementById('descripcion').value;
    var precio = document.getElementById('precio').value;
    var stock = document.getElementById('stock').value;
    var code = document.getElementById('code').value;

    var newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${nombre}</td>
        <td>${descripcion}</td>
        <td>${precio}</td>
        <td>${stock}</td>
        <td>${code}</td>
    `;

    document.getElementById('productTable').getElementsByTagName('tbody')[0].appendChild(newRow);

    document.getElementById('productForm').reset();
});
