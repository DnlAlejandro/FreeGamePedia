//API
const api = axios.create({
	method: "GET",
	baseURL: "https://free-to-play-games-database.p.rapidapi.com/api/",
	headers: {
		// 'Content-Type': 'application/json;charset=utf-8',
		"X-RapidAPI-Key": API_KEY,
		"X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
	},
});

function likedGamesList() {
	const item = JSON.parse(localStorage.getItem("liked_games"));
	let games;

	if (item) {
		games = item;
	} else {
		games = {};
	}
	return games;
}

//UTILS
function createGames(newArray, containerSec, container, noDelete = false) {
	for (let a = 0; a < newArray.length; a++) {
		const id = newArray[a][0];
		
		if(!noDelete){
			containerSec.innerHTML = "";
		}
		
		const col = document.createElement("div");
		col.classList.add("col");

		const card = document.createElement("div");
		card.classList.add("card", "h-100");

		const imgGameCard = document.createElement("img");
		imgGameCard.classList.add("card-img-top");
		imgGameCard.setAttribute("src", newArray[a][5]);
		imgGameCard.setAttribute("title", "Click to see all details");
		imgGameCard.setAttribute("data-bs-toggle", "modal");
		imgGameCard.setAttribute("data-bs-target", "#modal-id");

		const cardBody = document.createElement("div");
		cardBody.classList.add("card-body");

		const h5 = document.createElement("h5");
		let textH5 = document.createTextNode(newArray[a][1]);
		h5.appendChild(textH5);

		const cardText = document.createElement("p");
		const cardText2 = document.createElement("p");
		cardText.classList.add("card-text");
		cardText2.classList.add("card-text2");
		let textCard = document.createTextNode(`${newArray[a][2]}`);
		let textCard2 = document.createTextNode(`Platform: ${newArray[a][3]}`);
		cardText.appendChild(textCard);
		cardText2.appendChild(textCard2);

		const buttonFav = document.createElement("button");
		buttonFav.classList.add("btn", "btn-secondary", "fav-button");
		buttonFav.setAttribute("content", "test content");
		buttonFav.textContent = "Add to favorites 🤍";
		buttonFav.addEventListener("click", () => {
			buttonFav.classList.toggle("movie-btn--liked");
		});

		const containerFooter = document.createElement("div");
		containerFooter.classList.add("card-footer");

		const footerText = document.createElement("small");
		footerText.classList.add("text-muted");
		let textFooter = document.createTextNode(`Date release: ${newArray[a][4]}`);
		footerText.appendChild(textFooter);

		containerSec.appendChild(container);
		container.appendChild(col);
		col.appendChild(card);
		card.appendChild(imgGameCard);
		card.appendChild(cardBody);
		card.appendChild(containerFooter);
		cardBody.appendChild(h5);
		cardBody.appendChild(cardText);
		cardBody.appendChild(cardText2);
		cardBody.appendChild(buttonFav);
		containerFooter.appendChild(footerText);

		//CALL FUNCTION TO SEE GAME DETAILS
		imgGameCard.addEventListener("click", () => {
			idSpecificGame.push(id);
		});

		imgGameCard.addEventListener("click", getCreateGameDetails);
	}
}

async function getNewReleasesPreview() {
	let tempArray = [];
	const { data } = await api("games", {
		params: {
			"sort-by": "release-date",
		},
	});
	for (let i = 0; i < 4; i++) {
		let games = [
			(id = data[i].id),
			(title = data[i].title),
			(description = data[i].short_description),
			(Company = data[i].platform),
			(dateRelease = data[i].release_date),
			(image = data[i].thumbnail),
		];
		tempArray.push(games);
	}

	createGames(tempArray, newReleasedSection, newReleasedContainer);
}

async function getCreatePopularsPreview() {
	let tempArray = [];
	const { data } = await api("games", {
		params: {
			"sort-by": "popularity",
		},
	});
	for (let i = 0; i < 4; i++) {
		let games = [
			(id = data[i].id),
			(title = data[i].title),
			(description = data[i].short_description),
			(platform = data[i].platform),
			(dateRelease = data[i].release_date),
			(image = data[i].thumbnail),
		];
		tempArray.push(games);
	}
	createGames(tempArray, popularSection, popularContainer);
}

// async function getCreateCategoriesPreview() {
// 	let genres = [];
// 	const { data } = await api("games", {
// 		params: {
// 			"sort-by": "category",
// 		},
// 	});
// 	for (let i = 0; i < data.length; i++) {
// 		let genresArray = data[i].genre;
// 		genres.push(genresArray);
// 	}
// 	const genresVerified = genres.reduce((acc, item) => {
// 		if (!acc.includes(item)) {
// 			acc.push(item);
// 		}
// 		return acc;
// 	}, []);

