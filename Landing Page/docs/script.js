let currentIndex = 0;
const images = document.querySelectorAll('.galeria-contenedor img');

function cambiarImagen(direccion) {
    currentIndex += direccion;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    images.forEach(img => {
        img.style.transform = `translateX(-${currentIndex * 100}%)`;
    });
}

function enviarCorreo() {
    var nombre = document.getElementById("nombre").value;
    var empresa = document.getElementById("empresa").value;
    var email = document.getElementById("email").value;
    var telefono = document.getElementById("telefono").value;

    var contenido = "Nombre: " + nombre + "\n";
    contenido += "Empresa: " + empresa + "\n";
    contenido += "Correo electrónico: " + email + "\n\n";
    contenido += "Teléfono:\n" + telefono;

    var asunto = "Nuevo mensaje de contacto";

    // Mostrar ventana de confirmación
    var confirmacion = confirm("Al enviar este formulario, acepto la Política de Privacidad de Wise Stock. Entiendo que mi información será utilizada únicamente para los fines de esta solicitud y no será compartida con terceros. ¿Estás seguro de enviar el formulario?");

    // Si el usuario hace clic en "Aceptar"
    if (confirmacion) {
        // Componer el enlace de correo
        var mailtoLink = "mailto:contacto@wisestock.tech" + "?subject=" + encodeURIComponent(asunto) + "&body=" + encodeURIComponent(contenido);

        // Abrir el cliente de correo del usuario
        window.location.href = mailtoLink;
    }
}

document.getElementById("btnEnviar").addEventListener("click", enviarCorreo);

