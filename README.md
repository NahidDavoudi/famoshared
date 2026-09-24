# Famo Shared Assets

مرکز assetها و ابزارهای مشترک frontend برای `famo`، `admin`، `dashboard`، `nobat` و `plan`.

## ساختار

```text
SHARED_ASSETS/
├── css/
│   ├── input.css
│   └── README.md
├── js/
│   └── README.md
├── fonts/       # فونت‌های مشترک در این مسیر نگهداری می‌شوند
├── images/      # تصاویر واقعاً مشترک، نه تصاویر صفحه‌ای
├── package.json
└── package-lock.json
```

## کتابخانه‌های استاندارد

- `lucide`: آیکن‌های مشترک
- `swiper`: اسلایدر و carousel
- `gsap`: انیمیشن
- `apexcharts`: نمودار، به‌عنوان انتخاب استاندارد فعلی
- `date-fns-jalali`: تاریخ جلالی
- `tabulator-tables`: جدول‌های تعاملی
- `tailwindcss` و `@tailwindcss/cli`: ابزار build CSS

برای نمودارهای مشترک، انتخاب استاندارد `ApexCharts` است. `chart.js` به manifest اضافه نشده تا هم‌زمان دو کتابخانه نمودار و حجم vendor اضافی وارد پروژه نشود.

## نصب

از داخل همین پوشه اجرا شود:

```bash
npm install
npm run build:css
```

هر پروژه باید نسخه‌های این فایل را مصرف کند و از نصب موازی نسخه متفاوت همان کتابخانه در `famo` یا `admin` خودداری شود. انتقال کامل مصرف‌کننده‌ها در مرحله بعد و به‌صورت تدریجی انجام می‌شود.
