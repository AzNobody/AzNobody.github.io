document.addEventListener('DOMContentLoaded', function() {
    const typed = document.querySelector('.typed');
    if (typed) {
        let typed_strings = typed.getAttribute('data-typed-items');
        typed_strings = typed_strings.split(',');
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }

    function adjustScrollPosition(event) {
        event.preventDefault();

        var targetId = event.target.getAttribute('href').substring(1);
        var targetSection = document.getElementById(targetId);

        if (targetSection) {
            var navbarHeight = document.querySelector('.navbar').offsetHeight;
            var targetSectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset;
            var scrollToPosition = targetSectionTop - navbarHeight;

            window.scrollTo({
                top: scrollToPosition,
                behavior: 'smooth'
            });
        }
    }

    var navLinks = document.querySelectorAll('.navbar-categories .nav-link');
    navLinks.forEach(function(navLink) {
        navLink.addEventListener('click', adjustScrollPosition);
    });

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function updateActiveNavItem() {
        var navItems = document.querySelectorAll('.navbar-categories .nav-item');
        
        navItems.forEach(function(navItem) {
            navItem.classList.remove('active');
        });

        for (var i = 0; i < navItems.length; i++) {
            var navItem = navItems[i];
            var targetId = navItem.querySelector('.nav-link').getAttribute('href').substring(1);
            var targetSection = document.getElementById(targetId);
            if (targetSection && isElementInViewport(targetSection)) {
                navItem.classList.add('active');
                break;
            }
        }
    }

    updateActiveNavItem();

    window.addEventListener('scroll', function() {
        updateActiveNavItem();
    });
});
