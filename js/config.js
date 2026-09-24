/**
 * Famo shared frontend configuration (backend-free).
 *
 * Load this first in the <head> of static pages (e.g. admin/index.html) before
 * any other script. It detects the environment from window.location.hostname and
 * exposes window.APP_CONFIG.assetUrl / window.APP_CONFIG.apiUrl.
 *
 * Production addresses are intentionally left blank — fill them in once the
 * production asset/API hosts are known.
 *
 * Optional: declare the shared assets to load as a comma-separated list on the
 * script tag itself, and they are injected in order at parse time:
 *
 *   <script src="../shared/js/config.js"
 *           data-assets="css/output.css,css/fonts.css,js/libs/lucide.min.js"></script>
 */
(function () {
    'use strict';

    var host = window.location.hostname;
    var isDev = host === 'localhost' || host === '127.0.0.1';

    // Local development addresses.
    var DEV_ASSET = '../shared';
    var DEV_API = 'http://localhost:8080/api/v1';

    // Production addresses — fill these in (leave blank to keep same-origin).
    var PROD_ASSET = '';
    var PROD_API = '';

    var existing = window.APP_CONFIG || {};

    var assetUrl = existing.assetUrl !== undefined ? existing.assetUrl : (isDev ? DEV_ASSET : PROD_ASSET);
    var apiUrl = existing.apiUrl !== undefined ? existing.apiUrl : (isDev ? DEV_API : PROD_API);

    window.APP_CONFIG = {
        assetUrl: assetUrl,
        apiUrl: apiUrl
    };

    /**
     * Build an absolute/relative URL for a shared asset.
     * @param {string} path Path relative to the shared root, e.g. "svg/eye-open.svg".
     */
    window.FAMO_ASSET = function (path) {
        var base = (window.APP_CONFIG && window.APP_CONFIG.assetUrl) || '../shared';
        return String(base).replace(/\/$/, '') + '/' + String(path).replace(/^\//, '');
    };

    var script = document.currentScript;

    // Rewrite any [data-famo-asset] markers already present in the document.
    function applyAssetAttributes() {
        var nodes = document.querySelectorAll('[data-famo-asset]');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].setAttribute('src', window.FAMO_ASSET(nodes[i].getAttribute('data-famo-asset')));
        }
    }

    if (script) {
        var assets = script.getAttribute('data-assets');
        if (assets) {
            var base = (window.APP_CONFIG.assetUrl || '../shared').replace(/\/$/, '');
            var tags = assets.split(',')
                .map(function (item) { return item.trim(); })
                .filter(Boolean)
                .map(function (item) {
                    var url = base + '/' + item.replace(/^\//, '');
                    if (/\.css$/.test(item)) {
                        return '<link rel="stylesheet" href="' + url + '">';
                    }
                    return '<script src="' + url + '"><\/script>';
                });
            document.write(tags.join(''));
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', applyAssetAttributes);
        } else {
            applyAssetAttributes();
        }
    }
})();