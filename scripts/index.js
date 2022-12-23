//Variables
let colorUIBG = document.getElementById("contenedorGeneralCustom"),
  colorUIBotones = document.getElementsByClassName("botonPopUp"),
  cambioColorCss = document.getElementById("cssCambio"),
  popup = document.getElementById("popUpPlay"),
  waveUno = document.getElementById("waveUnoEleccion"),
  waveDos = document.getElementById("waveDosEleccion"),
  waveTres = document.getElementById("waveTresEleccion"),
  bordeWaveUno = document.getElementById("imagenContenedorWave1"),
  bordeWaveDos = document.getElementById("imagenContenedorWave2"),
  bordeWaveTres = document.getElementById("imagenContenedorWave3"),
  waveJuego = document.getElementById("waveObjetivoPlay"),
  playPaguina = document.getElementById("contenedorGeneralGame"),
  color = 0,
  sinElegir = 3;
iniciar = false;

//---------------------------popUp---------------------------//

//Función abrir popUp
function openPopUp() {
  popup.classList.add("openPupUp");

  if (location.pathname.includes("/play.html")) {
    playPaguina.classList.add("difuminadoFondo");
  } else if (location.pathname.includes("/custom.html")) {
    colorUIBG.classList.add("difuminadoFondo");
  }
}

//Función cerrar popUp
function closePopUp() {
  popup.classList.remove("openPupUp");
  if (location.pathname.includes("/play.html")) {
    playPaguina.classList.remove("difuminadoFondo");
  } else if (location.pathname.includes("/custom.html")) {
    colorUIBG.classList.remove("difuminadoFondo");
  }
}

//---------------------------Customizar---------------------------//
//
if (location.pathname.includes("/custom.html")) {
  cambioColorWavePopUp();
  color = JSON.parse(sessionStorage.getItem("color"));
  if (color === 0) {
    if(sinElegir === 3){
      sinElegir = 0;
    }else if(sinElegir === 2){
      sinElegir = 2;
    }
   
  }else {
    if(sinElegir === 3){
      sinElegir = 1;
    }else if(sinElegir === 2){
      sinElegir = 2;
    }
  }
  sessionStorage.setItem("sinElegir", JSON.stringify(sinElegir));
}

//Función cambiar el color del UI y guardarlo
//asigna a la variable color el valor de la variable global guardada con sessionStorage, dependiendo del valor que tenga (0 o 1) cargara en la página el estilo y le asignara el valor correspondiente a ese estilo a la variable
//color. Con el setItem guardará el valor de color en el "color" (variable global).
function cambioColor() {
  color = JSON.parse(sessionStorage.getItem("color"));
  sinElegir = JSON.parse(sessionStorage.getItem("sinElegir"));

  if (color == 0) {
    cambioColorCss.href = "styles/estilo.css";
    if (sinElegir == 0) {
      sinElegir = 1;
    }
    color = 1;
  } else {
    cambioColorCss.href = "styles/estilosCambioColorUI.css";
    if (sinElegir == 1) {
      sinElegir = 0;
    }
    color = 0;
  }

  sessionStorage.setItem("color", JSON.stringify(color));
  sessionStorage.setItem("sinElegir", JSON.stringify(sinElegir));

  cambioColorWavePopUp();
}

//Dependiendo del valor de color asignado por la función cambioColor aplicará un estilo a cada página web
color = JSON.parse(sessionStorage.getItem("color"));
if (color == 0) {
  cambioColorCss.href = "styles/estilosCambioColorUI.css";
} else {
  cambioColorCss.href = "styles/estilo.css";
}

//Esta función asigna a una variable global un número. Con este número se elegirá el wave que el usuario desea usar
//Este valor viene de pulsar en los iconos de los waves de la opción de custom
function elegirWave(opcion) {
  let numeroWave = JSON.parse(sessionStorage.getItem("numeroWaveGloval"));
  if (opcion === "waveUno") {
    numeroWave = 1;
  } else if (opcion === "waveDos") {
    numeroWave = 2;
  } else if (opcion === "waveTres") {
    numeroWave = 3;
  }
  sessionStorage.setItem("numeroWaveGloval", JSON.stringify(numeroWave));
  sessionStorage.setItem("sinElegir", JSON.stringify(2));
}

//Este código solo se cargará en la página play.html, ya que es el único en el que se encuentra el id contenedorGeneralGame
//Dependiendo de la variable global asignada en el anterior método, se le asignara una foto diferente al wave del juego

