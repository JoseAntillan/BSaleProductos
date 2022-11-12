let URLpeticiones = "https://desafio-bsale-api.herokuapp.com";
//preguntar si en la url viene el filtro para busqueda, si es asi listamos con el filtro
let queryStrings = new URLSearchParams(window.location.search);
let parametrosGet = Object.fromEntries(queryStrings.entries());

//si el parametro filtro existe y es distinto de "" buscara los productos
//si no es asi litara todos los productos
if (parametrosGet && parametrosGet.filtro.trim() !="" ){
    BuscarProductos(parametrosGet.filtro);
    
}

else{
    //listar todos los productos
    ListarProductos(0);
}


//ListarCategoriasCheckbox();
  ListarTodasCategorias();




/*------------------------------FUNCIONES PRODUCTO------------

/**  
*Listar todos los productos
*@param {number} categoria - id de la categoria, si es 0 se listaran todos los productos
*/ 
function ListarProductos(categoria){
    let endpoint = URLpeticiones;

    if(categoria==0){
        endpoint+="/productos"
    }
    else{
        endpoint+="/categorias/"+categoria+"/listarproductos"
    }


    fetch(endpoint)
    .then(res=> res.json())
    .then(productos=>{
      for (let index = 0; index < productos.Productos.length; index++) {
          ListarProducto(productos.Productos[index]);
         }
    })
}



/**  
*buscar productos
*@param {string} filtro - filtro para buscar productos, los datos llegan filtrados desde la api
*/ 
function BuscarProductos(filtro){
    let endpoint = URLpeticiones;
    endpoint+="/productos?busqueda="+filtro

    //limpiar la fila de productos
    let DivRowProductos = document.getElementById("fila_productos");
    DivRowProductos.textContent = '';
    
    //llamamos a la api
    fetch(endpoint)
    .then(res=> res.json())
    .then(productos=>{
        //si la api nos devuleve 0 productos escribimos que no hubo coincidencia
        //si devuelve por lo menos 1 escribimos la cantidad de productos encontrados 
        if(productos.Productos.length<=0){
            console.log("productos no encontrados")
            DivRowProductos.insertAdjacentHTML("afterBegin","<h1>ningun producto contiene la palabra "+filtro+"</h1>");
        }
        else{
            //listar productos 1 por 1
            for (let index = 0; index < productos.Productos.length; index++) {
                ListarProducto(productos.Productos[index]);
               }
               DivRowProductos.insertAdjacentHTML("afterBegin","<h1>"+productos.Productos.length+" productos encontrados!</h1>");

        }


    })
}







