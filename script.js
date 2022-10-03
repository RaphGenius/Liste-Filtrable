let dataArray;

async function getUsers() {
  try {
    const response = await fetch(
      "https://randomuser.me/api/?nat=fr&results=50"
    );
    // {results} permets de recuperer les infos de data.results sous forme de tableau
    // Sans passer par data = await response.json // results = data.results
    const { results } = await response.json();
    orderList(results);
    dataArray = results;
    dataArray.forEach((element) => {});
    createUserList(dataArray);
  } catch (error) {
    console.log(error);
  }
}
getUsers();

function orderList(data) {
  // Permet de trier l'ordre des noms de famille par ordre alphabetique
  data.sort((a, b) => {
    if (a.name.last < b.name.last) {
      return -1;
    } else if (a.name.last > b.name.last) {
      return 1;
    } else {
      return 0;
    }
  });
}

const tableResults = document.querySelector(".table-results");

function createUserList(array) {
  array.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.classList = "table-item";
    listItem.innerHTML = `
        <p class="main-info">
          <img src="${user.picture.thumbnail}" alt="avatar picture">
          <span>${user.name.last} ${user.name.first} </span>
        </p>
        <p class="email">${user.email} </p>
        <p class="phone">${user.phone} </p>
   `;
    tableResults.appendChild(listItem);
  });
}

const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", filterData);

function filterData(e) {
  //Permet de vider la liste quand on commence à tapper qqchose
  tableResults.textContent = "";
  // toLowerCase renvoie le resultat en minuscule
  //replace(/\s/g, "") regarde si un espace existe et l'enleve (remplace "" == chaine de carc vides)
  const searchString = e.target.value.toLowerCase().replace(/\s/g, "");

  //On recherche le nom recherché dans les resultats
  const filteredArr = dataArray.filter((userData) =>
    searchForOccurences(userData)
  );
  function searchForOccurences(userData) {
    const searchType = {
      firstname: userData.name.first.toLowerCase(),
      lastname: userData.name.last.toLowerCase(),
      firstAndLast: `${userData.name.first + userData.name.last}`.toLowerCase(),
      lastAndFirst: `${userData.name.last + userData.name.first}`.toLowerCase(),
    };
    for (const prop in searchType) {
      if (searchType[prop].includes(searchString)) {
        return true;
      }
    }
  }

  createUserList(filteredArr);
}
