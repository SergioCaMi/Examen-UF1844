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
    const response = await fetch(`/image/${imageId}/download`, {
      method: "GET",
    });

    alert("Imagen descargada en el directorio /downloads.");
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
  const searchUtils = document.querySelectorAll(".search");
  const inputSearch = document.querySelector(".searchInput");
  const cards = document.querySelectorAll(".card");
  const inputDateSearch = document.querySelector(".dateInput");
  // ********** Busqueda por título **********
  searchUtils.forEach((element) => {
    if (element.style.display === "flex") {
      element.style.display = "none";
      inputSearch.value = "";
      showUtils();
    } else {
      element.style.display = "flex";
    }
  });
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
