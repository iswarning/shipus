// add class container modal login
jQuery("#modal-login").addClass("container");
jQuery("#modal-login .modal-dialog")?.addClass("row");

// add class container modal register
jQuery("#modal-register").addClass("container");
jQuery("#modal-register .modal-dialog")?.addClass("row");


// Remove footer margin bottom
jQuery(".footer__logo")?.removeClass("mb-5");
jQuery(".shadow").removeClass("mb-5");


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
      $("#click-user").click();
      // $("btn-login").click();
      // document.getElementById('modal-register').style.overflow = "scroll";
    }
  }
