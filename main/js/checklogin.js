function getOnlineAccount(jsonData) {
    
    return jsonData.filter(account => account.loggedIn === true);
  }
var courseApi = 'http://localhost:3000/account';
var data2 = null;
function getCourses() {
    return fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.error("Lỗi khi tải dữ liệu: " + error);
        });
}
function showOnlineStatus(name) {
    var navName = document.querySelector("#navName");
    var newli = document.createElement("li");
    var newa = document.createElement("a");
    newa.href = "taikhoan.html";
    var newbutton = document.createElement("button");
    var newi = document.createElement("i");
    newi.classList.add("fas");
    newi.classList.add("fa-user");
    var newspan = document.createElement("span");
    newspan.innerHTML = "  " + name;

    newi.appendChild(newspan);
    newbutton.appendChild(newi);
    newa.appendChild(newbutton);
    newli.appendChild(newa);
    navName.appendChild(newli);
}
function showOfflineStatus() {
    var navName = document.querySelector("#navName");
    var newli1 = document.createElement("li");
    var newli2 = document.createElement("li");

    var newa1 = document.createElement("a");
    var newa2 = document.createElement("a");

    newa1.href = "signup.html";
    newa2.href = "login.html";

    var newi1 = document.createElement("i");
    newi1.classList.add("fas");
    newi1.classList.add("fa-user");

    var newi2 = document.createElement("i");
    newi2.classList.add("fas");
    newi2.classList.add("fa-user");

    newa1.appendChild(newi1);
    newa2.appendChild(newi2);
    newa1.innerText = "Đăng ký";
    newa2.innerText = "Đăng nhập";

    newli1.appendChild(newa1);
    newli2.appendChild(newa2);
    
    navName.appendChild(newli1);
    navName.appendChild(newli2);
}
function start() {
    getCourses().then(function(responseData) {
        data2 = responseData; 
        var arrayOnlineAccounts = getOnlineAccount(data2);
        if (arrayOnlineAccounts.length === 1) {
            let namek = arrayOnlineAccounts[0].username
            showOnlineStatus(namek);
        }
        else if (arrayOnlineAccounts.length === 0) {
            showOfflineStatus();
        }
        else {
            let namek = arrayOnlineAccounts[0].username
            showOnlineStatus(namek);
        }
        
    });
}

start();