if (playPaguina !== null) {
  let numeroWave = JSON.parse(sessionStorage.getItem("numeroWaveGloval"));
  sinElegir = JSON.parse(sessionStorage.getItem("sinElegir"));
  if (sinElegir === 0) {
    waveJuego.src = "imgs/caraRiendoDos_rojo.png";
  } else if (sinElegir === 1) {
    waveJuego.src = "imgs/caraRiendoDos_Azul.png";
  } else if (sinElegir === 2) {
    if (color === 1) {
      if (numeroWave == 1) {
        waveJuego.src = "imgs/caraRiendoDos_Azul.png";
      } else if (numeroWave == 2) {
        waveJuego.src = "imgs/caraSonriente_Azul.png";
      } else if (numeroWave == 3) {
        waveJuego.src = "imgs/gatoGD_azul.png";
      }
    } else {
      if (numeroWave == 1) {
        waveJuego.src = "imgs/caraRiendoDos_rojo.png";
      } else if (numeroWave == 2) {
        waveJuego.src = "imgs/caraSonriente_Rojo.png";
      } else if (numeroWave == 3) {
        waveJuego.src = "imgs/gatoGD_rojo.png";
      }
    }
  }
}

//Esta función utiliza la variable global numeroWaveGloval obtenida en elegirWave que indica el wave que el usuario a seleccionado
//Con esta función se le aplicará un estilo al wave seleccionado que pondrá color al borde del contenedor para saber si estas seleccionado
//el wave o no
function seleccionarWave() {
  let numeroWave = JSON.parse(sessionStorage.getItem("numeroWaveGloval"));
  if (numeroWave === 1) {
    bordeWaveUno.classList.add("imagenContenedorSelecionas");
    bordeWaveDos.classList.remove("imagenContenedorSelecionas");
    bordeWaveTres.classList.remove("imagenContenedorSelecionas");
  } else if (numeroWave === 2) {
    bordeWaveUno.classList.remove("imagenContenedorSelecionas");
    bordeWaveDos.classList.add("imagenContenedorSelecionas");
    bordeWaveTres.classList.remove("imagenContenedorSelecionas");
  } else if (numeroWave === 3) {
    bordeWaveUno.classList.remove("imagenContenedorSelecionas");
    bordeWaveDos.classList.remove("imagenContenedorSelecionas");
    bordeWaveTres.classList.add("imagenContenedorSelecionas");
  }
  sinElegir = 2;
  sessionStorage.setItem("sinElegir", JSON.stringify(sinElegir));
}

//Esta funcion actualiza los colores de los waves en el popup que aparece tras pulsar en wave en custom. Se llama en la funcion cambioColor() para que se aplique
//cuando el usuario cambie el color del ui
function cambioColorWavePopUp() {
  if (JSON.parse(sessionStorage.getItem("color")) == null) {
    color = 1;
    if (color === 1) {
      waveUno.src = "imgs/caraRiendoDos_Azul.png";
      waveDos.src = "imgs/caraSonriente_Azul.png";
      waveTres.src = "imgs/gatoGD_azul.png";
    } else {
      waveUno.src = "imgs/caraRiendoDos_rojo.png";
      waveDos.src = "imgs/caraSonriente_Rojo.png";
      waveTres.src = "imgs/gatoGD_rojo.png";
    }
  } else {
    color = JSON.parse(sessionStorage.getItem("color"));
    if (color === 1) {
      waveUno.src = "imgs/caraRiendoDos_Azul.png";
      waveDos.src = "imgs/caraSonriente_Azul.png";
      waveTres.src = "imgs/gatoGD_azul.png";
    } else {
      waveUno.src = "imgs/caraRiendoDos_rojo.png";
      waveDos.src = "imgs/caraSonriente_Rojo.png";
      waveTres.src = "imgs/gatoGD_rojo.png";
    }
  }
}

//---------------------------Opciones---------------------------//

//Primero se comprueba que estemos en la página ajustes para que no falle la página. Simplemente se comprueba que existe el id barrasOptionsContenedor, ya que este solo se encuentra en la página de opciones.
//Se optienen los datos de "la posición de la barra" y el valor que tiene este. Con el if se comprueba que getItem no esta vacío para que el contenido del mismo no de undefined. Para que lo anterior no pase
//la primera vez que entre a la página opciones no entrara en el if para evitar el fallo y se ejecutara el oninput(detecta los eventos de la barra de deslizamiento). Se asigna el valor al contenido y se guarda
//en sessionStorage.setItem el valor para que la próxima vez que se ejecute pueda entrar en el primer if y se guarden los valores hasta que se cierre la página
let opcionesPagina = document.getElementById("barrasOptionsContenedor");
if (opcionesPagina !== null) {
  let barraGFX = document.getElementById("barraValorOpcionesGFX");
  let valorGFX = document.getElementById("demoGFX");
  if (sessionStorage.getItem("barraGFX") !== null) {
    barraGFX.value = sessionStorage.getItem("barraGFX");
    valorGFX.innerHTML = sessionStorage.getItem("barraGFX");
  }
  barraGFX.oninput = function () {
    valorGFX.innerHTML = this.value;
    sessionStorage.setItem("barraGFX", this.value);
  };

  let barraBGM = document.getElementById("barraValorOpcionesGBM");
  let valorBGM = document.getElementById("demoGBM");
  if (sessionStorage.getItem("barraBGM") !== null) {
    barraBGM.value = sessionStorage.getItem("barraBGM");
    valorBGM.innerHTML = sessionStorage.getItem("barraBGM");
  }
  barraBGM.oninput = function () {
    valorBGM.innerHTML = this.value;
    sessionStorage.setItem("barraBGM", this.value);
  };

  let barraSFX = document.getElementById("barraValorOpcionesSFX");
  let valorSFX = document.getElementById("demoSFX");
  if (sessionStorage.getItem("barraSFX") !== null) {
    barraSFX.value = sessionStorage.getItem("barraSFX");
    valorSFX.innerHTML = sessionStorage.getItem("barraSFX");
  }
  barraSFX.oninput = function () {
    valorSFX.innerHTML = this.value;
    sessionStorage.setItem("barraSFX", this.value);
  };
}

