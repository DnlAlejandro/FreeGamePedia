var idSpecificGame = [];
var idAndNames = {};
var targetCategory = [];

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, true);

buttonHome.addEventListener("click", homePage);
buttonSearch.addEventListener("click", searchEvent);
inputSearch.addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		event.preventDefault();
		buttonSearch.click();
	}
});
buttonReleases.addEventListener("click", releasesEvent);
buttonPopulars.addEventListener("click", popularEvent);
buttonCategories.addEventListener("click", categoryEvent);




function navigator() {

	if (location.hash.startsWith("#search=")) {
		searchPage();
	} else if (location.hash.startsWith("#releases=")) {
		releases();
	} else if (location.hash.startsWith("#popular=")) {
		populars();
	} else if (location.hash.startsWith("#category=")) {
		category();
	} 
}

function homePage() {
	location.hash = "";
}

function searchEvent() {
	if (!inputSearch.value) {
		const wrapper = document.createElement("div");
		wrapper.innerHTML = "Enter a valid field";
		wrapper.classList.add("alert", "alert-danger");
		wrapper.setAttribute("role", "alert");
		messageError.append(wrapper);

		setTimeout(() => {
			messageError.innerHTML = "";
		}, 1000);
	} else {
		location.hash = "#search=" + inputSearch.value;
	}
}

function searchPage() {
	resultsContainer.innerHTML = "";
	resultsTitleContainer.innerHTML = "";
	const h2 = document.createElement("h2");
	h2.innerHTML = "Results";
	newReleasedSection.remove();
	popularSection.remove();
	favoritesSection.remove();
	categoriesSection.style.display = "none";
	titleLast.remove();
	titlePopular.remove();
	titleFavorites.remove();
	resultsTitleContainer.append(h2);

	getGameBySearch();
}

function releasesEvent() {
	location.hash = "#releases=";
}

function releases() {
	newReleasedContainer.innerHTML = "";
	newReleasedContainer.style.display = "flex";
	popularSection.style.display = "none";
	favoritesSection.style.display = "none";
	categoriesSection.style.display = "none";
	titleLast.style.display = "flex";
	titlePopular.style.display = "none";
	titleFavorites.style.display = "none";

	getNewReleases();
}

function popularEvent() {
	location.hash = "#popular=";
}

function populars() {
	popularContainer.innerHTML = "";
	popularSection.style.display = "flex";
	newReleasedContainer.style.display = "none";
	favoritesSection.style.display = "none";
	categoriesSection.style.display = "none";
	titleLast.style.display = "none";
	titlePopular.style.display = "flex";
	titleFavorites.style.display = "none";
	getPopulars();
}

function categoryEvent() {

	location.hash = "#category=";
}

function category(){
	categoriesContainer.innerHTML = "";
	categoriesSection.style.display = "flex";
	categoriesSection.style.flexDirection = "column";
	newReleasedContainer.style.display = "none";
	popularSection.style.display = "none";
	favoritesSection.style.display = "none";
	titleLast.style.display = "none";
	titlePopular.style.display = "none";
	titleFavorites.style.display = "none";
	
	getFiltersCategories();

	buttonfilter.addEventListener("click", getGamesByFilters)


	
}
