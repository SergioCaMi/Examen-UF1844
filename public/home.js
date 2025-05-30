/**
 * Elimina una imagen mediante una solicitud HTTP al servidor.
 *
 * @async
 * @function deleteImage
 * @param {Array} imageId - Array con todos los elementos almacenados en el JSON
 * @returns Una promesa que se resuelve cuando la imagen se elimina correctamente o se rechaza si hay un error.
 */
async function deleteImage(imageId) {
  const response = await fetch(`/image/${imageId}/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.getElementById(imageId).style.display = "none";
    window.location.reload(); // Recarga la página tras eliminar para actualizar la galería
  } else {
    console.error("Error al eliminar la imagen");
  }
}



/**
 * Descarga una imagen al directorio /downloads
 *
 * @async
 * @function downloadImage
 * @param {imageId} imageId - id de la imagen a descargar
 * @returns Una promesa que se resuelve cuando la imagen se descarga correctamente o se rechaza si hay un error.
 */
async function downloadImage(imageId) {
  try {
    const response = await fetch(`/image/${imageId}/download`, { method: "GET" });
    if (!response.ok) throw new Error("No se pudo descargar la imagen");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `imagen-${imageId}.jpg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert("Error al descargar la imagen");
  }
}

/**
 * Muestra u oculta los elementos de búsqueda y filtra las imágenes según el texto de búsqueda o la fecha.
 *
 * @function showUtils
 * @description Muestra los elementos que cumplen las condiciones dadas por el usuario
 * @returns {}
 */
function showUtils() {
  const searchUtils = document.querySelector(".search");
  const inputSearch = document.querySelector(".searchInput");
  const cards = document.querySelectorAll(".card");
  const inputDateSearch = document.querySelector(".dateInput");
  // Mostrar/Ocultar búsqueda
  if (searchUtils.style.display === "flex") {
    searchUtils.style.display = "none";
    inputSearch.value = "";
  } else {
    searchUtils.style.display = "flex";
  }
  inputSearch.addEventListener("input", (event) => {
    const searchText = event.target.value.toLowerCase();
    // Buscamos todas las cards cuyo texto a buscar esté incluido en su nombre
    let showCard = dataImage.filter((image) =>
      image.title.toLowerCase().includes(searchText)
    );

    // Recogemos todos los id de las cards a mostrar
    const showId = showCard.map((image) => image.id);
    // Dsiplay none a las que no se deben mostrar
    cards.forEach((card) => {
      if (!showId.includes(card.id)) {
        card.style.display = "none";
      } else {
        card.style.display = "flex";
      }
    });

    // ********** Búsqueda por fecha de partida **********
    inputDateSearch.addEventListener("input", (event) => {
      const searchDate = new Date(event.target.value);
      const currentDate = new Date();
      // Buscamos todas las cards cuya fecha sea menor o igual a la indicada por el user
      const showCard = dataImage.filter((image) => {
        const imageDate = new Date(image.date);
        return imageDate >= searchDate && imageDate <= currentDate;
      });
      // Recogemos todos los id de las cards a mostrar
      const showId = showCard.map((image) => image.id);
      // Dsiplay none a las que no se deben mostrar
      cards.forEach((card) => {
        if (!showId.includes(card.id)) {
          card.style.display = "none";
        } else {
          card.style.display = "flex";
        }
      });
    });
  });
}
