const teamInput = document.querySelector("input");
const form = document.querySelector("form");
const teamBox = document.querySelector(".team-info");
const games = document.createElement("button");
const matches = document.querySelector(".matches");
games.innerText = "Last Games";
matches.append(games);

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
    displayDetails(fetchedTeam[0]); //? Calling the team passed in the input

    games.addEventListener("click", async () => {
      const lastFiveMatches = await fetchInfoAboutLastMatches(
        fetchedTeam[0].idTeam
      ); //? On click, return the next 5 matches for that team based on the team's ID

      if (lastFiveMatches) {
        const lastGamesList = document.createElement("ul");

        lastFiveMatches.forEach((match) => {
          const matchToPlay = document.createElement("li");
          matchToPlay.innerText = `Match: ${match.strEvent} - Date: ${match.dateEventLocal}`;
          const homeTeam = document.createElement("img");
          homeTeam.src = `${match.strHomeTeamBadge}`;
          homeTeam.style.width = "10%";
          const awayTeam = document.createElement("img");
          awayTeam.src = `${match.strAwayTeamBadge}`;
          awayTeam.style.width = "10%";
          matchToPlay.append(homeTeam, awayTeam);

          lastGamesList.append(matchToPlay);
        });
        matches.append(lastGamesList);
        // console.log(lastGamesList);
      }
    });
  }

  teamInput.value = ""; //? Clearing the input
});

const fetchInfoAboutLastMatches = async (teamId) => {
  try {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=${teamId}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data.results;
    }
  } catch (error) {
    console.log(error);
  }
};