// 	const genresSorted = genresVerified.sort();

// 	for (let a = 0; a < genresSorted.length; a++) {
// 		if (genresSorted[a].startsWith(" ")) {
// 		} else {
// 			const itemList = document.createElement("li");
// 			itemList.setAttribute('id',genresSorted[a])
// 			itemList.classList.add(
// 				"list-group-item",
// 				"list-group-item-dark",
// 				"button-category"
// 			);
// 			let textItemList = document.createTextNode(`${genresSorted[a]}`);
// 			itemList.appendChild(textItemList);
// 			categoriesContainer.appendChild(itemList);
// 		}
// 	}
// }

// async function getCreatePlatformsPreview() {
// 	let platforms = [];
// 	const { data } = await api("games", {
// 		params: {
// 			"sort-by": "platform",
// 		},
// 	});
// 	for (let i = 0; i < data.length; i++) {
// 		let platformsArray = data[i].platform;
// 		platforms.push(platformsArray);
// 	}
// 	const platformsVerified = platforms.reduce((acc, item) => {
// 		if (!acc.includes(item)) {
// 			acc.push(item);
// 		}
// 		return acc;
// 	}, []);

// 	const platformsSorted = platformsVerified.sort();

// 	for (let a = 0; a < platformsSorted.length; a++) {
// 		const itemList = document.createElement("span");
// 		itemList.classList.add("badge", "text-bg-dark");
// 		let textItemList = document.createTextNode(`${platformsSorted[a]}`);
// 		itemList.appendChild(textItemList);

// 		platformsSection.appendChild(itemList);
// 	}
// }

async function getCreateGameDetails() {
	const id = idSpecificGame[0];

	let = tempArray = [];
	const { data } = await api("game", {
		params: {
			id: id,
		},
	});

	tempArray.push(data.title);
	modalTitle.innerHTML = data.title;
	modalImage.setAttribute("src", data.thumbnail);
	modalDescription.innerHTML = data.description;
	modalGenre.innerHTML = "<b>Genre: </b>" + data.genre;
	modalPlatform.innerHTML = "<b>Platform: </b>" + data.platform;
	modalCompany.innerHTML = "<b>Company: </b>" + data.publisher;
	modalDate.innerHTML = "<b>Date Release: </b>" + data.release_date;
	modalRequirements.innerHTML =
		"<b>Requirements: </b>" +
		"<b>OS: </b>" +
		data.minimum_system_requirements.os +
		"</br>" +
		" <b>Processor: </b>" +
		data.minimum_system_requirements.processor +
		"</br>" +
		" <b> Memory: </b>" +
		data.minimum_system_requirements.memory +
		"</br>" +
		" <b>Graphics: </b>" +
		data.minimum_system_requirements.graphics +
		"</br>" +
		" <b>Storage: </b>" +
		data.minimum_system_requirements.storage;

	idSpecificGame = [];
}

async function getNameIdGames() {
	const { data } = await api("games", {});
	for (let i = 0; i < data.length; i++) {
		idAndNames[data[i].id] = data[i].title.toLowerCase();
	}
}

async function getGameBySearch() {
	let keys = Object.keys(idAndNames);
	let names = Object.values(idAndNames);
	let keyArray = [];
	let tempArray = [];

	for (let i = 0; i < names.length; i++) {
		if (names[i].includes(inputSearch.value.toLowerCase())) {
			keyArray.push(keys[i]);
		}
	}

	for (const a of keyArray) {
		const { data } = await api("game", {
			params: {
				id: a,
			},
		});
		let games = [
			(id = data.id),
			(title = data.title),
			(description = data.short_description),
			(platform = data.platform),
			(dateRelease = data.release_date),
			(image = data.thumbnail),
		];
		tempArray.push(games);
	}
	console.log(keyArray);
	if (keyArray.length < 1) {
		const wrapper = document.createElement("div");
		wrapper.innerHTML = "No results";
		wrapper.classList.add("alert", "alert-danger");
		wrapper.setAttribute("role", "alert");
		messageError.append(wrapper);
	} else {
		messageError.innerHTML = "";
		createGames(tempArray, resultsSection, resultsContainer);
	}
}

async function getNewReleases() {
	let tempArray = [];
	const { data } = await api("games", {
		params: {
			"sort-by": "release-date",
		},
	});
	for (let i = 0; i < 12; i++) {
		let games = [
			(id = data[i].id),
			(title = data[i].title),
			(description = data[i].short_description),
			(Company = data[i].platform),
			(dateRelease = data[i].release_date),
			(image = data[i].thumbnail),
		];
		tempArray.push(games);
	}

	createGames(tempArray, newReleasedSection, newReleasedContainer);
}

