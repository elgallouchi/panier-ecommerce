const advertisement = [
  {
    title: "C'est toujours le moment pour se faire plaisir",
    img: "./img/moto.jpg",
    description:
      "Découvrez nos offres du moment pour acquérir la moto ou le scooter de vos rêves.",
  },
  {
    title: "Vol + Hôtel : nos meilleures offres",
    img: "./img/voyage.jpg",
    description:
      "Vous n’avez pas d’idées pour vos vacances et vous êtes perdu pour préparer votre voyage ? faites nous confiance.",
  },
  {
    title: "Comment investir dans l'immobilier en 2022 ?",
    img: "./img/immobilier.jpg",
    description:
      "Acheter un appartement pour le louer ne s'improvise pas. Et tout investisseur en herbe devra faire attention au choix du logement, de sa localisation ou encore de son statut fiscal. ",
  },
  {
    title: "Réservez vos bonnes vacances en France",
    img: "./img/piscine.jpg",
    description: "Et profitez du paiement sécurisé avec notre plateforme !",
  },
  {
    title: "Trouvez le métier qui vous correspond",
    img: "./img/metier.jpg",
    description:
      "Et développez votre visibilité auprès des recruteurs grâce à l'agence Tech !",
  },
  {
    title: "Donnez une seconde vie à vos objets",
    img: "./img/objets.jpg",
    description:
      "Notre site vous offre la possibilite de gagner de l'argent, en vendant vos objets !",
  },
  {
    title:
      "Voici ce que les nouveaux implants dentaires devraient vous coûter en France",
    img: "./img/dents.jpg",
    description:
      "Vous êtes intéressé par la pose des implants dentaires? Vous aimeriez avoir des réponses à vos questions avant de planifier cette opération qui améliorera votre qualité de vie et la beauté de votre sourire? Contactez-nous",
  },
];

export const ads = () => {
  const random = Math.floor(Math.random() * advertisement.length);

  const randomAds = `
  <div class="prometed-card card">
    <img class="prometed-img" src=${advertisement[random].img} alt=${advertisement[random].title} />
    <h3 class="prometed-title">${advertisement[random].title}</h3>
    <p class="prometed-description">${advertisement[random].description}</p>
    <span class="prometed-button">Sponsorisé</span>
  </div>
  `;
  return randomAds;
};
