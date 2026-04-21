async function traerPersonajes() {
  let pagina = 1;
  let personajes = [];
  let totalPaginas = 1;

  while (pagina <= totalPaginas) {
    const respuesta = await fetch(`https://dragonball-api.com/api/characters?page=${pagina}`);
    const data = await respuesta.json();
    personajes = personajes.concat(data.items);
    totalPaginas = data.meta.totalPages;
    pagina++;
  }
  return personajes;
}

traerPersonajes().then(personajes => {
  const contenedor = document.querySelector('.contenedor-cards'); // un div que contenga todas las cards

  contenedor.innerHTML = personajes.map(personaje => `
    <article class="card" style="background-image:url('planetas/${personaje.originPlanet?.toLowerCase()}.jpg')">
      <div class="contenedorPersonaje">
        <div class="imgPersonaje">
        <img src="${personaje.image}" alt="${personaje.name}">
        </div>
        </div>
      <div class="informacion">
        <h2 class="nombre">${personaje.name}</h2>
        <p>Raza: <span class="raza">${personaje.race}</span></p>
        <p>Genero: <span class="genero">${personaje.gender}</span></p>
        <p>KI base: <span class="kiBase">${personaje.ki}</span></p>
        <p>KI Total: <span class="kiTotal">${personaje.maxKi}</span></p>
      </div>
    </article>
  `).join('');
});