function openNav() {
    document.getElementById("mySidebar").style.width = "300px";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
  }

  // function openNavBasket() {
  //   document.getElementById("mySidebarBasket").style.width = "500px";

  // }
  
  function openNavBasket() {
    var sidebar = document.getElementById("mySidebarBasket");
    sidebar.style.width = "500px";
    
    if (window.matchMedia("(max-width: 400px)").matches) {
        sidebar.style.width = "100%";
    }
}

  function closeNavBasket() {
    document.getElementById("mySidebarBasket").style.width = "0";

  }




  function ready(){
    const allHoverImages = document.querySelectorAll('.hover-container div img');
    const imgContainer = document.querySelector('.img-container');

    window.addEventListener('DOMContentLoaded', () => {
      allHoverImages[0].parentElement.classList.add('active');
});

allHoverImages.forEach((image) => {
    image.addEventListener('mouseover', () =>{
        imgContainer.querySelector('img').src = image.src;
        resetActiveImg();
        image.parentElement.classList.add('active');
    });
});
}


// function resetActiveImg(){
//     allHoverImages.forEach((img) => {
//         img.parentElement.classList.remove('active');
//     });
// }

