/**
 * LÓGICA DE INVITACIÓN WEB - FIESTA PATRONAL
 */

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. EFECTO DE CARGA (LOADER)
    // ==========================================
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("fade-out");
        }, 500); // Pequeña pausa para una transición suave
    });

    // ==========================================
    // 2. MÚSICA DE FONDO (AUDIO)
    // ==========================================
    const music = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");
    
    // Bajar volumen por defecto para que sea sutil
    if (music) {
        music.volume = 0.4;
    }

    if (musicToggle && music) {
        musicToggle.addEventListener("click", () => {
            if (music.paused) {
                music.play().then(() => {
                    musicToggle.classList.remove("muted");
                    musicToggle.querySelector("i").className = "fas fa-music";
                }).catch(error => {
                    console.log("El navegador bloqueó la reproducción automática: ", error);
                });
            } else {
                music.pause();
                musicToggle.classList.add("muted");
                musicToggle.querySelector("i").className = "fas fa-volume-mute";
            }
        });
    }

    // ==========================================
    // 3. CUENTA REGRESIVA (COUNTDOWN)
    // ==========================================
    // Configura la fecha de la fiesta aquí: YYYY-MM-DDTHH:MM:SS
    const targetDate = new Date("2026-06-20T10:00:00").getTime();

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "<div class='time-box' style='width: 100%; height: auto; padding: 20px;'><span class='time-label' style='font-size: 1.2rem; color: var(--accent-color); font-weight: bold;'>¡HA EMPEZADO LA FESTIVIDAD!</span></div>";
            return;
        }

        // Cálculos de tiempo
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Actualizar el DOM
        document.getElementById("days").textContent = days < 10 ? "0" + days : days;
        document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;

    }, 1000);

    // ==========================================
    // 4. ANIMACIONES AL HACER SCROLL (SCROLL REVEAL)
    // ==========================================
    const revealElements = document.querySelectorAll(".scroll-reveal");

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add("active");
            }
        });
    };

    // Registrar evento de scroll
    window.addEventListener("scroll", revealOnScroll);
    // Ejecutar una vez al cargar por si hay elementos ya visibles
    setTimeout(revealOnScroll, 600);

    // ==========================================
    // 5. RSVP - FORMULARIO / CONFIRMACIÓN POR WHATSAPP
    // ==========================================
    const btnConfirm = document.getElementById("btn-confirm");
    
    if (btnConfirm) {
        btnConfirm.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Personaliza el mensaje y número de WhatsApp aquí
            const phone = "51958383038"; // Celular Familia Tapia Torres - WhatsApp
            const message = "¡Hola! Confirmo con mucha alegría mi asistencia al tradicional Llant'akuy 2026 de la Familia Tapia Torres. ¡Allí estaremos!";
            
            // Construir enlace de WhatsApp API
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
            
            // Abrir en una pestaña nueva
            window.open(whatsappUrl, "_blank");
        });
    }

    // ==========================================
    // 6. NAVEGACIÓN SUAVE (SMOOTH SCROLL) PARA LINKS
    // ==========================================
    const scrollLinks = document.querySelectorAll(".scroll-to");
    scrollLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});
