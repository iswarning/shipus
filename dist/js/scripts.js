$(document).ready(() => {
    $(".header").css("top", -$(".header").height());

    $("#btn-menu-mobile").click(() => {
        openMenu();
    });

    $("#close-menu-mobile").click(() => {
        closeMenu();
    });

    $("#btn-cart-mobile").click(() => {
        openCart();
    });

    $("#close-cart-mobile").click(() => {
        closeCart();
    });

    $("#overlay").click(() => {
        closeMenu();
        closeCart();
    });
});

$(window).scroll(() => {
    if ($(window).scrollTop() > $(".header").height()) {
        $(".header").addClass("sticky");
    } else {
        $(".header").removeClass("sticky");
    }
});

function openMenu() {
    $("#menu--mobile").css("right", 0);
    $("#content--main").css("margin-left", -$("#menu--mobile").width());
    $("#overlay").show();
}

function closeMenu() {
    $("#menu--mobile").css("right", -$("#menu--mobile").width());
    $("#content--main").css("margin-left", 0);
    $("#overlay").hide();
}

function openCart() {
    $("#cart--mobile").css("right", 0);
    $("#content--main").css("margin-left", -$("#cart--mobile").width());
    $("#overlay").show();
}

function closeCart() {
    $("#cart--mobile").css("right", -$("#cart--mobile").width());
    $("#content--main").css("margin-left", 0);
    $("#overlay").hide();
}
