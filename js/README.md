# Shared JavaScript

فایل‌های JS کپی‌شده از `node_modules` به این پوشه:

| فایل | مبدأ (node_modules) | حجم |
|---|---|---|
| `lucide.js` | `lucide/dist/umd/lucide.js` | 588 KB |
| `lucide.min.js` | `lucide/dist/umd/lucide.min.js` | 350 KB |
| `swiper-bundle.min.js` | `swiper/swiper-bundle.min.js` | 152 KB |
| `gsap.min.js` | `gsap/dist/gsap.min.js` | 72 KB |
| `ScrollTrigger.min.js` | `gsap/dist/ScrollTrigger.min.js` | 44 KB |
| `ScrollToPlugin.min.js` | `gsap/dist/ScrollToPlugin.min.js` | 4 KB |
| `apexcharts.min.js` | `apexcharts/dist/apexcharts.min.js` | 563 KB |
| `date-fns-jalali.min.js` | `date-fns-jalali/cdn.min.js` | 109 KB |
| `tabulator.min.js` | `tabulator-tables/dist/js/tabulator.min.js` | 438 KB |

## بارگذاری در PHP

```php
<script src="../../SHARED_ASSETS/js/swiper-bundle.min.js"></script>
<script src="../../SHARED_ASSETS/js/apexcharts.min.js"></script>
```

## بارگذاری با ES Module

```js
import Swiper from '../../SHARED_ASSETS/js/swiper-bundle.min.js';
```

تمام نسخه‌ها فقط در `SHARED_ASSETS/package.json` تغییر کنند و مجدداً کپی شوند.