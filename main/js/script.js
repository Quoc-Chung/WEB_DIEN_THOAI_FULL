
    let indexxx = 0
    const intNumber = document.querySelectorAll('.slider-content-left-dt img')
    console.log(intNumber.length)
    const rightbtnDetail = document.querySelector('.fa-chevron-right-detail')
    const leftbtnDetail = document.querySelector('.fa-chevron-left-detail')
    rightbtnDetail.addEventListener ("click", function(){
        indexxx = indexxx + 1
        if(indexxx >= intNumber.length){
            indexxx = 0;
        }
        document.querySelector(".slider-content-left-dt").style.right =indexxx*100+"%";
    })

    leftbtnDetail.addEventListener ("click", function(){
        indexxx = indexxx - 1
        if(indexxx < 0 ){
            indexxx = intNumber.length - 1
        }
        document.querySelector(".slider-content-left-dt").style.right =indexxx*100+"%";
    })
    const menubaricon = document.querySelector('.fas.fa-bars');
    const menubar = document.querySelector('.menu-bar-content');
    
    menubaricon.addEventListener("click", () => {
        menubar.classList.toggle("active");
    });
    const imgList = document.querySelector(".preview-pic");
    const slideBtn = document.querySelectorAll(".slider-product-true-content-btn i");
    const firstwitdh = imgList.querySelector(".tab-pane").offsetWidth;
    

    slideBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            imgList.scrollLeft += btn.id === "prev-button" ? -firstwitdh-12 : firstwitdh+12;

        });
    });
