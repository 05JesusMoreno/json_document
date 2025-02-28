var view;
(function (view) {
    class Ventana {
        constructor() {
            this.ventana = d3.select("body").append("div")
                .attr("id", "VentanaFlotante")
                .style("position", "fixed")
                .style("top", "50%")
                .style("left", "50%")
                .style("transform", "translate(-50%, -50%)")
                .style("width", "500px")
                .style("height", "700px")
                .style("background-color", "lightgrey")
                .style("border", "2px solid #000")
                .style("display", "none")
                .style("z-index", "1000")
                .style("padding", "10px")
                .style("cursor", "move")
                .style("flex-direction", "column")
                .style("align-items", "center")
                .style("justify-content", "space-between");
            this.ventana.append("button")
                .text("X")
                .style("color", "red")
                .style("position", "absolute")
                .style("right", "10px")
                .style("border-radius", "5px")
                .style("cursor", "pointer")
                .on("click", () => this.ocultar());
            this.contenedorClase = this.ventana.append("div")
                .attr("id", "contenidoFigura")
                .style("margin-top", "5%")
                .style("width", "100%")
                .style("background-color", "#ccc")
                .style("height", "90%")
                .style("display", "flex")
                .style("align-items", "center")
                .style("flex-direction", "column");
            d3.drag()
                .on("drag", (mouse) => {
                let left = parseFloat(this.ventana.style("left")) + mouse.dx;
                let top = parseFloat(this.ventana.style("top")) + mouse.dy;
                this.ventana.style("left", `${left}px`).style("top", `${top}px`);
            })(this.ventana);
        }
        mostrar() {
            this.ventana.style("display", "block");
        }
        ocultar() {
            this.ventana.style("display", "none");
        }
        obtenerContenedor() {
            return this.contenedorClase;
        }
    }
    view.Ventana = Ventana;
})(view || (view = {}));
//# sourceMappingURL=ventanaRegistro.js.map