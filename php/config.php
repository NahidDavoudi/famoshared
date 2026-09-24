<?php
/**
 * Famo shared PHP configuration.
 *
 * Loads environment values (APP_MODE, ASSET_URL, API_URL) from a .env file and
 * exposes small helpers so PHP pages (public, dashboard, login) can build asset
 * and API URLs without hard-coding hosts.
 *
 * Resolution order for the .env file:
 *   1. Repo-root .env
 *   2. api/.env
 *   3. Real process environment (getenv/$_ENV/$_SERVER)
 *
 * If a value is not configured, the helpers fall back to the previous relative
 * behaviour so local development keeps working unchanged.
 */

if (!function_exists('famo_env')) {
    /**
     * Minimal .env parser that never overwrites already-set variables.
     */
    function famo_load_env(string $file): void
    {
        if (!is_readable($file)) {
            return;
        }

        $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines === false) {
            return;
        }

        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || $line[0] === '#' || strpos($line, '=') === false) {
                continue;
            }

            [$key, $value] = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);

            if ($key === '') {
                continue;
            }

            if (strlen($value) >= 2) {
                $first = $value[0];
                $last = $value[strlen($value) - 1];
                if (($first === '"' && $last === '"') || ($first === "'" && $last === "'")) {
                    $value = substr($value, 1, -1);
                }
            }

            if (getenv($key) !== false || isset($_ENV[$key]) || isset($_SERVER[$key])) {
                continue;
            }

            putenv($key . '=' . $value);
            $_ENV[$key] = $value;
            $_SERVER[$key] = $value;
        }
    }

    famo_load_env(__DIR__ . '/../../.env');
    famo_load_env(__DIR__ . '/../../api/.env');

    /**
     * Read an environment value with a default.
     */
    function famo_env(string $key, string $default = ''): string
    {
        $value = $_ENV[$key] ?? $_SERVER[$key] ?? getenv($key);

        if ($value === false || $value === null || $value === '') {
            return $default;
        }

        return (string) $value;
    }

    /**
     * Current environment mode (development | production).
     */
    function famo_app_mode(): string
    {
        $mode = famo_env('APP_MODE', famo_env('APP_ENV', 'production'));
        return strtolower(trim($mode));
    }

    function famo_is_dev(): bool
    {
        return famo_app_mode() === 'development';
    }

    /**
     * Build a URL for a shared asset.
     *
     * @param string $path     Asset path relative to the shared root, e.g. "css/output.css".
     * @param string $fallback Relative URL to use when ASSET_URL is not configured.
     */
    function famo_asset(string $path, string $fallback): string
    {
        $base = rtrim(famo_env('ASSET_URL'), '/');
        if ($base === '') {
            return $fallback;
        }

        return $base . '/' . ltrim($path, '/');
    }

    /**
     * Base URL that serves the shared assets, or null when not configured.
     */
    function famo_asset_base(): ?string
    {
        $base = rtrim(famo_env('ASSET_URL'), '/');
        return $base === '' ? null : $base;
    }

    /**
     * Full API base URL including the /api/v1 prefix, or null when unavailable.
     */
    function famo_api_url(): ?string
    {
        $base = rtrim(famo_env('API_URL'), '/');

        if ($base === '') {
            if (!famo_is_dev()) {
                return null;
            }
            $base = 'http://localhost:8080';
        }

        if (preg_match('#/api/v1$#', $base)) {
            return $base;
        }

        return $base . '/api/v1';
    }

    /**
     * Inline <script> that exposes the configured URLs to the browser as
     * window.APP_CONFIG. Returns an empty string when nothing is configured.
     */
    function famo_config_script(): string
    {
        $config = [];

        $assetBase = famo_asset_base();
        if ($assetBase !== null) {
            $config['assetUrl'] = $assetBase;
        }

        $apiUrl = famo_api_url();
        if ($apiUrl !== null) {
            $config['apiUrl'] = $apiUrl;
        }

        if ($config === []) {
            return '';
        }

        $json = json_encode($config, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        return '<script>window.APP_CONFIG = Object.assign(window.APP_CONFIG || {}, ' . $json . ');</script>';
    }
}