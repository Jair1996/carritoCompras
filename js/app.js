const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const listaCursos = document.querySelector("#lista-cursos");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

let carritoCompras = [];

const aumentarCantidadCurso = (indexCurso) => {
  carritoCompras[indexCurso].cantidad += 1;
};

const disminuirCacntidadCurso = (indexCurso) => {
  console.log(indexCurso);
};

const leerDatosCurso = (curso) => {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  return infoCurso;
};

const limpiarHTML = () => {
  contenedorCarrito.innerHTML = "";
};

const actualizarDOM = () => {
  limpiarHTML();

  carritoCompras.forEach((curso) => {
    const { imagen, titulo, precio, id, cantidad } = curso;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="${imagen}" width="100" />
      </td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}">X</a>
      </td>
    `;

    contenedorCarrito.appendChild(row);
  });
};

const agregarCarrito = (infoCurso) => {
  const indexCurso = carritoCompras.findIndex(
    (curso) => curso.id === infoCurso.id
  );

  if (indexCurso !== -1) {
    aumentarCantidadCurso(indexCurso);
  } else {
    carritoCompras = [...carritoCompras, infoCurso];
  }

  actualizarDOM();
};

const agregarCurso = (e) => {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    const infoCurso = leerDatosCurso(cursoSeleccionado);
    agregarCarrito(infoCurso);
  }
};

const borrarCursoDeLista = (idCurso) => {
  carritoCompras = carritoCompras.filter((curso) => curso.id !== idCurso);
};

const eliminarCurso = (e) => {
  e.preventDefault();

  if (e.target.classList.contains("borrar-curso")) {
    const idCurso = e.target.getAttribute("data-id");

    borrarCursoDeLista(idCurso);
    actualizarDOM();
  }
};

const cargarEventListeners = () => {
  listaCursos.addEventListener("click", agregarCurso);

  contenedorCarrito.addEventListener("click", eliminarCurso);

  vaciarCarritoBtn.addEventListener("click", () => {
    carritoCompras = [];

    limpiarHTML();
  });
};

cargarEventListeners();
