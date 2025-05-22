Funci
async function deleteImage(imageId) {
  const response = await fetch(`/image/${imageId}/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.getElementById(imageId).style.display = "none";
  } else {
    console.error("Error al eliminar la imagen");
  }
}

async function viewImage(imageId) {
  const response = await fetch(`/image/${imageId}/view`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    console.log("vista de la imagen");
    window.location.href = "/";
  } else {
    console.error("Error al visualizar la imagen");
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  alert("Holaaaa");
  const inputSearch = document.querySelector(".searchInput");
  alert("Input de búsqueda:", inputSearch);

  const cards = document.querySelectorAll(".card");
  alert("Cards a revisar:", cards);

  // inputSearch.addEventListener("input", (event) => {
  //     const searchText = event.target.value.toLowerCase();
  //     // Buscamos todas las cards cuyo texto a buscar esté incluido en su nombre
  //     let showCard = dataImage.filter(image => image.title.toLowerCase().includes(searchText));
  //     alert("Hemos llegao");
  //     // Recogemos todos los id de las cards a mostrar
  //     const showId = showCard.map(image => image.id);
  //     // Dsiplay none a las que no se deben mostrar
  //     cards.forEach(card => {
  //         if (!showId.includes(card.id)) {
  //             card.style.display = 'none';
  //         } else {
  //             card.style.display = 'flex'; // o 'block', dependiendo del diseño
  //         }
  //     });
  // });
});
