var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var view;
(function (view) {
    class VerPersonas {
        VerPersonasApi() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let respuestaApi = yield fetch(this.apiPersonas);
                    let data = yield respuestaApi.json();
                    data.forEach(persona => {
                        this.PersonasMap.set(persona.id, persona);
                    });
                    this.actualizarTabla();
                }
                catch (error) {
                    console.error("Error al obtener datos:", error);
                }
            });
        }
        constructor(container) {
            this.PersonasMap = new Map();
            this.ventana = new view.Ventana();
            this.apiPersonas = "https://raw.githubusercontent.com/05JesusMoreno/json_document/refs/heads/main/src/view/personas.json";
            this.PersonasMap.set(1, { id: 1, nombre: "Jesus", apellido: "Bautista Moreno", edad: 22, correo: "jesusbautista25@gmail.com", telefono: 7713217322, fechaN: new Date() });
            this.PersonasMap.set(2, { id: 2, nombre: "Amanda", apellido: "Lopez Hernandez", edad: 28, correo: "AmanLH25@gmail.com", telefono: 7713457124, fechaN: new Date() });
            this.mostrarLista(container);
        }
        mostrarLista(container) {
            return __awaiter(this, void 0, void 0, function* () {
                container.append("h2").text("Lista de Personas Registradas");
                yield this.VerPersonasApi();
                this.actualizarTabla();
                const buttonContainer = container.append("div")
                    .style("width", "80%")
                    .style("display", "flex")
                    .style("justify-content", "flex-end")
                    .style("margin-bottom", "10px");
                var busqueda = container.append("div")
                    .style("width", "80%")
                    .style("display", "flex")
                    .style("justify-content", "flex-start")
                    .style("margin-bottom", "10px");
                var inputBusqueda = busqueda.append("input")
                    .attr("type", "text")
                    .attr("placeholder", "Buscar Persona")
                    .style("padding", "8px 12px")
                    .style("border", "1px solid black")
                    .style("border-radius", "5px")
                    .style("font-size", "16px")
                    .on("input", () => {
                    var texto = inputBusqueda.property("value").toLowerCase();
                    var personasFiltradas = Array.from(this.PersonasMap.values()).filter(persona => persona.nombre.toLowerCase().includes(texto) ||
                        persona.apellido.toLowerCase().includes(texto));
                    this.actualizarTabla(personasFiltradas);
                });
                var botonBusqueda = busqueda.append("button")
                    .text("Buscar")
                    .style("padding", "8px 12px")
                    .style("background-color", "#007BFF")
                    .style("color", "white")
                    .style("border", "none")
                    .style("cursor", "pointer")
                    .style("border-radius", "5px")
                    .style("font-size", "16px")
                    .on("click", function () {
                    var texto = inputBusqueda.property("value");
                    console.log("Buscando:", texto);
                });
                buttonContainer.append("button")
                    .text("Agregar Persona")
                    .style("padding", "8px 12px")
                    .style("background-color", "#4CAF50")
                    .style("color", "white")
                    .style("border", "none")
                    .style("cursor", "pointer")
                    .style("border-radius", "5px")
                    .style("font-size", "18px")
                    .on("click", () => {
                    var container_reg = this.ventana.obtenerContenedor();
                    this.formulario(container_reg);
                    this.ventana.mostrar();
                });
                const tabla = container.append("table")
                    .style("width", "80%")
                    .style("border-collapse", "collapse")
                    .style("border", "1px solid black");
                let encabezadoTbl = tabla.append("thead").append("tr")
                    .style("border", "1px solid black")
                    .style("font-size", "19px");
                encabezadoTbl.append("th").text("ID");
                let ordenAscendenteNombre = true;
                encabezadoTbl.append("th").text("Nombre")
                    .style("cursor", "pointer")
                    .on("click", () => {
                    const personasOrdenadas = [...this.PersonasMap.values()]
                        .sort((a, b) => ordenAscendenteNombre
                        ? a.nombre.localeCompare(b.nombre)
                        : b.nombre.localeCompare(a.nombre));
                    this.PersonasMap = new Map(personasOrdenadas.map(p => [p.id, p]));
                    ordenAscendenteNombre = !ordenAscendenteNombre;
                    this.actualizarTabla(personasOrdenadas);
                });
                encabezadoTbl.append("th").text("Apellidos");
                encabezadoTbl.append("th").text("Edad");
                encabezadoTbl.append("th").text("correo");
                encabezadoTbl.append("th").text("Telefono");
                encabezadoTbl.append("th").text("Fecha de Nacimiento");
                encabezadoTbl.append("th").text("Actualizar");
                encabezadoTbl.append("th").text("Eliminar");
                let tbody = tabla.append("tbody");
                let filas = tbody.selectAll("tr")
                    .data(Array.from(this.PersonasMap.values()))
                    .enter()
                    .append("tr")
                    .datum(d => d);
                filas.append("td").text(d => d.id.toString());
                filas.append("td").text(d => d.nombre);
                filas.append("td").text(d => d.apellido);
                filas.append("td").text(d => d.edad.toString());
                filas.append("td").text(d => d.correo);
                filas.append("td").text(d => d.telefono);
                filas.append("td").text(d => d.fechaN.toLocaleString());
                filas.append("td").append("button")
                    .text("Editar")
                    .style("background-color", "#3A0AD5")
                    .style("font-size", "20px")
                    .style("color", "white")
                    .on("click", (event, d) => {
                    this.ActualizarPersona(d.id);
                });
                filas.append("td").append("button")
                    .text("Eliminar")
                    .style("background-color", "red")
                    .style("font-size", "20px")
                    .style("color", "white")
                    .on("click", (event, d) => {
                    this.eliminar(d.id);
                });
                d3.selectAll("th")
                    .style("border", "1px solid black")
                    .style("text-align", "center")
                    .style("font-size", "22px");
                d3.selectAll("td")
                    .style("border", "1px solid black")
                    .style("text-align", "center")
                    .style("font-size", "22px");
            });
        }
        actualizarTabla(personas) {
            const tbody = d3.select("tbody");
            tbody.selectAll("tr").remove();
            let data = personas !== null && personas !== void 0 ? personas : Array.from(this.PersonasMap.values());
            let filas = tbody.selectAll("tr")
                .data(data)
                .enter()
                .append("tr")
                .datum(d => d);
            filas.append("td").text(d => d.id.toString());
            filas.append("td").text(d => d.nombre);
            filas.append("td").text(d => d.apellido);
            filas.append("td").text(d => d.edad.toString());
            filas.append("td").text(d => d.correo);
            filas.append("td").text(d => d.telefono.toString());
            filas.append("td").text(d => d.fechaN.toLocaleString());
            filas.append("td").append("button")
                .text("Editar")
                .style("background-color", "#3A0AD5")
                .style("font-size", "20px")
                .style("color", "white")
                .on("click", (event, d) => {
                this.ActualizarPersona(d.id);
            });
            filas.append("td").append("button")
                .text("Eliminar")
                .style("background-color", "Red")
                .style("font-size", "20px")
                .style("color", "white")
                .on("click", (event, d) => {
                this.eliminar(d.id);
            });
            d3.selectAll("td")
                .style("border", "1px solid black");
        }
        formulario(container_form) {
            container_form.selectAll("*").remove();
            container_form.append("h3").text("Registrar Persona");
            container_form.append("label").text("Nombre");
            var inputNombre = container_form.append("input")
                .attr("type", "text").attr("id", "nombre");
            container_form.append("label").text("Apellidos");
            var inputApellidos = container_form.append("input")
                .attr("type", "text").attr("id", "apellidos");
            container_form.append("label").text("Edad");
            var inputEdad = container_form.append("input")
                .attr("type", "number").attr("id", "edad");
            container_form.append("label").text("Correo");
            var inputEmail = container_form.append("input")
                .attr("type", "email").attr("id", "correo");
            container_form.append("label").text("Teléfono");
            var inputTelefono = container_form.append("input")
                .attr("type", "number").attr("id", "telefono");
            container_form.append("label").text("Fecha de nacimiento");
            var inputFechaN = container_form.append("input")
                .attr("type", "date").attr("id", "fecha");
            container_form.append("button")
                .text("Registrar")
                .style("background-color", "blue")
                .style("color", "white")
                .style("border", "none")
                .style("cursor", "pointer")
                .style("border-radius", "5px")
                .style("font-size", "20px")
                .style("padding", "8px")
                .on("click", () => {
                var nombre = inputNombre.property("value");
                var apellidos = inputApellidos.property("value");
                var edad = parseInt(inputEdad.property("value"));
                var correo = inputEmail.property("value");
                var telefono = inputTelefono.property("value");
                var fechaN = new Date(inputFechaN.property("value"));
                if (nombre && apellidos && edad > 0 && correo && telefono && fechaN) {
                    var id = this.PersonasMap.size > 0 ? Math.max(...Array.from(this.PersonasMap.keys())) + 1 : 1;
                    const confirmar = window.confirm("¿Estás seguro de que deseas registrar esta persona?");
                    if (!confirmar) {
                        this.ventana.ocultar();
                        alert("cancelaste registrar la nueva persona");
                        return;
                    }
                    this.PersonasMap.set(id, { id, nombre, apellido: apellidos, edad, correo, telefono, fechaN });
                    alert("Persona agregada correctamente");
                    this.actualizarTabla();
                    this.ventana.ocultar();
                }
                else {
                    alert("Todos los campos son obligatorios y la edad debe ser válida.");
                }
            });
            container_form.append("button")
                .text("Cancelar")
                .style("background-color", "red")
                .style("color", "white")
                .style("border", "none")
                .style("cursor", "pointer")
                .style("border-radius", "5px")
                .style("font-size", "20px")
                .style("padding", "8px")
                .on("click", () => {
                this.ventana.ocultar();
            });
            d3.selectAll("input")
                .style("width", "60%")
                .style("font-size", "20px")
                .style("padding", "10px");
            d3.selectAll("label")
                .style("font-size", "18px")
                .style("padding", "8px");
        }
        ActualizarPersona(id) {
            const persona = this.PersonasMap.get(id);
            if (!persona) {
                alert("Persona no encontrada");
                return;
            }
            var container_reg = this.ventana.obtenerContenedor();
            container_reg.selectAll("*").remove();
            container_reg.append("h3").text("Actualizar Persona");
            container_reg.attr("data-id", id.toString());
            d3.select("#nombre").property("value", persona.nombre);
            d3.select("#apellidos").property("value", persona.apellido);
            d3.select("#edad").property("value", persona.edad.toString());
            d3.select("#correo").property("value", persona.correo);
            d3.select("#telefono").property("value", persona.telefono);
            d3.select("#fecha").property("value", persona.fechaN.toISOString().split("T")[0]);
            container_reg.append("label").text("Nombre");
            var inputNombre = container_reg.append("input")
                .attr("type", "text").attr("id", "nombre").property("value", persona.nombre);
            container_reg.append("label").text("Apellidos");
            var inputApellidos = container_reg.append("input")
                .attr("type", "text").attr("id", "apellidos").property("value", persona.apellido);
            container_reg.append("label").text("Edad");
            var inputEdad = container_reg.append("input")
                .attr("type", "number").attr("id", "edad").property("value", persona.edad);
            container_reg.append("label").text("Correo");
            var inputEmail = container_reg.append("input")
                .attr("type", "email").attr("id", "correo").property("value", persona.correo);
            container_reg.append("label").text("Teléfono");
            var inputTelefono = container_reg.append("input")
                .attr("type", "number").attr("id", "telefono").property("value", persona.telefono);
            container_reg.append("label").text("Fecha de nacimiento");
            var inputFechaN = container_reg.append("input")
                .attr("type", "date").attr("id", "fecha").property("value", persona.fechaN.toISOString().split("T")[0]);
            d3.selectAll("input")
                .style("width", "60%")
                .style("font-size", "20px")
                .style("padding", "10px");
            d3.selectAll("label")
                .style("font-size", "18px")
                .style("padding", "8px");
            container_reg.append("button")
                .text("Actualizar")
                .style("background-color", "blue")
                .style("color", "white")
                .style("border", "none")
                .style("cursor", "pointer")
                .style("border-radius", "5px")
                .style("font-size", "20px")
                .style("padding", "8px")
                .on("click", () => {
                const nuevoNombre = d3.select("#nombre").property("value");
                const nuevoApellido = d3.select("#apellidos").property("value");
                const nuevaEdad = parseInt(d3.select("#edad").property("value"));
                const nuevoCorreo = d3.select("#correo").property("value");
                const nuevoTelefono = d3.select("#telefono").property("value");
                const nuevaFechaN = new Date(d3.select("#fecha").property("value"));
                if (!nuevoNombre || !nuevoApellido || isNaN(nuevaEdad) || !nuevoCorreo || !nuevoTelefono || isNaN(nuevaFechaN.getTime())) {
                    alert("Todos los campos son obligatorios y deben ser válidos.");
                    return;
                }
                const confirmar = window.confirm("¿Estás seguro de que deseas actualizar los datos de esta persona?");
                if (!confirmar) {
                    this.ventana.ocultar();
                    alert("cancelaste actualizar los datos");
                    return;
                }
                this.PersonasMap.set(id, { id, nombre: nuevoNombre, apellido: nuevoApellido, edad: nuevaEdad, correo: nuevoCorreo, telefono: nuevoTelefono, fechaN: nuevaFechaN });
                alert("Persona actualizada correctamente");
                this.actualizarTabla();
                this.ventana.ocultar();
            });
            container_reg.append("button")
                .text("Cancelar")
                .style("background-color", "red")
                .style("color", "white")
                .style("border", "none")
                .style("cursor", "pointer")
                .style("border-radius", "5px")
                .style("font-size", "20px")
                .style("padding", "8px")
                .on("click", () => {
                this.ventana.ocultar();
            });
            this.ventana.mostrar();
        }
        eliminar(id) {
            const confirmar = window.confirm("¿Estás seguro de que deseas eliminar a esta persona?");
            if (!confirmar) {
                alert("Cancelaste eliminar a esta persona");
                return;
            }
            if (this.PersonasMap.delete(id)) {
                alert(`Eliminaste a la persona con ID ${id}.`);
                this.actualizarTabla();
                console.log(`Persona con ID ${id} eliminada.`);
            }
            else {
                console.log(`No se encontró la persona con ID ${id}.`);
            }
        }
    }
    view.VerPersonas = VerPersonas;
})(view || (view = {}));
//# sourceMappingURL=listaPersonas.js.map