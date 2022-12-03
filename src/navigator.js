var idSpecificGame = [];
var idAndNames = {}

buttonSearch.addEventListener('click', searchEvent);
inputSearch.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        buttonSearch.click();
    }
});

function searchEvent() {
    if (!inputSearch.value) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = "Enter a valid field"
        wrapper.classList.add('alert', 'alert-danger');
        wrapper.setAttribute('role', 'alert')
        messageError.append(wrapper)

        setTimeout(() => {
            messageError.innerHTML = ""
        }, 1000)

    }
    else {
        location.hash = '#search=' + inputSearch.value;
    }
}

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

function searchPage() {

    resultsContainer.innerHTML = ""
    const h2 = document.createElement('h2')
    h2.innerHTML = 'Results'
    newReleasedSection.remove();
    popularSection.remove();
    categoriesSection.remove();
    platformsSection.remove();
    favoritesSection.remove();
    titleLast.remove();
    titlePopular.remove();
    titleCategories.remove();
    titlePlatforms.remove();
    titleFavorites.remove();
    resultsTitleContainer.append(h2)

    getGameBySearch();
    
}