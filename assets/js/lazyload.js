/**  
 * Auteurs: Geovany et Carlory
 * Documentation de lazyload.js
 * Ce script est la pour gerer le chargement des pages et des rapports Power BI dans l'application Radar.
 * Les pages sont chargees dans le cache du navigateur a l'origine mais sont gardees cacher, seul le premier rapport (Patients et Dossiers) est affiche par defaut.
 * Pour une optimisation du chargement des rapports, l'API Intersection Observer est utilisee dans ce script.
*/

document.addEventListener("DOMContentLoaded", function () {
    function showSection(sectionId) {
        const sections = document.querySelectorAll('.section');
        sections.forEach(sec => {
            sec.classList.remove('visible');
        });

        const sectionToShow = document.getElementById(sectionId);
        if (sectionToShow) {
            sectionToShow.classList.add('visible');
        }
    }

    function loadSectionFromHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            showSection(hash);
        } else {
            showSection('section1');
        }
    }

    // Charger la section appropriée lors du chargement de la page
    loadSectionFromHash();

    // Gérer les clics sur les liens de section
    document.querySelectorAll('a[data-section]').forEach(a => {
        a.addEventListener('click', function (event) {
            event.preventDefault();
            const sectionId = this.getAttribute('data-section');
            window.location.hash = sectionId;
            loadSectionFromHash();
        });
    });

    // Gérer les changements de hash dans l'URL
    window.addEventListener('hashchange', function () {
        loadSectionFromHash();
    });

    // Fonction pour charger l'iframe
    function loadIframe(iframe) {
        const src = iframe.getAttribute('data-src'); // Récupérer l'URL à partir de data-src
        if (src) {
            iframe.setAttribute('src', src); // Remplacer data-src par src
            iframe.removeAttribute('data-src'); // Supprimer l'attribut data-src
        }
    }

    // Options pour l'Intersection Observer
    const options = {
        root: null, // viewport par défaut
        rootMargin: '0px',
        threshold: 0.1 // déclenchement quand 10% de l'iframe est visible
    };

    // Création de l'observateur
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadIframe(entry.target); // Charger l'iframe quand elle devient visible
                observer.unobserve(entry.target); // Arrêter d'observer cette iframe
            }
        });
    }, options);

    // Sélection de toutes les iframes avec data-src
    const iframes = document.querySelectorAll('iframe[data-src]');
    iframes.forEach(iframe => {
        observer.observe(iframe); // Observer chaque iframe
    });

    // Gestion du collapse des nav-content
    $(document).ready(function () {
        $('a[data-section]').on('click', function () {
            $('.nav-content.collapse').collapse('hide');
        });
    });
});
