const weatherForm = document.querySelector("form");
const search = document.querySelector("input[type='text']");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "";
messageTwo.textContent = "";
weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  if (search.length === 0) {
    messageOne.textContent = "Please Enter a Location";
    messageTwo.textContent = " ";
  }
  messageOne.textContent = "Loading...";

  //   messageOne.innerHTML += `<img src='./images/Spinner-1s-200px.gif' style="height:200px; position:relative;" />`;
  const location = search.value;
  fetch("/weather?address=" + location).then(res => {
    res.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = " ";
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
