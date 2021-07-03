window.addEventListener("load", () => {
  let long;
  let lat;
  const timeZone = document.querySelector(".location-timezone");
  const tempDescr = document.querySelector(".temp-description");
  const tempDegree = document.querySelector(".temp-degree");
  let tempSection = document.querySelector(".temperature");
  let tempSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const { temperature, summary, icon } = data.currently;
          //Set Dom el from API
          tempDescr.textContent = summary;
          timeZone.textContent = data.timezone;
          tempDegree.textContent = temperature;

          //Celsius formula
          let celsius = (temperature - 32) * (5 / 9);
          //Set icon
          setIcons(icon, document.querySelector(".icon"));

          //Change temperature to Celsius/F
          tempSection.addEventListener("click", () => {
            if (tempSpan.textContent === "F") {
              tempSpan.textContent = "C";
              tempDegree.textContent = Math.floor(celsius);
            } else {
              tempSpan.textContent = "F";
              tempDegree.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
