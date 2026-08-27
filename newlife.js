// 1. Configuração do Tailwind CSS
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#a14000",
                "primary-container": "#fd7a33",
                "tertiary-fixed-dim": "#ffb68d",
                "on-tertiary-container": "#582b0c",
                "on-surface-variant": "#584238",
                "on-secondary-fixed-variant": "#753407",
                "tertiary-container": "#d3916a",
                "primary-fixed": "#ffdbcc",
                "error-container": "#ffdad6",
                "on-secondary-container": "#763408",
                "tertiary-fixed": "#ffdbc9",
                "tertiary": "#87512f",
                "surface-container-highest": "#ffdcc2",
                "surface-container-high": "#ffe3cf",
                "on-tertiary": "#ffffff",
                "on-surface": "#2b1705",
                "inverse-surface": "#432b17",
                "on-primary-fixed-variant": "#7b2f00",
                "on-tertiary-fixed": "#321200",
                "secondary-fixed": "#ffdbca",
                "surface-dim": "#fad3b5",
                "secondary-container": "#fd9f6c",
                "background": "#fff8f5",
                "error": "#ba1a1a",
                "on-primary-fixed": "#351000",
                "on-background": "#2b1705",
                "on-error": "#ffffff",
                "secondary-fixed-dim": "#ffb690",
                "inverse-on-surface": "#ffede2",
                "on-secondary-fixed": "#341100",
                "primary-fixed-dim": "#ffb694",
                "surface-container": "#ffeadc",
                "surface": "#fff8f5",
                "outline": "#8b7266",
                "surface-tint": "#a14000",
                "secondary": "#934a1e",
                "inverse-primary": "#ffb694",
                "on-primary-container": "#612400",
                "surface-container-low": "#fff1e9",
                "on-error-container": "#93000a",
                "outline-variant": "#dfc0b3",
                "on-tertiary-fixed-variant": "#6b3a1a",
                "surface-variant": "#ffdcc2",
                "surface-container-lowest": "#ffffff",
                "on-secondary": "#ffffff",
                "on-primary": "#ffffff",
                "surface-bright": "#fff8f5"
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            spacing: {
                "base": "8px",
                "sm": "12px",
                "gutter": "24px",
                "container-max": "1200px",
                "md": "24px",
                "xl": "80px",
                "lg": "48px",
                "xs": "4px"
            },
            fontFamily: {
                "body-md": ["Manrope", "sans-serif"],
                "display-lg-mobile": ["Playfair Display", "serif"],
                "headline-sm": ["Playfair Display", "serif"],
                "headline-md": ["Playfair Display", "serif"],
                "button": ["Manrope", "sans-serif"],
                "label-md": ["Manrope", "sans-serif"],
                "display-lg": ["Playfair Display", "serif"],
                "body-lg": ["Manrope", "sans-serif"]
            },
            fontSize: {
                "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
                "display-lg-mobile": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
                "headline-sm": ["24px", { lineHeight: "1.4", fontWeight: "600" }],
                "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "600" }],
                "button": ["16px", { lineHeight: "1", letterSpacing: "0.02em", fontWeight: "600" }],
                "label-md": ["14px", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "600" }],
                "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
                "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }]
            }
        }
    }
};

// 2. Comportamentos interativos do site
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('#menu-btn');
    const mobileMenu = document.querySelector('#menu-mobile');

    if (menuButton && mobileMenu) {
        const menuIcon = menuButton.querySelector('.material-symbols-outlined');

        const closeMenu = () => {
            mobileMenu.classList.add('hidden');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-label', 'Abrir menu');
            if (menuIcon) menuIcon.textContent = 'menu';
        };

        menuButton.addEventListener('click', () => {
            const willOpen = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            menuButton.setAttribute('aria-expanded', String(willOpen));
            menuButton.setAttribute('aria-label', willOpen ? 'Fechar menu' : 'Abrir menu');
            if (menuIcon) menuIcon.textContent = willOpen ? 'close' : 'menu';
        });

        mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    }

    const slides = [...document.querySelectorAll('.testimonial-slide')];
    const dots = [...document.querySelectorAll('.carousel-dot')];
    const previousButton = document.querySelector('#testimonial-prev');
    const nextButton = document.querySelector('#testimonial-next');
    const status = document.querySelector('#carousel-status');
    let currentSlide = 0;

    const showSlide = (index) => {
        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            slide.hidden = slideIndex !== currentSlide;
        });

        dots.forEach((dot, dotIndex) => {
            const isCurrent = dotIndex === currentSlide;
            dot.setAttribute('aria-current', String(isCurrent));
            dot.classList.toggle('bg-primary-container', isCurrent);
            dot.classList.toggle('bg-outline-variant', !isCurrent);
        });

        if (status) status.textContent = `Depoimento ${currentSlide + 1} de ${slides.length}`;
    };

    previousButton?.addEventListener('click', () => showSlide(currentSlide - 1));
    nextButton?.addEventListener('click', () => showSlide(currentSlide + 1));
    dots.forEach((dot) => dot.addEventListener('click', () => showSlide(Number(dot.dataset.slideTo))));
});