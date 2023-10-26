document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector('input[name="name"]');
    const searchIcon = document.querySelector('.fa-search');

    searchIcon.addEventListener("click", function() {
        const searchValue = searchInput.value.trim();
        if (searchValue) {
          
            window.location.href = `boloc.html?name=${searchValue}`;
        }
    });
});
