export const intro = async () => {
  const introDom = document.querySelector("#intro");

  const productItems = [
    {
      title: "title 1",
      img: "./img/slide/friday.png",
      description: "description",
    },
    {
      title: "title 2",
      img: "./img/slide/arrivages.png",
      description: "description",
    },
    // {
    //   title: "title 3",
    //   img: "./img/content/metier.jpg",
    //   description: "description",
    // },
  ];

  let step = 0;
  //   setInterval(() => {
  if (step == productItems.length - 1) {
    step = 0;
  } else if (step < productItems.length) {
    step++;
  }
  introDom.innerHTML = `
        <div class="intro-items" style="
        background-image: url(${productItems[step].img});
        background-size: cover;
      ">
            <!-- img src=${productItems[step].img} alt="" / -->
            <!--div-- class="intro-info">
                <h3>${productItems[step].title}</h3>
                <p>${productItems[step].description}</p>
                <button>Voir le produit</button>
            </!--div-->
        </div>
    `;
  console.log(step);
  //   }, 5000);
  const el = document.querySelector('.intro-items');
  const t = await window.getComputedStyle(el, '::before')
  console.log(t.content);
};
