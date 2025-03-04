namespace App {
    export class app{
        constructor(){
            d3.select("body").style("margin", "0")
            .style("padding", "0");
        // Contenedor del Header
        var container_header = d3.select("body")
            .append("div")
            .style("width", "100%")
            .style("height", "auto");
        new Module.Header(container_header);
        //Contenedor del Body
        var container_body = d3.select("body")
            .append("div")
            .attr("id", "container_body") 
            .style("width", "80%")
            .style("height", "auto")
            .style("padding", "2%");
        new view.Inicio(container_body);
        }
    }
}
new App.app()
