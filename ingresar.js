const usuarios = [
  { username: "federico2022", password: "1234", user: "Federico" },
  { username: "laura2022", password: "1234", user: "Laura" },
  { username: "jose2022", password: "1234", user: "Jose" }
];

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");
const loginError = document.getElementById("login-error");

loginForm.addEventListener("submit", event => {
  event.preventDefault();
  
  const usernameValue = usernameInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  
  usernameError.textContent = usernameValue ? "" : "Por favor ingrese un nombre de usuario";
  passwordError.textContent = passwordValue ? "" : "Por favor ingrese una contraseña";
  
  const usuarioEncontrado = usuarios.find(usuario => usuario.username === usernameValue && usuario.password === passwordValue);
  
  loginError.textContent = usuarioEncontrado ? "Inicio de sesión exitoso!" : "Nombre de usuario o contraseña incorrectos";
  if (usuarioEncontrado) alert(`¡Bienvenido/a ${usuarioEncontrado.user}!`);
});
