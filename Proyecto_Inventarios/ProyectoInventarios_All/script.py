import tkinter as tk
from tkinter import ttk
import pandas as pd

# Inicializamos una lista para almacenar los productos
productos = []

# Función para agregar un producto
def agregar_producto():
    nombre = entry_nombre.get()
    descripcion = entry_descripcion.get()
    precio = float(entry_precio.get())
    stock = int(entry_stock.get())
    code = entry_code.get()

    producto = {
        'nombre': nombre,
        'descripcion': descripcion,
        'precio': precio,
        'stock': stock,
        'code': code,
    }

    productos.append(producto)
    actualizar_tabla()

# Función para actualizar la tabla
def actualizar_tabla():
    for i in tree.get_children():
        tree.delete(i)

    for producto in productos:
        tree.insert("", "end", values=(producto['nombre'], producto['descripcion'], producto['precio'], producto['stock'], producto['code']))

# Crear ventana principal
root = tk.Tk()
root.title("Registro de Productos")

# Crear y posicionar etiquetas y campos de entrada
ttk.Label(root, text="Nombre del Producto:").grid(row=0, column=0, sticky="w")
entry_nombre = ttk.Entry(root)
entry_nombre.grid(row=0, column=1)

ttk.Label(root, text="Descripción:").grid(row=1, column=0, sticky="w")
entry_descripcion = ttk.Entry(root)
entry_descripcion.grid(row=1, column=1)

ttk.Label(root, text="Precio:").grid(row=2, column=0, sticky="w")
entry_precio = ttk.Entry(root)
entry_precio.grid(row=2, column=1)

ttk.Label(root, text="Stock:").grid(row=3, column=0, sticky="w")
entry_stock = ttk.Entry(root)
entry_stock.grid(row=3, column=1)

ttk.Label(root, text="Código:").grid(row=4, column=0, sticky="w")
entry_code = ttk.Entry(root)
entry_code.grid(row=4, column=1)

# Botón para agregar producto
ttk.Button(root, text="Agregar Producto", command=agregar_producto).grid(row=5, column=0, columnspan=2, pady=10)

# Crear tabla
tree = ttk.Treeview(root, columns=("Nombre", "Descripción", "Precio", "Stock", "Código"), show="headings")
tree.heading("Nombre", text="Nombre")
tree.heading("Descripción", text="Descripción")
tree.heading("Precio", text="Precio")
tree.heading("Stock", text="Stock")
tree.heading("Código", text="Código")
tree.grid(row=6, column=0, columnspan=2)

# Iniciar ventana
root.mainloop()
