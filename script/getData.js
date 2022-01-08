import { adv } from "./adv.js";

const showData = async (data) => {
  let output = "";
  await data.map((element, i) => {
    // generate average rating for each product
    let rating = element.rating.reduce((total, el) => total + el);
    let ratingAverage = Math.round(rating / element.rating.length);

    let star = "";
    // add image start according to rating average
    for (let i = 0; i < ratingAverage; i++) {
      star += `<img src="./img/star.png" alt="" />`;
    }
    // add gray star if total stars less than 5
    for (let i = ratingAverage; i < 5; i++) {
      star += `<img src="./img/star.png" class="star-gray" alt="" />`;
    }
    // add ads after one card and after five card
    if (i === 1 || i === 7) output += adv();

    output += `
    <!-- card start -->
            <div class="card">
              <img
                class="card-img"
                src=${element.image}
                alt=""
              />
              <h3 class="card-title">${element.title}</h3>
              <p class="card-description">${element.description}</p>
              <p class="card-price"><span>${element.price.toFixed(
                2
              )}</span> €</p>
              <p class="card-rating">${star} <br/><a href="#">Avis(${
      element.rating.length
    })</a></p>
              <input type="hidden" value=${element.id} />
              <button class="btn btn-add-to-cart">Ajouter au panier</button>
            </div>
            <!-- card end -->
            `;
  });
  await (document.querySelector(".products").innerHTML = output);
};

const fetchData = async (handlClick) => {
  await (document.querySelector(".products").innerHTML =
    "<div class='loading'><img src='./img/temps-restant.png' alt='' /></div>");
  try {
    const response = await fetch("./script/data.json");
    const articles = await response.json();
    await showData(articles.data);
    await handlClick();
  } catch (error) {
    console.log(error);
  }
};

export { fetchData };
