var inputUsername = localStorage.getItem('inputUsername');
var id = localStorage.getItem('id');
function toggleLoggedIn(id) {
    const loginApi = `http://localhost:3000/account/${id}`;
    fetch(loginApi)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
          data.loggedIn = true;
          const options = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), 
          };
  
          fetch(loginApi, options)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log("Đã cập nhật loggedIn thành true:", data);
            })
            .catch(function (error) {
              console.error("Lỗi khi cập nhật trạng thái đăng nhập:", error);
            });
      })
      .catch(function (error) {
        console.error("Lỗi khi thay đổi trạng thái đăng nhập:", error);
      });
}
  
function start() {
    toggleLoggedIn(id);
    handleCreateAccountInform();
    showNewAccountInform(id);
    handleCreateAccountAddress();
    showNewAccountAddress(id);
}

function toggleLoggedOut(id) {
    const loginApi = `http://localhost:3000/account/${id}`;
    fetch(loginApi)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
          data.loggedIn = false; 
  
          const options = {
            method: 'PATCH', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), 
          };
  
          fetch(loginApi, options)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log("Đã cập nhật loggedIn thành false:", data);
            })
            .catch(function (error) {
              console.error("Lỗi khi cập nhật trạng thái đăng nhập:", error);
            });
      })
      .catch(function (error) {
        console.error("Lỗi khi thay đổi trạng thái đăng nhập:", error);
      });
}

var logoutButton = document.querySelector("#dangxuat");
logoutButton.addEventListener("click", () => {
    toggleLoggedOut(id);
    console.log("dangxuat");
});
 

function updateAccountInform(id, data) {
    const updateApi = `http://localhost:3000/account/${id}`;
    const options = {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    };
    return fetch(updateApi, options)
      .then(function (response) {
        return response.json();
      })
      .catch(function (error) {
        console.error("Lỗi khi cập nhật thông tin cá nhân:", error);
      });
  }
  function showNewAccountInform(idp) {
    fetch('http://localhost:3000/account')
        .then(function (response) {
            return response.json();
        })
        .then(function (accountList) {
            var selectedAccount = accountList.find(function (account) {
                return account.id == idp;
            });
            console.log(idp);
            console.log(selectedAccount);
            console.log(accountList);
            if (selectedAccount) {
                var inputTen = document.querySelector("#ten");
                var inputSDT = document.querySelector("#dt");
                var genderSelect = document.getElementById("gt");

                var ten = `${selectedAccount.fullname}`;
                var sdt = `${selectedAccount.phonenumber}`;
                var gender = selectedAccount.gender; 
                inputTen.value = ten;
                inputSDT.value = sdt;
                for (var i = 0; i < genderSelect.options.length; i++) {
                    if (genderSelect.options[i].value === gender) {
                        genderSelect.selectedIndex = i;
                        break;
                    }
                }
            } else {
                alert('Tài khoản không tồn tại.');
            }
        })
        .catch(function (error) {
            alert('Lỗi khi tải danh sách tài khoản!');
        });
}

function handleCreateAccountInform() {
    var btnXN = document.querySelector("#xacnhanttcn");
    btnXN.onclick = function () {
        var inputTen = document.querySelector("#ten");
        var inputSDT = document.querySelector("#dt");
        var genderSelect = document.getElementById("gt");
        var selectedGender = genderSelect.options[genderSelect.selectedIndex].value;
        if (inputTen.value === "" || inputSDT.value === "" || selectedGender === "#") {
            alert("Vui lòng không để trống");
        } else {
            const newData = {
                fullname: inputTen.value,
                phonenumber: inputSDT.value,
                gender: selectedGender,
            };
            updateAccountInform(id, newData)
                .then(function (data) {
                alert("Đã cập nhật thông tin cá nhân thành công");
                })
                .catch(function (error) {
                alert("Lỗi khi cập nhật thông tin cá nhân!");
                });
        }
    };
}

