const registerLabel = createElement("label", {
  textContent: "Register",
});
const registeruserInput = createElement("input", {
  id: "register-input",
  type: "text",
});
const registerBtn = createElement("button", {
  onclick: registerUser,
  textContent: "Register",
});

document
  .getElementById("sign-up-container")
  .append(registerLabel, registeruserInput, registerBtn);

const handleLoginClick = async () => {
  const username = document.getElementById("login-user").value;
  let res = await fetch(`http://localhost:3002/loginUser?username=${username}`);
  let isUserValid = await res.json();
  if (isUserValid) {
    localStorage.setItem(
      "username" ,username
    )
    window.location.href = "./chat-page.html";
   
  } else {
    alert("Not a valid user");
  }
};

async function registerUser() {
  const val = document.getElementById("register-input").value;
  postData = {
    name: val,
  };
  const userSignUp = await fetch("http://localhost:3002/signupUser", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await userSignUp.json();
  if (data.isSuccess) {
    let displayMessage = document.getElementById("display-msg");
    displayMessage.textContent = data.message;
  }
}
