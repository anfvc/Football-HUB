const teamInput = document.querySelector("input");
const form = document.querySelector("form");
const teamBox = document.querySelector(".team-info");
const games = document.querySelector(".show-games");
games.style.display = "none";

const getInfoAboutFootballTeam = async (team) => {
  try {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${team}`
    );

    if (response.ok) {
      const data = await response.json();
      // console.log(data.teams[0].strTeam);
      console.log(data);
      return data.teams;
    } else {
      const { error } = await response.json();
      throw new Error("This didn't work out", error);
    }
  } catch (error) {
    console.error("We couldn't fetch that team's info");
  }
};

const displayDetails = (team) => {
  const nameOfClub = document.createElement("h2");
  const clubBadge = document.createElement("img");

  nameOfClub.innerText = `${team.strTeam}`;
  clubBadge.src = `${team.strBadge}`;
  clubBadge.style.width = "20%";

  teamBox.append(nameOfClub, clubBadge);
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!teamInput.value) {
    const warning = document.createElement("p");
    warning.innerText = `Please enter the name of a team.`;
    warning.style.color = "red";
    teamBox.append(warning);
    return;
  }

  const fetchedTeam = await getInfoAboutFootballTeam(teamInput.value);

  if (!fetchedTeam) {
    const warning = document.createElement("p");
    warning.innerText = `We couldn't fetch information for: ${
      teamInput.value[0].toUpperCase() + teamInput.value.slice(1)
    }, at this time.`;
    teamBox.append(warning);
    return;
  } else {
    displayDetails(fetchedTeam[0]);
    games.style.display = "block";
  }

  teamInput.value = ""; //? Clearing the input
});

const fetchInfoAboutFutureMatches = async (match) => {
  const response = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/searchevents.php?e=${match}`
  );
};
