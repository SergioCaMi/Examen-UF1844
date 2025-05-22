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

function showUtils() {
  const searchUtils = document.querySelectorAll(".search");
  const inputSearch = document.querySelector(".searchInput");
  const cards = document.querySelectorAll(".card");
  const inputDateSearch = document.querySelector(".dateInput");

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
