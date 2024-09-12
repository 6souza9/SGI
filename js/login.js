document.addEventListener('DOMContentLoaded', () => {
  const validUser = {
    username: "Admin",
    password: "Admin123"
  };

  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Verifica as credenciais
    if (username === validUser.username && password === validUser.password) {
      // Redireciona para a página principal
      window.location.href = "telaPrincipal.html";
    } else {
      // Mostra uma mensagem de erro
      alert("Nome de usuário ou senha incorretos.");
    }
  });
});
