const cuerpo = document.querySelector("body");
const inputTexto = document.querySelector(".input-text-codificador");
const mensaje = document.querySelector(".text-decodificador");
const botonEncriptar = document.querySelector("#bto-encripta");
const botonDesencriptar = document.querySelector("#bto-desencripta");
const botonLimpiar = document.querySelector("#bto-limpia");
const botonCopiar = document.querySelector("#bto-copiar");
const areaCambiante = document.getElementById("#seccion-der");
const matrizCodificadora = [["a","ai"],["e","enter"],["i","imes"],["o","ober"],["u","ufat"]];

mensaje.style.display="none";
botonCopiar.style.display="none";

botonEncriptar.addEventListener("click",function(){
    const textoEncriptado = encriptar(inputTexto.value);
    mensaje.value = textoEncriptado;
    if(inputTexto.value!=""){
        ocultar("#figura");
        ocultar("#msg1");
        ocultar("#msg2");
        mostrar("#txt-deco");
        mostrar("#bto-copiar");
        areaCambiante.style.display = "flex";
        areaCambiante.style.justifyElement = "center";
        areaCambiante.style.alignElement = "center";
    }
    else{
        mensajeError();
    }
});

botonDesencriptar.addEventListener("click",function(){
    if(inputTexto.value!=""){   
        const textoDesencriptado = desencriptar(inputTexto.value);
        mensaje.value = textoDesencriptado;
        ocultar("#figura");
        ocultar("#msg1");
        ocultar("#msg2");
        mostrar("#txt-deco");
        mostrar("#bto-copiar");
    }
    else{
        mensajeError();
    }
});

botonLimpiar.addEventListener("click", function(){
    inputTexto.value="";
    mensaje.value="";
    ocultar("#txt-deco");
    ocultar("#bto-copiar");
    mostrar("#figura");
    mostrar("#msg1");
    mostrar("#msg2");
});

function encriptar(textoIngresado){
    let textoAencriptar = textoIngresado.toLowerCase();
    let arregloAencriptar=textoAencriptar.split('');
    for(let x=0; x<arregloAencriptar.length;x++){
        for (let i=0; i<matrizCodificadora.length; i++){
            if(arregloAencriptar[x]==(matrizCodificadora[i][0])){
                arregloAencriptar[x]=matrizCodificadora[i][1];
                break;
            }
        }
    };
    textoAencriptar="";
    arregloAencriptar.forEach(function(caracter){
        textoAencriptar=textoAencriptar.concat(caracter);
    });
    return textoAencriptar;
}

function desencriptar(textoIngresado){
    let textoAdesencriptar = textoIngresado.toLowerCase();
    for(let i=0; i<matrizCodificadora.length;i++){
        if(textoAdesencriptar.includes(matrizCodificadora[i][1])){
            textoAdesencriptar=textoAdesencriptar.replaceAll(matrizCodificadora[i][1],matrizCodificadora[i][0]);
        }
    }
    return textoAdesencriptar;
}

function copiar(){
    let textoCopiado = document.getElementById("txt-deco").value;
    navigator.clipboard.writeText(textoCopiado);
    getClipboardContent();
    ocultar("#txt-deco");
    ocultar("#bto-copiar");
    mostrar("#figura");
    mostrar("#msg1");
    mostrar("#msg2");
}

async function getClipboardContent(){
    inputTexto.value = await navigator.clipboard.readText();
}

function ocultar(id){
    let aux = document.querySelector(id);
    aux.style.display="none"; //redistribuye elemento de la página al ocultarse el elemento
    //figura.style.visibility="hidden"; conserva el lugar del elemento oculto
}

function mostrar(id){
    let aux = document.querySelector(id);
    aux.style.display="";
    //figura.style.visibility="visible";
}

function mensajeError(){
    cuerpo.style.opacity = 0.2;
    setTimeout(function(){
        alert("Ingrese texto a encriptar");
        cuerpo.style.opacity = 1;
    }, 200); 
}