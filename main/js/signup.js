var courseApi = 'http://localhost:3000/account';

function start() {
  handleCreateAccount(); 
}

function createAccount(data) {
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  };
  return fetch(courseApi, options) 
    .then(function (response) {
      return response.json(); 
    });
}

function handleCreateAccount() {
  var btnRegister = document.querySelector(".signup-signInButton");
  btnRegister.onclick = function (e) {
    e.preventDefault(); // Thêm tham số e
    var inputUsernameRegister = document.querySelector(".input-signup-username");
    var inputPasswordRegister = document.querySelector(".input-signup-password");
    var inputPasswordReload = document.querySelector(".input-signup-password-reload");
    if (inputUsernameRegister.value === "" || inputPasswordRegister.value === "" || inputPasswordReload.value === "" ) {
      alert("Vui lòng không để trống!");
    } 
    else if (inputPasswordRegister.value !== inputPasswordReload.value ) {
      alert("Vui lòng nhập lại mật khẩu trùng khớp!");
    }
    else {
      var user = {
        username: inputUsernameRegister.value,
        password: inputPasswordRegister.value,
        loggedIn: false,
        fullname: "", 
        phonenumber: "", 
        gender: "",
        tinh: "", 
        huyen: "", 
        xa: "", 
        nha: "",
        cart: [],
        tien: 1000000000,
      };
      createAccount(user) 
        .then(function (data) {
          alert("Đăng Ký Thành Công");
          window.location.href = "login.html";
        })
        .catch(function (error) {
          console.error("Lỗi khi đăng ký tài khoản:", error);
          alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
        });
    }
  };
}
start();
