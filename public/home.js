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
}

// BÚSQUEDA REACTIVA POR TÍTULO Y/O FECHA
(function() {
  const inputSearch = document.querySelector(".searchInput");
  const inputDateSearch = document.querySelector(".dateInput");
  const cards = document.querySelectorAll(".card");
  if (!inputSearch || !inputDateSearch || !cards.length) return;

  function filterCards() {
    const searchText = inputSearch.value.toLowerCase();
    const dateValue = inputDateSearch.value;
    cards.forEach((card) => {
      const nameElem = card.querySelector("#name");
      if (!nameElem) {
        card.style.display = "none";
        return;
      }
      const cardTitle = nameElem.textContent.replace('Nombre:', '').trim().toLowerCase();
      let matchesTitle = cardTitle.includes(searchText);
      let matchesDate = true;
      if (dateValue) {
        const searchDate = new Date(dateValue);
        const currentDate = new Date();
        const imageDateElem = card.querySelector("#date");
        if (imageDateElem) {
          const imageDate = new Date(imageDateElem.textContent.replace('Fecha:', '').trim());
          matchesDate = imageDate >= searchDate && imageDate <= currentDate;
        } else {
          matchesDate = false;
        }
      }
      if (matchesTitle && matchesDate) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  inputSearch.addEventListener("input", filterCards);
  inputDateSearch.addEventListener("input", filterCards);
})();
