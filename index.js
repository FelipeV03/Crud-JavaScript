var selectedRow = null

// Mostrar alertas
function showAlerts(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(()=> document.querySelector(".alert").remove(), 5000);
}





// Borrar todos los campos
function clearFields(){
    document.querySelector("#nombre").value = "";
    document.querySelector("#apellido").value = "";
    document.querySelector("#telefono").value = "";
    document.querySelector("#pais").value = "";
}





// Agrgar datos
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener valores de formulario
    const nombre = document.querySelector("#nombre").value;
    const apellido = document.querySelector("#apellido").value;
    const telefono = document.querySelector("#telefono").value;
    const pais = document.querySelector("#pais").value;

    // Validacion
    if(nombre == "" || apellido == "" || telefono == "" || pais == ""){
        showAlerts("Por favor rellena todos los campos", 'danger');
    }else{
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${nombre}</td>
                <td>${apellido}</td>
                <td>${telefono}</td>
                <td>${pais}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">Editar</a>
                <a href="#" class="btn btn-danger btn-sm delete">Eliminar</a>
                </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlerts("Registro añadido", 'success')
        }else{
            selectedRow.children[0].textContent = nombre;
            selectedRow.children[1].textContent = apellido;
            selectedRow.children[2].textContent = telefono;
            selectedRow.children[3].textContent = pais;
            selectedRow = null;
            showAlerts("Registro editado", 'info');
        }
        clearFields();
    }
});





// Editar datos
document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#nombre").value = selectedRow.children[0].textContent
        document.querySelector("#apellido").value = selectedRow.children[1].textContent
        document.querySelector("#telefono").value = selectedRow.children[2].textContent
        document.querySelector("#pais").value = selectedRow.children[3].textContent
    }
});





// Eliminar datos
document.querySelector("#student-list").addEventListener("click", (e) => {
    // alert("Registro eliminado");
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlerts("Registro eliminado", 'danger');
    };
});