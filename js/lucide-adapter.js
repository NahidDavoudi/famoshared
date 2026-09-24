/* Converts legacy sprite markup to the shared Lucide icon set and
   keeps dynamically inserted icons rendered. Used by public + admin. */
(function () {
    const iconMap = {
        'icon-alert': 'triangle-alert',
        'icon-arrow-left': 'arrow-left',
        'icon-arrow-right': 'arrow-right',
        'icon-book': 'book-open',
        'icon-brand-instagram': 'instagram',
        'icon-brand-whatsapp': 'message-circle',
        'icon-calendar': 'calendar-days',
        'icon-chart-bar': 'chart-column',
        'icon-check': 'check',
        'icon-chevron-down': 'chevron-down',
        'icon-chevron-left': 'chevron-left',
        'icon-chevron-right': 'chevron-right',
        'icon-close': 'x',
        'icon-clipboard': 'clipboard-list',
        'icon-clock': 'clock-3',
        'icon-device-floppy': 'save',
        'icon-download': 'download',
        'icon-edit': 'pencil',
        'icon-external-link': 'external-link',
        'icon-eye': 'eye',
        'icon-eye-closed': 'eye-off',
        'icon-eye-open': 'eye',
        'icon-file': 'file-text',
        'icon-filter': 'list-filter',
        'icon-headset': 'headset',
        'icon-help-circle': 'circle-help',
        'icon-home': 'house',
        'icon-id-card': 'id-card',
        'icon-info': 'info',
        'icon-key': 'key-round',
        'icon-keyboard': 'keyboard',
        'icon-logout': 'log-out',
        'icon-mail': 'mail',
        'icon-map-pin': 'map-pin',
        'icon-menu': 'menu',
        'icon-minus': 'minus',
        'icon-newspaper': 'newspaper',
        'icon-pause': 'pause',
        'icon-phone': 'phone',
        'icon-plus': 'plus',
        'icon-report': 'file-chart-column',
        'icon-save': 'save',
        'icon-school': 'school',
        'icon-search': 'search',
        'icon-settings': 'settings',
        'icon-star': 'star',
        'icon-telegram': 'send',
        'icon-trash': 'trash-2',
        'icon-upload': 'upload',
        'icon-user': 'user',
        'icon-user-plus': 'user-plus',
        'icon-users': 'users',
        'icon-x': 'x'
    };

    function lucideName(name) {
        return iconMap[name] || name.replace(/^icon-/, '') || 'circle-help';
    }

    function convertSpriteIcons(root = document) {
        root.querySelectorAll('svg > use[href*="#icon-"]').forEach((use) => {
            const svg = use.parentElement;
            const fragment = use.getAttribute('href').split('#')[1];
            const icon = document.createElement('i');
            icon.setAttribute('data-lucide', lucideName(fragment));
            icon.setAttribute('aria-hidden', svg.getAttribute('aria-hidden') || 'true');
            icon.className = svg.getAttribute('class') || 'icon';
            svg.replaceWith(icon);
        });
        root.querySelectorAll('use[href*="#icon-"]').forEach((use) => {
            const svg = use.closest('svg');
            if (!svg) return;
            const fragment = use.getAttribute('href').split('#')[1];
            const icon = document.createElement('i');
            icon.setAttribute('data-lucide', lucideName(fragment));
            icon.setAttribute('aria-hidden', svg.getAttribute('aria-hidden') || 'true');
            icon.className = svg.getAttribute('class') || 'icon';
            svg.replaceWith(icon);
        });
    }

    function render(root = document) {
        convertSpriteIcons(root);
        if (window.lucide) window.lucide.createIcons({ attrs: { 'aria-hidden': 'true' } });
    }

    window.famoLucideName = lucideName;
    window.refreshLucideIcons = function (root = document) {
        render(root);
    };

    function schedule() {
        if (schedule.pending) return;
        schedule.pending = true;
        window.requestAnimationFrame(() => {
            schedule.pending = false;
            if (document.querySelector('[data-lucide]:not(svg), svg > use[href*="#icon-"]')) {
                render();
            }
        });
    }

    function observe() {
        const observer = new MutationObserver(schedule);
        observer.observe(document.documentElement, { childList: true, subtree: true });
    }

    function init() {
        render();
        observe();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