/**  
*Listar un producto en el div id=fila_productos
*@param {object} producto - entregamos el producto para listar
*/ 
function ListarProducto(producto){
    let DivRowProductos = document.getElementById("fila_productos");
    //definir si el producto tiene descuento
    let Descuento = false;
    if (producto.discount>0){
        Descuento = true;
    }
    

    /*Definimos la esstructura que tendra cada producto, para enteder mejor las variables abrir archivo
    estructura_producto.html, es un archivo guia de como esta formado el diseño HTML
    */ 
    let div1 = document.createElement("div");
    div1.className=" col-md-4 col-sm-6 .col-6";


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
    
    //si el producto tiene descuento se agregaran los elementos visualez que indican el descuento
    if (Descuento){
        let span3_1_4 = document.createElement("span");
        span3_1_4.className="badge";
        span3_1_4.insertAdjacentHTML("beforeEnd","-"+producto.discount+"%<br>dcto");
        
        let i3_1_5 = document.createElement("i");
        i3_1_5.className="fa fa-arrow-down";
        i3_1_5.ariaHidden=true;
    
        span3_1_4.appendChild(i3_1_5);
        div3_1_3.appendChild(span3_1_4);
    }
    
    let img3_1_5 = document.createElement("img");
    //si la imagen es nulla o string vacio pondremos una imagen de repuesto
    if(producto.url_image == "" || producto.url_image == null){
        img3_1_5.src="data:image/png;base64,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";  
    }
    else{
        img3_1_5.src=producto.url_image;
    }
    
    //creando la estructura para el elemento li 3_1_1

    div3_1_2.appendChild(div3_1_3);
    div3_1_2.appendChild(img3_1_5);
    li3_1_1.appendChild(div3_1_2);
    
    
    
    let li3_2_1 = document.createElement("li");
    li3_2_1.className="list-group-item";
    
    let div3_2_2 = document.createElement("div");
    div3_2_2.className="product-information";
    
    let div3_2_3 = document.createElement("div");
    div3_2_3.className="fondo";
    
    let H3_2_4 = document.createElement("h4");
    H3_2_4.className="";
    H3_2_4.insertAdjacentHTML("beforeEnd","<br><br>"+producto.name)
    
    let div3_2_5 = document.createElement("div");
    div3_2_5.className="";
    
    let H3_2_6 = document.createElement("h5");
    
    
    let s3_2_7 = document.createElement("s");

    //si el producto tiene descuento los elementos se ordenaran de esta forma
    if (Descuento){
        //se calcula el precio final
        let PrecioFinal = producto.price - ((producto.price * producto.discount ) / 100)

        H3_2_6.insertAdjacentHTML("beforeEnd","$"+PrecioFinal+" ")

        //se agrega el precio sin dcto tachado y en color rojo
        s3_2_7.className = "PreviusPrice";
        s3_2_7.insertAdjacentHTML("beforeEnd",producto.price)
    }
    //si el producto no tiene descuento se omitira el precio tachado en rojo 
    //y solo se agregara el precio normal
    else{
        H3_2_6.insertAdjacentHTML("beforeEnd","$"+producto.price+" ")
    }

    
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




/*------------------------------FUNCIONES CATEGORIAS------------



/**  
*Listar todas las categorias
*
*/ 
function ListarTodasCategorias(){
    let endpoint = URLpeticiones + "/categorias";

    fetch(endpoint)
    .then(res=> res.json())
    .then(categorias=>{ 
        let TotalProductos=0;
        //recorrer las categorias para agregarlas a la lista y contar la cantidad de productos que tiene cada categoria
       for (let index = 0; index < categorias.Categorias.length; index++) {
        ListarCategoria(categorias.Categorias[index].id,categorias.Categorias[index].name,false,categorias.Categorias[index].cantidad_productos);
        TotalProductos += categorias.Categorias[index].cantidad_productos;
       }
        //crear la categoria "todos los productos", true para dejar que sea la opcion elegida por defecto
        ListarCategoria(0,"Todos los productos",true,TotalProductos);
        


    })

}

/**  
*Siempre que un checkbox de categoria cambie se lanza esta funcion para listar productos por categoria
*/ 
function Checkproductos(){
    let Categoriaid = document.querySelector('input[name="vbtn-radio"]:checked').value;
    //limpiar la fila de productos
    let DivRowProductos = document.getElementById("fila_productos");
    DivRowProductos.textContent = '';
    ListarProductos(Categoriaid);
}

/**  
*Listar 1 categorias en el div id=ListaCategoria
*la lista de categorias quedara con checkbox, cada value de 1 checkbox contiene el id de la categoria en "value"
*@param {string} id - id de la categoria
*@param {string} name - nombre de la categoria
*@param {boolean} checked - si es true sera el radio seleccionado por defecto
*@param {number} CantidadProductos - cantidad de productos que contiene la categoria
*/ 
function ListarCategoria(id,name,checked,CantidadProductos){
    let DivCategorias = document.getElementById("ListaCategorias");
    let input1 = document.createElement("input");

    input1.type="radio";
    input1.className="btn-check";
    input1.name="vbtn-radio";
    input1.id="vbtn-radio"+id;
    input1.autocomplete="off";
    input1.value=id;
    input1.checked =checked;
    input1.onclick=Checkproductos;

    let labelCategoria = document.createElement("label");
    labelCategoria.className="btn btn-outline-danger";
    labelCategoria.htmlFor=input1.id;
    labelCategoria.id="labelcategory"+id;
    labelCategoria.insertAdjacentHTML("beforeEnd","<h6>"+name+"</h6>"+"("+CantidadProductos+" productos)");


    DivCategorias.appendChild(input1);
    DivCategorias.appendChild(labelCategoria);

}