async function getPopulars() {
	let tempArray = [];
	const { data } = await api("games", {
		params: {
			"sort-by": "popularity",
		},
	});
	for (let i = 0; i < 12; i++) {
		let games = [
			(id = data[i].id),
			(title = data[i].title),
			(description = data[i].short_description),
			(Company = data[i].platform),
			(dateRelease = data[i].release_date),
			(image = data[i].thumbnail),
		];
		tempArray.push(games);
	}

	createGames(tempArray, popularSection, popularContainer);
}

async function getFiltersCategories() {

	dropPlatform.innerHTML = "";
	dropCategory.innerHTML = "";
	dropSort.innerHTML = "";

	let platform = ["pc", "browser", "all"];
	let platformCapital = platform.map((palabra) => {
		return palabra[0].toUpperCase() + palabra.substring(1);
	});

	let genres = [
		"mmorpg",
		"shooter",
		"strategy",
		"moba",
		"racing",
		"sports",
		"social",
		"sandbox",
		"open-world",
		"survival",
		"pvp",
		"pve",
		"pixel",
		"voxel",
		"zombie",
		"turn-based",
		"first-person",
		"third-Person",
		"top-down",
		"tank",
		"space",
		"sailing",
		"side-scroller",
		"superhero",
		"permadeath",
		"card",
		"battle-royale",
		"mmo",
		"mmofps",
		"mmotps",
		"3d",
		"2d",
		"anime",
		"fantasy",
		"sci-fi",
		"fighting",
		"action-rpg",
		"action",
		"military",
		"martial-arts",
		"flight",
		"low-spec",
		"tower-defense",
		"horror",
		"mmorts",
	];

	let genresCapital = genres.map((palabra) => {
		let a = palabra[0].toUpperCase() + palabra.substring(1);
		return a.replace("-", " ");
	});

	let sort = ["release-date", "popularity", "alphabetical", "relevance"];
	let sortCapital = sort.map((palabra) => {
		return palabra[0].toUpperCase() + palabra.substring(1);
	});

	function fillLi(arr, dropdown, typeCase) {
		const li2 = document.createElement("option");
		li2.innerHTML = typeCase;
		dropdown.append(li2);

		for (const i of arr) {
			const li = document.createElement("option");

			li.innerHTML = i;

			dropdown.append(li);
		}
	}

	fillLi(platformCapital, dropPlatform, "Platform");
	fillLi(genresCapital, dropCategory, "Category");
	fillLi(sortCapital, dropSort, "Sort by");
}

async function getGamesByFilters() {

	categoriesContainer.innerHTML = ""

	let platformValue;
	let categoryValue;
	let sortValue;
	let tempArray = [];

	let params = {};

	if (dropCategory.value !== "Category") {
		categoryValue = dropCategory.value.toLowerCase().replace(" ", "-");
		categoryValue2 = { category: categoryValue };

		if (dropPlatform.value !== "Platform") {
			platformValue = dropPlatform.value.toLowerCase();
			platformValue2 = { platform: platformValue };
			params = { ...params, ...platformValue2 };
		} else {
			platformValue = "";
		}

		params = { ...params, ...categoryValue2 };

		if (dropSort.value !== "Sort by") {
			sortValue = dropSort.value.toLowerCase();
			sortValue2 = { "sort-by": sortValue };
			params = { ...params, ...sortValue2 };
		} else {
			sortValue = "";
		}

		const { data } = await api("games", {
			params,
		});

		if(data.length === undefined){
			const h2NoResult = document.createElement("h2");
			h2NoResult.innerHTML = "No results found"
			categoriesContainer.append(h2NoResult)
		}

		for (let i = 0; i < data.length; i++) {
			let games = [
				(id = data[i].id),
				(title = data[i].title),
				(description = data[i].short_description),
				(platform = data[i].platform),
				(dateRelease = data[i].release_date),
				(image = data[i].thumbnail),
			];
			tempArray.push(games);
			console.log(games)
		}
		messageError.innerHTML = "";
		console.log(tempArray);
		createGames(tempArray, categoriesSection, categoriesContainer, noDelete = true);
		console.log(params);


	} else {

			const wrapper = document.createElement("div");
			wrapper.innerHTML =
				"You must to select a category (platform and sort by is not required)";
			wrapper.classList.add("alert", "alert-danger");
			wrapper.setAttribute("role", "alert");
			messageError.append(wrapper);

			setTimeout(() => {
				messageError.innerHTML = "";
			}, 1000);

	}
}

getNewReleasesPreview();
// getCreateCategoriesPreview();
// getCreatePlatformsPreview();
getCreatePopularsPreview();
getNameIdGames();
