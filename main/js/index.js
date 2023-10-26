let index = 0
const imgNumber = document.querySelectorAll('.slider-content-left-top img')
const rightbtn = document.querySelector('.fa-chevron-right')
const leftbtn = document.querySelector('.fa-chevron-left')
rightbtn.addEventListener("click", function() {
    index = index + 1
    if (index > imgNumber.length - 1) {
        index = 0
    }
    document.querySelector(".slider-content-left-top").style.right = index * 100 + "%"
})
leftbtn.addEventListener("click", function() {
    index = index - 1
    if (index < 0) {
        index = imgNumber.length - 1
    }
    document.querySelector(".slider-content-left-top").style.right = index * 100 + "%"
})

function imgAuto (){
    index = index + 1
    if (index > imgNumber.length - 1) {
        index = 0
    }
    document.querySelector(".slider-content-left-top").style.right = index * 100 + "%"
}
setInterval(imgAuto,3000)

const menubaricon = document.querySelector('.fas.fa-bars');
const menubar = document.querySelector('.menu-bar-content');

menubaricon.addEventListener("click", () => {
    menubar.classList.toggle("active");
});



const stars = document.querySelectorAll(" .fa-star")
stars.forEach((star,index1) => {
  
    star.addEventListener("click", ()=> {
        stars.forEach( ( star , index12) => {
            index1 >= index12 ? star.classList.add("active") : star.classList.remove("active")
        })
    })
})
 var swiper = new Swiper(".slider-product-one-content-items-content",{
    loop:true,
    fade:true,
    pagination:{
        el:".swiper-pagination",
        clickable:true,
        dynamicBullet:true,
    },
    navigation:{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        200:{
            slidesPerView:1,
            spaceBetween:20,
        },
        400: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        650: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        800: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        1200: {
            slidesPerView:5,
            spaceBetween:30,
        },
    },
 })

    const imageList = document.querySelector(".slider-product-true-content-items");
    const slideButtons = document.querySelectorAll(".slider-product-true-content-btn i");
    const firstcardwitdh = imageList.querySelector(".slider-product-true-content-item").offsetWidth;
    

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            console.log(button)
            imageList.scrollLeft += button.id === "prev-button" ? -firstcardwitdh-12 : firstcardwitdh+12;

        });
    });

    const shopping_cart = document.querySelector(".cart-add")
    const cart_btns = document.querySelectorAll(".add-to-cart")
    
    for (cart_btn of cart_btns){
        cart_btn.onclick = (e)=>{
            let product_count = Number(shopping_cart.getAttribute('data-product-count')) || 0
            shopping_cart.setAttribute('data-product-count',product_count+1)
        }
    }