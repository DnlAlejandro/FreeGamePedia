var idSpecificGame = [];

buttonSearch.addEventListener('click', () => {
    location.hash = '#search=' + inputSearch.value;
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    if (location.hash.startsWith('#search=')) {
        searchPage();
//     } else if (location.hash.startsWith('#search=')) {
//         searchPage();
//     } else if (location.hash.startsWith('#movie=')) {
//         movieDetailsPage();
//     } else if (location.hash.startsWith('#category=')) {
//         categoriesPage();
//     } else {
//         homePage();
//     }
    }
}

function searchPage(){
    
    // createGameDetails();
}