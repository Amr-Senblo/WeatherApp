/* Global Variables */

// const body = require("body");

// Create a new date instance dynamically with JS
const d = new Date();
const month=d.getMonth() +1;
const newDate = `${d.getDate()} / ${month} / ${d.getFullYear()}`;

let baseUrl = "http://api.openweathermap.org/data/2.5/forecast?zip=";
let apiKey = "&appid=896caaca042d28daec24876bcb257f47&units=metric";

const editHtml = (allInfo) => {
  document.getElementById("date").innerHTML = `Date : ${allInfo.date}`;
  document.getElementById("temp").innerHTML = `Temperarure : ${allInfo.temp} °C`;
  document.getElementById("content").innerHTML = `feelings : ${allInfo.content}`;
};

const weatherData = async (baseUrl, zipValue, apiKey) => {
  const res = await fetch(baseUrl + zipValue + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
//function to post data
const postData = async (url = "", information = {}) => {
  console.log({ information });
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(information),
  });
  try {
    const newData = await res.json();
    console.log({ newData });
    return newData;
  } catch (error) {
    console.error(error);
  }
};


//function to present Information
const presentUpdates = async () => {
  const req = await fetch(" http://127.0.0.1:9999/all");
  try {
    const allInfo = await req.json();
    console.log({ allInfo });
    editHtml(allInfo);
  } catch (error) {
    console.error(error);
  }
};

//This function executed when the event (click) happens
const preformEvent = (event) => {
  console.log("clicked");
  const zipValue = document.getElementById("zip").value;
  const feelingsValue = document.getElementById("feelings").value;
  weatherData(baseUrl, zipValue, apiKey)
    .then((data) => {
      postData(" http://127.0.0.1:9999/add", {
        date: newDate,
        temp: Math.round(data.list[0].main.temp),
        content: feelingsValue,
      });
    })
    .then((res) => {
      presentUpdates();
    });
};

document.getElementById("generate").addEventListener("click", preformEvent);
