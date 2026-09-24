# Shared CSS

فایل‌های CSS کپی‌شده از `node_modules` به این پوشه:

| فایل | مبدأ (node_modules) |
|---|---|
| `swiper-bundle.min.css` | `swiper/swiper-bundle.min.css` |
| `apexcharts.css` | `apexcharts/dist/apexcharts.css` |
| `tabulator.min.css` | `tabulator-tables/dist/css/tabulator.min.css` |

- `input.css` ورودی Tailwind v4 با `@import` از `design-system/tokens.css`
- `output.css` خروجی build شده (دستی ویرایش نشود)

## Build

```bash
npm run build:css
npm run watch:css
```