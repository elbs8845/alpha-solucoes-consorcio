// usuário inicial (admin)
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([
    { user: "admin", pass: "123", role: "admin" }
  ]));
}

function login() {
  const u = usuario.value;
  const p = senha.value;

  const users = JSON.parse(localStorage.getItem("users"));
  const found = users.find(x => x.user === u && x.pass === p);

  if (found) {
    localStorage.setItem("logged", JSON.stringify(found));
    location.href = "dashboard.html";
  } else {
    msg.innerText = "Usuário ou senha inválidos";
  }
}
