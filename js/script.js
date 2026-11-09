
function applyTimeTheme() {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 21) {
        document.body.classList.add('day-theme');
    } else {
        document.body.classList.remove('day-theme');
    }
}
applyTimeTheme();



const toysContainer = document.getElementById('toys-container');

if (toysContainer) {
    function spawnToy() {
        const toys = ['🧸', '🚂', '🧩', '🎨', '🪁'];
        const toyEl = document.createElement('div');


        toyEl.className = 'toy';

        toyEl.textContent = toys[Math.floor(Math.random() * toys.length)];



        toyEl.style.fontSize = '75px';


        toyEl.style.left = Math.random() * 90 + 'vw';
        toyEl.style.animationDuration = (Math.random() * 3 + 3) + 's';


        toysContainer.appendChild(toyEl);


        setTimeout(() => {
            toyEl.remove();
        }, 6000);
    }

    setInterval(spawnToy, 1200);
}



const accBtn = document.querySelector(".accordion-btn");

if (accBtn) {
    accBtn.addEventListener("click", function() {
        this.classList.toggle("active");

        const panel = this.nextElementSibling;

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

<!-- For lab 5 -->
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');

    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener('click', () => {
            // Toggle active state for sliding menu and transforming icon
            burgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside of it
        document.addEventListener('click', (event) => {
            const isClickInside = burgerMenu.contains(event.target) || navMenu.contains(event.target);

            if (!isClickInside && navMenu.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});