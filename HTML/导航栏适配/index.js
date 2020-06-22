const icon = document.querySelector(".icon");
const navMenu = document.querySelector(".nav-menu");
const navMenuLi = document.querySelectorAll(".nav-menu li");

icon.addEventListener("click", () => {
    icon.classList.toggle("active") //开关
    navMenu.classList.toggle("off")
    navMenuLi.forEach((item, index) => {
        if (item.style.animation) {
            item.style.animation = "";
        } else {
            item.style.animation = `0.3s ease-in identifier forwards ${index * 0.1 + 0.3}s`;
        }
    })
})