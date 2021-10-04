const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const listaCursos = document.querySelector("#lista-cursos");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

const limpiarHTML = () => {
  //Forma lenta
  // contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
};

const carritoHTML = () => {
  limpiarHTML();

  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, id, cantidad } = curso;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="${imagen}" alt="${titulo}" width="100"/>
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

const leerDatosCurso = (curso) => {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });

    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
};

const agregarCurso = (e) => {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
};

const eliminarCurso = (e) => {
  e.preventDefault();

  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHTML();
  }
};

const cargarEventListeners = () => {
  listaCursos.addEventListener("click", agregarCurso);

  carrito.addEventListener("click", eliminarCurso);

  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = [];

    limpiarHTML();
  });
};

cargarEventListeners();
