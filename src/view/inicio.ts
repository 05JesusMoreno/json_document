namespace view {
    export class Inicio {
        constructor(container_inicio: d3.Selection<d3.BaseType, unknown, HTMLElement, any>) {
            this.inicio(container_inicio);
        }

        private inicio(container_inicio: d3.Selection<d3.BaseType, unknown, HTMLElement, any>) {
            container_inicio
                .style("display", "flex")
                .style("align-items", "center")
                .style("flex-direction", "column")
                .style("width", "100%");
        
            container_inicio.append("p")
                .text("Bienvenidos a Carpinteria el Osito")
                .style("font-size", "30px")
                .style("text-align", "center");
        
            var card = container_inicio.append("div")
                .style("border-radius", "5px")
                .style("width", "90%") 
                .style("background", "#fff")
                .style("display", "grid")
                .style("grid-template-columns", "repeat(3, 1fr)") 
                .style("gap", "15px")
                .style("padding", "10px")
                .style("box-shadow", "0px 0px 10px rgba(0,0,0,0.1)");
        
            const imagenes = [
                "./images/mueblePared.webp",
                "./images/mueblePared.webp",
                "./images/mueblePared.webp",
                "./images/mueblePared.webp",
                "./images/mueblePared.webp",
                "./images/mueblePared.webp"
            ];
            imagenes.forEach(src => {
                card.append("img")
                    .attr("src", src)
                    .attr("alt", "mueble")
                    .style("width", "100%")
                    .style("height", "auto")
                    .style("border-radius", "5px")
                    .style("object-fit", "cover");
            });
        }
    }
}
