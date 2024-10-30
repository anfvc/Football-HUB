const team = document.querySelector("input");
const form = document.querySelector("form");

const fetchingFootyInfo = async (team) => {

  try {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${team}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const { error } = await response.json();
      throw new Error("This didn't work out", error);
    }

  } catch (error) {
    console.error("We couldn't fetch that team's info")
  }
};

fetchingFootyInfo("Manchester United");
