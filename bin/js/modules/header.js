var Module;
(function (Module) {
    class Header {
        constructor(container_header) {
            this.header(container_header);
        }
        header(container_header) {
            container_header.append("div")
                .style("width", "100%")
                .style("height", "150px")
                .style("padding-top", "1%")
                .style("display", "flex")
                .style("justify-content", "center")
                .style("align-items", "center")
                .style("gap", "20px");
            container_header.select("div").append("button")
                .text("Inicio")
                .on("click", () => {
                d3.select("#container_body").html("");
                new view.Inicio(d3.select("#container_body"));
            });
            container_header.select("div").append("button")
                .text("Ver Personas")
                .on("click", () => {
                var vista = d3.select("#container_body").html("");
                new view.VerPersonas(vista);
            });
            d3.selectAll("button")
                .style("font-size", "24px")
                .style("border", "none")
                .style("background-color", "#fff");
        }
    }
    Module.Header = Header;
})(Module || (Module = {}));
//# sourceMappingURL=header.js.map