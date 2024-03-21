document.addEventListener("DOMContentLoaded", () => {
  const fetchBtn = document.getElementById("fetch-btn");
  const dogInfo = document.getElementById("dog-info");
  const dogImage = document.getElementById("dog-image");
  const dogFact = document.getElementById("dog-fact");
  const downloadBtn = document.getElementById("download-btn");
  const likeBtn = document.getElementById("like-btn");
  const likeCount = document.getElementById("like-count");
  const commentSection = document.getElementById("comment-section");
  const commentInput = document.getElementById("comment-input");
  const commentList = document.getElementById("comment-list");
  const dogpicture = document.getElementById("dog-image");
  const pictureName = document.getElementById("pictureName");
  const darkModeButton = document.getElementById("darkModeButton");

  fetchBtn.addEventListener("click", fetchDogFact);
  downloadBtn.addEventListener("click", downloadImage);
  likeBtn.addEventListener("click", likeFact);
  commentInput.addEventListener("keypress", handleCommentInput);

  function fetchDogFact() {
    Promise.all([
      fetch("https://dog-api.kinduff.com/api/facts"),
      fetch("https://dog.ceo/api/breeds/image/random"),
    ])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((data) => {
        const fact = data[0].facts[0];
        const imageUrl = data[1].message;
        dogFact.textContent = fact;
        dogImage.src = imageUrl;
        showDogInfo();
      })
      .catch((error) => console.error("Error fetching dog data:", error));
  }

  function downloadImage() {
    const imageUrl = dogImage.src;
    const downloadLink = document.createElement("a");
    downloadLink.href = imageUrl;
    downloadLink.download = "dog_image.jpg";
    downloadLink.click();
  }

  function likeFact() {
    let currentLikes = parseInt(likeCount.textContent);
    currentLikes++;
    likeCount.textContent = currentLikes;
  }

  function handleCommentInput(event) {
    if (event.key === "Enter") {
      addComment();
    }
  }

  function addComment() {
    const commentText = commentInput.value.trim();
    if (commentText !== "") {
      const newComment = document.createElement("li");
      newComment.textContent = commentText;
      commentList.appendChild(newComment);
      commentInput.value = "";
    }
  }

  function showDogInfo() {
    dogInfo.classList.remove("hidden");
    commentSection.classList.remove("hidden");
  }
});

darkModeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

dogpicture.addEventListener("mouseover", () => {
  pictureName.textContent = dogImage.alt;
});

dogpicture.addEventListener("mouseout", () => {
  pictureName.textContent = "";
});