function updateAccountAddress(id, data) {
  const updateApi = `http://localhost:3000/account/${id}`;
  const options = {
    method: 'PATCH', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  };
  return fetch(updateApi, options)
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      console.error("Lỗi khi cập nhật thông tin Địa chỉ:", error);
    });
}
function showNewAccountAddress(idp) {
  fetch('http://localhost:3000/account')
      .then(function (response) {
          return response.json();
      })
      .then(function (accountList) {
          var selectedAccount = accountList.find(function (account) {
              return account.id == idp;
          });
          
          if (selectedAccount) {
              var inputXa = document.querySelector("#xa");
              var inputNha = document.querySelector("#nha");
              var tinhSelect = document.getElementById("tinhSelect");
              var quanhuyenSelect = document.getElementById("quanhuyenSelect");

              var xa = `${selectedAccount.xa}`;
              var nha = `${selectedAccount.nha}`;
              var tinh = selectedAccount.tinh;
              var huyen = selectedAccount.huyen;

              inputXa.value = xa;
              inputNha.value = nha;

              for (var i = 0; i < tinhSelect.options.length; i++) {
                  if (tinhSelect.options[i].value === tinh) {
                      tinhSelect.selectedIndex = i;
                      break;
                  }
              }
              for (var i = 0; i < quanhuyenSelect.options.length; i++) {
                if (quanhuyenSelect.options[i].value === huyen) {
                    quanhuyenSelect.selectedIndex = i;
                    break;
                }
            }
          } else {
              alert('Tài khoản không tồn tại.');
          }
      })
      .catch(function (error) {
          alert('Lỗi khi tải danh sách tài khoản!');
      });
}

function handleCreateAccountAddress() {
  var btnXNDC = document.querySelector("#xacnhandiachi");
  btnXNDC.onclick = function () {
    var inputXa = document.querySelector("#xa");
    var inputNha = document.querySelector("#nha");
    var tinhSelect = document.getElementById("tinhSelect");
    var quanhuyenSelect = document.getElementById("quanhuyenSelect");

      var selectedTinh = tinhSelect.options[tinhSelect.selectedIndex].value;
      var selectedHuyen = quanhuyenSelect.options[quanhuyenSelect.selectedIndex].value;

      if (inputXa.value === "" || inputNha.value === "" || selectedTinh === "#" || selectedHuyen === "#" ) {
          alert("Vui lòng không để trống");
      } else {
          const newData = {
              xa: inputXa.value,
              nha: inputNha.value,
              tinh: selectedTinh,
              huyen: selectedHuyen,
          };
          updateAccountInform(id, newData)
              .then(function (data) {
              alert("Đã cập nhật thông tin địa chỉ thành công");
              })
              .catch(function (error) {
              alert("Lỗi khi cập nhật thông tin địa chỉ!");
              });
      }
  };
}

const menubaricon = document.querySelector('.fas.fa-bars');
    const menubar = document.querySelector('.menu-bar-content');
    
    menubaricon.addEventListener("click", () => {
        menubar.classList.toggle("active");
});
 
var tinhSelect = document.getElementById("tinhSelect");
var quanhuyenSelect = document.getElementById("quanhuyenSelect");

var jsonFileURL = "http://localhost:3000/address";

fetch(jsonFileURL)
    .then(response => response.json())
    .then(data => {
        data.forEach(tinh => {
            var option = document.createElement("option");
            option.value = tinh.id;
            option.text = tinh.name;
            tinhSelect.appendChild(option);
        });

        tinhSelect.addEventListener("change", function () {
            var selectedTinhName = tinhSelect.options[tinhSelect.selectedIndex].text;

       
            quanhuyenSelect.innerHTML = "<option value='#'>Chọn quận/huyện</option>";

           
            var selectedTinh = data.find(tinh => tinh.name === selectedTinhName);
       
            if (selectedTinh) {
                selectedTinh.quan.forEach(quan => {
                    var option = document.createElement("option");
                    option.value = quan;
                    option.text = quan;
                    quanhuyenSelect.appendChild(option);
                });
            }
        });
    });

start();