//---------------------------Juego---------------------------//
// Obtener elementos del DOM
let contadorAciertos = document.getElementById("spanPuntos"),
  contadorTiempo = document.getElementById("spanTiempo"),
  botonJugar = document.getElementById("bontonEmpezar"),
  botonJugarOtraVez = document.getElementById("bontonEmpezarOtraVez"),
  areaJuego = document.getElementById("areaJuegoBordesPlay"),
  tiempoTotal = 60,
  tiempoRestante = tiempoTotal,
  numeroAciertos = 0,
  temporizadorJuego,
  temporizador,
  temporizadorPausa,
  tiempoTranscurrido = 0;

//Si esta en /play.html el codigo se usara
if (location.pathname.includes("/play.html")) {
  //Se oculta el boton, jugar otra vez y el wave
  botonJugarOtraVez.style.display = "none";
  waveJuego.style.display = "none";

  //Inicio al juego
  function iniciarJuego() {
    aparecerWave();
    temporizadorJuego = setInterval(function () {
      tiempoRestante--;
      contadorTiempo.textContent = tiempoRestante;
      tiempoTranscurrido += 1000;
      if (tiempoRestante === 0) {
        finalizarJuego();
      }
    }, 1000);
  }

  // Mostrar imagen aleatoriamente
  function aparecerWave() {
    // Tiempo para que desaparezca
    let tiempoDificultad = 3000,
      //Coordenadas máximas en las que la imagen aparece
      anchoPantalla = window.outerWidth,
      altoPantalla = window.outerHeight;

    let minximoX = anchoPantalla - areaJuego.clientWidth;
    let minimoY = altoPantalla - areaJuego.clientHeight;

    //Coordenadas aleatorias entre 0 y el máximo
    let x = Math.random() * (anchoPantalla - 50 - (minximoX + 50)) + minximoX;
    let y = Math.random() * (altoPantalla - 50 - (minimoY + 50)) + minimoY;

    // Establecer la posición aleatoria del elemento waveJuego
    waveJuego.style.left = x + "px";
    waveJuego.style.top = y + "px";

    //Revelar el waveJuego
    waveJuego.style.display = "block";

    // Establecer un temporizador para ocultar la imagen después del tiempo
    temporizador = setTimeout(function () {
      waveJuego.style.display = "none";
      aparecerWave();
    }, tiempoDificultad);
  }

  //Obtener el clic del usuario
  function clicImagen() {
    console.log("Hola");
    clearTimeout(temporizador);
    waveJuego.style.display = "none";
    contarAcierto();
    aparecerWave();
  }

  // Contar acierto
  function contarAcierto() {
    numeroAciertos++;
    contadorAciertos.textContent = numeroAciertos;
  }

  // Finalizar juego
  function finalizarJuego() {
    clearInterval(temporizadorJuego);
    clearTimeout(temporizador);
    clearTimeout(temporizadorPausa);
    waveJuego.style.display = "none";
    botonJugarOtraVez.style.display = "block";
  }

  //Funcion auxiliar para iniciar la primera vez al juego
  function empezarJuego() {
    botonJugar.style.display = "none";
    botonJugar.disabled = true;
    iniciar = true;
    iniciarJuego();
  }

  //Funcion auxiliar para iniciar todas menos las veces al juego, menos la primera
  function empezarJuegoOtraVez() {
    botonJugarOtraVez.style.display = "none";
    tiempoRestante = tiempoTotal;
    numeroAciertos = 0;
    contadorAciertos.value = 0;
    contadorAciertos.textContent = "0";
    tiempoTranscurrido = 0;
    iniciarJuego();
  }

  //Detiene el juego
  function pausarJuego() {
    clearInterval(temporizadorJuego);
    clearTimeout(temporizador);
  }

  //Reanuda el juego
  function continuarJuego() {
    if (iniciar === false) {
    } else {
      aparecerWave();
      temporizadorJuego = setInterval(function () {
        tiempoRestante--;
        contadorTiempo.textContent = tiempoRestante;
        tiempoTranscurrido += 1000;
        if (tiempoRestante === 0) {
          finalizarJuego();
        }
      }, 1000);
    }
  }
}
