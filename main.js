//let URLpeticiones = "https://desafio-bsale-api.herokuapp.com";


ListarProducto();
ListarProducto();
ListarProducto();
ListarProducto();
ListarProducto();
ListarProducto();
ListarProducto();
ListarProducto();
ListarProducto();
ListarProducto();


/**  
*Listar un producto en el div id=fila_productos
*/ 
function ListarProducto(){
    let DivRowProductos = document.getElementById("fila_productos");

    /*Definimos la estructura que tendra cada producto, para enteder mejor las variables abrir archivo
    estructura_producto.html, es un archivo guia de como esta formado el diseño HTML
    */ 
    let div1 = document.createElement("div");
    div1.className="col-md-4 col-sm-6 .col-6";
    
    let div2 = document.createElement("div");
    div2.className="card";
    
    let ul3 = document.createElement("ul");
    ul3.className="list-group list-group-flush";
    
    let li3_1_1 = document.createElement("li");
    li3_1_1.className="list-group-item";
    
    let div3_1_2 = document.createElement("div");
    div3_1_2.className="product-inner-box position-relative";
    
    let div3_1_3 = document.createElement("div");
    div3_1_3.className="onsale";
    
    let span3_1_4 = document.createElement("span");
    span3_1_4.className="badge";
    span3_1_4.insertAdjacentHTML("beforeEnd","-29%<br>dcto");
    
    let i3_1_5 = document.createElement("i");
    i3_1_5.className="fa fa-arrow-down";
    i3_1_5.ariaHidden=true;
    
    let img3_1_5 = document.createElement("img");
    img3_1_5.src="https://dojiw2m9tvv09.cloudfront.net/11132/product/absolut21381.png";
    //creando la estructura para el elemento li 3_1_1
    span3_1_4.appendChild(i3_1_5);
    div3_1_3.appendChild(span3_1_4);
    div3_1_2.appendChild(div3_1_3);
    div3_1_2.appendChild(img3_1_5);
    li3_1_1.appendChild(div3_1_2);
    
    
    
    let li3_2_1 = document.createElement("li");
    li3_2_1.className="list-group-item";
    
    let div3_2_2 = document.createElement("div");
    div3_2_2.className="product-information";
    
    let div3_2_3 = document.createElement("div");
    div3_2_3.className="";
    
    let H3_2_4 = document.createElement("h3");
    H3_2_4.className="";
    H3_2_4.insertAdjacentHTML("beforeEnd","Vodka")
    
    let div3_2_5 = document.createElement("div");
    div3_2_5.className="";
    
    let H3_2_6 = document.createElement("h5");
    H3_2_6.insertAdjacentHTML("beforeEnd","$7.000 ")
    
    let s3_2_7 = document.createElement("s");
    s3_2_7.className = "PreviusPrice";
    s3_2_7.insertAdjacentHTML("beforeEnd","$7.000")
    
    let div3_2_8 = document.createElement("div");
    div3_2_8.className="buy";
    
    let b3_2_9 = document.createElement("button");
    b3_2_9.className="btn shadow-sm rounded-pill btnbuy";
    b3_2_9.insertAdjacentHTML("beforeEnd","Añadir al carrito")
    
    let i3_2_10 = document.createElement("i");
    i3_2_10.className = "fa fa-shopping-cart";
    
    //creando la estructura para el elemento li 3_1_1
    b3_2_9.appendChild(i3_2_10);
    div3_2_8.appendChild(b3_2_9);
    H3_2_6.appendChild(s3_2_7);
    div3_2_5.appendChild(H3_2_6);
    
    div3_2_3.appendChild(H3_2_4);
    
    div3_2_2.appendChild(div3_2_3);
    div3_2_2.appendChild(div3_2_5);
    div3_2_2.appendChild(div3_2_8);
    li3_2_1.appendChild(div3_2_2);
    
    //creando la estructura para el elemento div 1
    ul3.appendChild(li3_1_1);
    ul3.appendChild(li3_2_1);
    div2.appendChild(ul3);
    div1.appendChild(div2);
    
    DivRowProductos.appendChild(div1);

}