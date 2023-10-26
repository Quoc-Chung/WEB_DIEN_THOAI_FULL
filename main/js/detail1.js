var courseApi = 'http://localhost:3000/courses';
function getCourses(callback, productID) {
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (courses) {
            callback(courses, productID);
        });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var productID = getParameterByName('id');

function start(productID) {
    getCourses(renderCourses, productID);
}

function renderCourses(courses, selectedID) {
    var course = courses.find(courseSelected => courseSelected.id === selectedID);
    if (course) {
        var imgProduct = document.querySelector('.slider-content-left-dt');
        var someInformProduct = document.querySelector('.changeInform');
        var rating = document.querySelector('.stars');

        let newImage1 = document.createElement('img');
        newImage1.src = "imgdetail/" + course.img1;
        newImage1.alt = "";
        let newImage3 = document.createElement('img');
        newImage3.src = "imgdetail/" + course.img3;
        newImage3.alt = "";
        let newImage2 = document.createElement('img');
        newImage2.src = "imgdetail/" + course.img2;
        newImage2.alt = "";
        
        imgProduct.appendChild(newImage1);
        imgProduct.appendChild(newImage2);
        imgProduct.appendChild(newImage3);

        let newTenProduct = document.createElement('h3');
        newTenProduct.classList.add('product-title');
        newTenProduct.textContent = course.ten;
        someInformProduct.appendChild(newTenProduct);

        let newReviewP = document.createElement('p');
        let newReviewSpan = document.createElement('span');
        newReviewSpan.classList.add('review-no');
        newReviewSpan.textContent = "Tồn kho : " + course.sltk;
        newReviewP.appendChild(newReviewSpan);
        rating.appendChild(newReviewP);

        let newRating = document.createElement('p');
        newRating.textContent = "Rate: " + course.rate;
        let newRatingSpan = document.createElement('span');
        newRatingSpan.classList.add('fa');
        newRatingSpan.classList.add('fa-star');
        newRatingSpan.classList.add('checked');
        newRating.appendChild(newRatingSpan);
        rating.appendChild(newRating);

        let newProductDescription = document.createElement('p');
        newProductDescription.textContent = "Màn hình: " + course.kichthuoc + " " + course.manhinh;
        newProductDescription.classList.add('product-description');
        someInformProduct.appendChild(newProductDescription);

        let newOldPrice = document.createElement('small');
        newOldPrice.classList.add('text-muted');
        newOldPrice.textContent = "GIÁ CŨ: ";
        newOldPriceS = document.createElement('s');
        newOldPriceS.textContent = course.giacu;
        newOldPrice.appendChild(newOldPriceS);
        someInformProduct.appendChild(newOldPrice);

        let newNewPrice = document.createElement('h4');
        newNewPrice.classList.add('price');
        newNewPriceSpan = document.createElement('span');
        newNewPriceSpan.textContent = "GIẢM CHỈ CÒN: " + course.giamoi;
        newNewPrice.appendChild(newNewPriceSpan);
        someInformProduct.appendChild(newNewPrice);

        var specificationTable = document.querySelector('#paste');

        let newManHinhtr = document.createElement('tr');
        let newManHinhth = document.createElement('th');
        newManHinhth.textContent = "Màn Hình";

        let newKichthuocth = document.createElement('th');
        newKichthuocth.textContent = course.kichthuoc;

        let newDangth = document.createElement('th');
        newDangth.textContent = course.manhinh;

        newManHinhtr.appendChild(newManHinhth);
        newManHinhtr.appendChild(newKichthuocth);
        newManHinhtr.appendChild(newDangth);
        specificationTable.appendChild(newManHinhtr);

        let newRAMtr = document.createElement('tr');
        let newRAMth = document.createElement('th');
        newRAMth.textContent = "RAM / Pin";

        let newGBth = document.createElement('th');
        newGBth.textContent = course.RAM;
        let newPinth = document.createElement('th');
        newPinth.textContent = course.pin;

        newRAMtr.appendChild(newRAMth);
        newRAMtr.appendChild(newGBth);
        newRAMtr.appendChild(newPinth);
        specificationTable.appendChild(newRAMtr);

        let newCamtr = document.createElement('tr');
        let newCamth = document.createElement('th');
        newCamth.textContent = "Camera";

        let newCamsauth = document.createElement('th');
        newCamsauth.textContent = course.camerasau;

        let newCamtruocth = document.createElement('th');
        newCamtruocth.textContent = course.cameratruoc;

        newCamtr.appendChild(newCamth);
        newCamtr.appendChild(newCamsauth);
        newCamtr.appendChild(newCamtruocth);
        specificationTable.appendChild(newCamtr);

        let newBXLtr = document.createElement('tr');
        let newBXLth = document.createElement('th');
        newBXLth.textContent = "Bộ Xử Lý";

        let newChipth = document.createElement('th');
        newChipth.textContent = course.chipset;

        let newHDHth = document.createElement('th');
        newHDHth.textContent = course.manhinh;

        newBXLtr.appendChild(newBXLth);
        newBXLtr.appendChild(newChipth);
        newBXLtr.appendChild(newHDHth);
        specificationTable.appendChild(newBXLtr);

        let newCauHinhtr = document.createElement('tr');
        let newCauHinhth = document.createElement('th');
        newCauHinhth.textContent = "Cấu hình";

        let newRomth = document.createElement('th');
        newRomth.textContent = "Bộ nhớ trong: " + course.ROM;

        let newSIMth = document.createElement('th');
        newSIMth.textContent = "Thẻ SIM: " + course.sim;

        newCauHinhtr.appendChild(newCauHinhth);
        newCauHinhtr.appendChild(newRomth);
        newCauHinhtr.appendChild(newSIMth);
        specificationTable.appendChild(newCauHinhtr);
    }
}


function addToCart(userId, productID) {
    const userApi = `http://localhost:3000/account/${userId}`;
    fetch(userApi)
      .then(function (response) {
        return response.json();
      })
      .then(function (user) {
        user.cart.push(productID);
  
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cart: user.cart }), 
        };
  
        fetch(userApi, options)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            alert(`Đã thêm thành công sản phẩm vào giỏ hàng của bạn!`);
          })
          .catch(function (error) {
            console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
          });
      })
      .catch(function (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      });
  }
  var userid = localStorage.getItem('id');
  const btnCart = document.querySelector('#btnThemVaoGioHang');
  btnCart.addEventListener("click", function () {
        addToCart(userid, productID);
  });
  
start(productID);