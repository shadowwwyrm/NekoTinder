let imgSrc =
  "https://nekos.best/api/v2/neko/6d8c21aa-5d83-4fbf-8c99-6bae3230f575.png";
let artistName = "XXXXX";
let url = "xxxxxx";
let answerObject = {};

async function fetchData() {
  try {
    const response = await fetch("https://nekos.best/api/v2/neko");
    if (!response.ok) {
      throw new Error("виникла проблема");
    }
    const data = await response.json();
    imgSrc = data.results[0].url;
    artistName = data.results[0].artist_name;
    url = data.results[0].artist_href;
    answerObject.artistName = artistName;
    answerObject.url = url;

    document.getElementById("artist-name").textContent = artistName;

    const nekoImage = document.getElementById("neko-image");
    nekoImage.onload = () => {
      nekoImage.src = imgSrc;
    };
    nekoImage.src = imgSrc;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

fetchData();

document.getElementById("like").addEventListener("click", function () {
  let likedArray = JSON.parse(localStorage.getItem("likedArray")) || [];
  likedArray.push(answerObject);
  localStorage.setItem("likedArray", JSON.stringify(likedArray));
  location.reload();
});

document.getElementById("dislike").addEventListener("click", function () {
  location.reload();
});

document.getElementById("my-rating").addEventListener("click", function () {
  let likedArray = JSON.parse(localStorage.getItem("likedArray")) || [];

  let artistListContainer = document.getElementById("artist-list");
  artistListContainer.innerHTML =
    likedArray.length === 0
      ? "<p>нема</p>"
      : likedArray
          .map(
            (item) =>
              `<a href="${item.url}" target="_blank">${item.artistName}</a><br>`
          )
          .join("");

  document.getElementById("rating-dialog").showModal();
});

document.getElementById("close-dialog").addEventListener("click", function () {
  document.getElementById("rating-dialog").close();
});
