var inputUsername = document.querySelector(".input-login-username");
var inputPassword = document.querySelector(".input-login-password");
var btnLogin = document.querySelector(".login-signInButton");

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const loginApi = `http://localhost:3000/account?username=${inputUsername.value}&password=${inputPassword.value}`;
  fetch(loginApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const user = data[0];
      if (user) {
        if (user.username === inputUsername.value && user.password === inputPassword.value) {
          alert("Đăng Nhập Thành Công");
          window.open("taikhoan.html", "_blank");
          localStorage.setItem('inputUsername', inputUsername.value);
          localStorage.setItem('id', user.id);
          console.log(user.id);
        } else {
          alert("Đăng Nhập Thất Bại");
        }
      } else {
        alert("Tài khoản không tồn tại hoặc tài khoản và mật khẩu không đúng.");
      }
    })
    .catch(function (error) {
      console.error("Lỗi khi đăng nhập:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    });
});

