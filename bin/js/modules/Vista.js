var Module;
(function (Module) {
    class vistas {
        constructor(container_body) {
            this.viewBody(container_body);
        }
        viewBody(container_body) {
            container_body.append("div")
                .style("width", "100%")
                .style("heigth", "150px")
                .style("justify-content", "center")
                .style("align-items", "center")
                .style("", "");
            container_body.select("div").append("div")
                .style("width", "90%")
                .style("height", "150px")
                .style("justify-content", "center")
                .style("align-items", "center")
                .style("", "");
            container_body.select("div").select("div").append("p")
                .text(" Bienvenidos a Carpinteria el Osito")
                .style("font-size", "30px")
                .style("text-align", "center");
        }
    }
    Module.vistas = vistas;
})(Module || (Module = {}));
//# sourceMappingURL=Vista.js.map