function showModalRegister() {
    var register = document.getElementById('modal-register');
    var login = document.getElementById('modal-login');

    login.classList.remove("show");
    
    login.style.display = "none";
    register.className = "modal show";
    register.style.display = "block";
  }

  function showModalLogin() {
    var register = document.getElementById('modal-register');
    var login = document.getElementById('modal-login');

    register.classList.remove("show");

    register.style.display = "none";
    login.className = "modal show";
    login.style.display = "block";
  }

  function closeRegister() {
    document.getElementById('modal-register').classList.remove("show");
    document.getElementById('modal-register').style.display= "none";
    const el = document.querySelector('div.modal-backdrop');
    if(el){
      el.classList.remove("modal-backdrop");
      el.classList.remove("show");
    }
  }