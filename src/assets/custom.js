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
    sidebar.classList.add("open-animation"); // إضافة فئة لتشغيل التأثير


    if (window.matchMedia("(max-width: 700px)").matches) {
        sidebar.style.width = "100%";
    }
}

  function closeNavBasket() {
    document.getElementById("mySidebarBasket").style.width = "0";
    sidebar.classList.remove("open-animation"); // إزالة الفئة لإيقاف التأثير

  }

//   window.onclick = function (event) {
//     var sidebar = document.getElementById("mySidebarBasket");
//     var openButton = document.getElementById("blog");
    
//     if (event.target != sidebar && !sidebar.contains(event.target) && event.target != openButton) {
//         sidebar.style.width = "0";
//         sidebar.classList.remove("open-animation"); 
//     }
// };

window.onclick = function (event) {
  var sidebar = document.getElementById("mySidebarBasket");
  var openButton = document.getElementById("blog");

  if (sidebar && openButton) {
      if (event.target !== sidebar && !sidebar.contains(event.target) && event.target !== openButton) {
          sidebar.style.width = "0";
          sidebar.classList.remove("open-animation");
      }
  }
};


  function ready(){
    const allHoverImages = document.querySelectorAll('.hover-container div img');
    const imgContainer = document.querySelector('.img-container');

    window.addEventListener('DOMContentLoaded', () => {
      allHoverImages[0].parentElement.classList.add('active');
});

allHoverImages.forEach((image) => {
    image.addEventListener('mouseover', () =>{
        imgContainer.querySelector('img').src = image.src;
        image.parentElement.classList.add('active');
    });
});

}


// function resetActiveImg(){
//     allHoverImages.forEach((img) => {
//         img.parentElement.classList.remove('active');
//     });
// }

