function showProfile() {
    var profile = document.querySelector(".profile");

    if (profile.style.display != "block") {
        profile.style.display = "block";
        profile.classList.add("slide-left");
    } else {
        profile.style.display = "none";
    }
}

function showNotification() {
    var profile = document.querySelector(".notification");

    if (profile.style.display != "block") {
        profile.style.display = "block";
        profile.classList.add("slide-left");
    } else {
        profile.style.display = "none";
    }
}