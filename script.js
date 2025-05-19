
const itinerary = [
  {
    day: 1,
    city: { es: "Buenos Aires", en: "Buenos Aires", he: "בואנוס איירס" },
    activities: {
      es: "Llegada, descanso y paseo por Puerto Madero.",
      en: "Arrival, rest, and walk around Puerto Madero.",
      he: "הגעה, מנוחה וטיילת בפוארטו מדרו."
    }
  },
  {
    day: 4,
    city: { es: "Rosario", en: "Rosario", he: "רוסריו" },
    activities: {
      es: "Visita al Monumento a la Bandera y costanera.",
      en: "Visit to the Flag Monument and riverside.",
      he: "ביקור באנדרטת הדגל וטיילת הנהר."
    }
  },
  {
    day: 7,
    city: { es: "Bariloche", en: "Bariloche", he: "ברילוצ'ה" },
    activities: {
      es: "Cerro Catedral, navegación en el Lago Nahuel Huapi.",
      en: "Cerro Catedral, boat trip on Lake Nahuel Huapi.",
      he: "הר הקתדרלה, שיט באגם נהואל ואפי."
    }
  }
];

let current = 0;
let lang = "es";

function renderSlide() {
  const slide = document.getElementById("slide");
  const item = itinerary[current];
  slide.innerHTML = `<h2>Día ${item.day}: ${item.city[lang]}</h2><p>${item.activities[lang]}</p>`;
}

function changeLanguage() {
  lang = document.getElementById("language").value;
  renderSlide();
}

function nextSlide() {
  current = (current + 1) % itinerary.length;
  renderSlide();
}

function prevSlide() {
  current = (current - 1 + itinerary.length) % itinerary.length;
  renderSlide();
}

window.onload = () => {
  renderSlide();
};
