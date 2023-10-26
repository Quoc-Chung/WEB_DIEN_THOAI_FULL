var courseApi = 'http://localhost:3000/courses';
let productFilter = [];
var data = null;
function filterByName(name) {
    if (data !== null) {
        const filteredProducts = data.filter(item => item.ten.toLowerCase().includes(name.toLowerCase()));
        showProduct(filteredProducts);
        count.innerText = filteredProducts.length;
    }
}
function start() {
    getCourses().then(function(responseData) {
        data = responseData; 
      
        showProduct(data);
       
        const urlParams = new URLSearchParams(window.location.search);
        const searchName = urlParams.get('name');
        if (searchName !== null) {
            filterByName(searchName);
        }
    });
}

function getCourses() {
    return fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.error("Lỗi khi tải dữ liệu: " + error);
        });
}

let list = document.getElementById('list');
let filter = document.querySelector('.filter');
let count = document.getElementById('count');

function showProduct(productFilter) {
    count.innerText = productFilter.length;
    console.log(count.innerText);
    list.innerHTML = '';
    productFilter.forEach(item => {
      
        let newDiv1 = document.createElement('div');
        newDiv1.classList.add('product-gallery-one-content-product-item');

      
        let newImage = document.createElement('img');
        newImage.src = "imgdetail/" + item.img1;
        newDiv1.appendChild(newImage);

        
        let newDiv2 = document.createElement('div');
        newDiv2.classList.add('product-gallery-one-content-product-item-text');
        newDiv1.appendChild(newDiv2);

       
        let newNumber = document.createElement('li');
        newNumber.textContent = "Tồn kho: " + item.sltk;
        newDiv2.appendChild(newNumber);

        let newName = document.createElement('li');
        let newNamea = document.createElement('a');
        newNamea.target = "_blank";
        let productID = item.id; 
        let productURL = "detail1.html?id=" + productID;

        newNamea.href = productURL;
        newNamea.textContent = item.ten; 
        newName.appendChild(newNamea);
        newDiv2.appendChild(newName);


     
        let newChip = document.createElement('li');
        newChip.textContent = item.chipset;
        newDiv2.appendChild(newChip);

       
        let newOldPrice = document.createElement('li');
        newOldPrice.textContent = item.giacu;
        newDiv2.appendChild(newOldPrice);

       
        let newNewPrice = document.createElement('li');
        newNewPrice.textContent = item.giamoi;
        newDiv2.appendChild(newNewPrice);

        
        let newHDH = document.createElement('li');
        newHDH.textContent = item.hedieuhanh;
        newDiv2.appendChild(newHDH);

        
        let newRate = document.createElement('li');
        newRate.textContent = "Rate: " + item.rate;
        newDiv2.appendChild(newRate);

        list.appendChild(newDiv1);
    });
}

function filterByData(data) {
    let count = document.getElementById('count');
    let valueFilter = {
        hang: '',
        RAM: '',
        ROM: '',
        name: '',
        minPrice: '',
        maxPrice: '',
    };
    valueFilter.name = document.querySelector('input[name="name"]').value;
    valueFilter.hang = document.querySelector('select[name="hang"]').value;
    valueFilter.RAM = document.querySelector('select[name="RAM"]').value;
    valueFilter.ROM = document.querySelector('select[name="ROM"]').value;
    valueFilter.minPrice = document.querySelector('input[name="minPrice"]').value;
    valueFilter.maxPrice = document.querySelector('input[name="maxPrice"]').value;
    if (data !== null) {
        productFilter = data.filter(item => {
            if(valueFilter.name !== ''){
                if(!item.name.includes(valueFilter.name)){
                    return false;
                }
            }
            if (valueFilter.hang !== '' && item.hang !== valueFilter.hang) {
                return false;
            }
            if (valueFilter.RAM !== '' && item.RAM !== valueFilter.RAM) {
                return false;
            }
            if (valueFilter.ROM !== '' && item.ROM !== valueFilter.ROM) {
                return false;
            }
            if (valueFilter.minPrice !== '' && parseFloat(item.gia) < parseFloat(valueFilter.minPrice)) {
                return false;
            }
            if (valueFilter.maxPrice !== '' && parseFloat(item.gia) > parseFloat(valueFilter.maxPrice)) {
                return false;
            }
            return true;
        });
        count.innerText = productFilter.length;
        showProduct(productFilter);
    }
}
const btnSubmit = document.querySelector('.submit');
btnSubmit.addEventListener('click', function () {
        console.log(data);
        filterByData(data);
});

start();