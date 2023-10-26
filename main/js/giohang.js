
var index = 0;
var cart = [];
var userId = localStorage.getItem('id');
console.log(userId);
const userApi = `http://localhost:3000/account/${userId}`;
fetch(userApi)
  .then(function (response) {
    return response.json();
  })
  .then(function (user) {
    cart = user.cart; 

    console.log(cart);

   
    cart.forEach(function (productID, index) {
      const courseApi = `http://localhost:3000/courses/${productID}`;
      console.log(courseApi);
      fetch(courseApi)
        .then(function (response) {
          return response.json();
        })
        .then(function (product) {
     
          showProduct(product, index + 1, productID);
        })
        .catch(function (error) {
          console.error("Lỗi khi tải thông tin sản phẩm:", error);
        });
    });

   
    showCartContents(cart);
  })
  .catch(function (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
  });

function showProduct(product, thutu, productID) {
 
  var productDiv = document.createElement('div');
  productDiv.innerHTML = `
    <div class="inform-content-right-hisss">
        <div class="inform-content-right-his">
            <p>Đơn hàng : <span> ${thutu} </span></p>
        </div>
        <div class="line">
            <hr>
        </div>
        <form action="" class="cart">
            <table>
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Chọn</th>
                    </tr>
                </thead>
                <tbody>
                     <tr>
                        <td><img src="imgdetail/${product.img1}" alt="${product.ten}">${product.ten}</td>
                        <td><p><span>${product.giamoi}</span></p></td>
                        <td><input type="number" value="1" min="1"></td>
                        <td><button id="delete">Xóa</button></td>
                    </tr>
                </tbody>
            </table>
            <div class="bottom">
                <div class="his-content-right">
                    <button type="button"> <a href="detail1.html?id=${product.id}">Xem chi tiết</a> </button>
               </div>
                <div class="price-total">
                    <p>Tổng tiền:<span>0.000</span><sup>đ</sup></p>
                </div>
            </div>
        </form>
    </div>
  `;
  
 
  const informContent = document.querySelector(".inform-content-right");
  informContent.appendChild(productDiv);


  createDeleteButton(productDiv, productID);
}

function createDeleteButton(productDiv, productID) {
    const deleteButton = productDiv.querySelector('#delete');
  

    deleteButton.addEventListener('click', function () {
      console.log("Nút xóa đã được nhấn.");
      cart = cart.filter(id => id !== productID);

      saveCartToServer(cart);
   
      informContent.innerHTML = '';
      showCartContents(cart);
    }, { once: true });
  }
const submitcart = document.getElementById('muahang')
console.log(submitcart)
submitcart.addEventListener("click",()=>{
    alert('Đặt hàng thành công')
    informContent.innerHTML = ''
})
  

function saveCartToServer(cart) {

  const userApi = `http://localhost:3000/account/${userId}`;
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cart }),
  };

  fetch(userApi, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Đã cập nhật giỏ hàng:", data);
    })
    .catch(function (error) {
      console.error("Lỗi khi cập nhật giỏ hàng:", error);
    });
}

function showCartContents(cart) {
  const informContent = document.querySelector(".inform-content-right");

  if (cart.length === 0) {

    const emptyCartMessage = document.createElement('h1');
    emptyCartMessage.textContent = "Giỏ hàng của bạn vẫn đang trống. Hãy thỏa thích mua sắm nào!";
    informContent.appendChild(emptyCartMessage);
  } else {
    
    const buyButton = document.createElement('button');
    buyButton.classList.add('buyitem');
    buyButton.textContent = "Đặt hàng";
    informContent.appendChild(buyButton);
  }
}
