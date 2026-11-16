# Backend для тестового завдання

Маленький API поверх Stripe (тільки test mode). Він уже готовий, змінювати його не потрібно.

## Запуск

Потрібен Node.js 22.9+.

```bash
npm install
cp .env.example .env   # вписати тестові ключі Stripe
npm run dev
```

API піднімається на `http://localhost:4242`. Запити дозволені з `http://localhost:5173` (змінюється через `CLIENT_ORIGIN` у `.env`).

## Ключі Stripe

1. Зареєструйтесь на https://dashboard.stripe.com/register (активувати акаунт і вводити дані бізнесу не потрібно).
2. Переконайтесь, що ви в test mode / sandbox.
3. Developers -> API keys: скопіюйте `Publishable key` (`pk_test_…`) і `Secret key` (`sk_test_…`) у `.env`.
4. Settings -> Payments -> Payment methods: перевірте, що для EUR увімкнений хоча б один метод з редіректом. Зазвичай Stripe вмикає кілька таких методів одразу після реєстрації.

З live-ключами сервер не запуститься. Файл `.env` у git не потрапляє.

## API

Усі відповіді в JSON. Суми в мінімальних одиницях валюти (центи).

### `GET /config`

```json
{ "publishableKey": "pk_test_…" }
```

### `GET /flow`

Повертає флоу: назву і впорядкований список ключів екранів.

Необов'язковий параметр `name`: `GET /flow?name=short`. Без параметра повертається флоу `default`.

```json
{ "name": "default", "screens": ["phone", "email", "quiz_single", "quiz_multi", "checkout", "success"] }
```

Доступні флоу: `default`, `short`, `experimental`. Для невідомої назви відповідь `404` з кодом `flow_not_found`.

Ключі екранів:

| ключ | екран |
|---|---|
| `phone` | введення телефону |
| `email` | введення email |
| `quiz_single` | квіз з одним варіантом |
| `quiz_multi` | квіз з кількома варіантами |
| `checkout` | вибір тарифу та оплата |
| `success` | екран після оплати |

Список флоу і ключів може змінюватися на боці бекенда. У флоу може трапитися ключ, якого фронтенд не знає.

### `GET /plans`

```json
{
  "plans": [
    { "id": "weekly", "name": "1 week", "amount": 699, "currency": "eur", "period": "week" },
    { "id": "monthly", "name": "1 month", "amount": 1499, "currency": "eur", "period": "month", "popular": true },
    { "id": "yearly", "name": "1 year", "amount": 4999, "currency": "eur", "period": "year" }
  ]
}
```

### `POST /payments`

Створює платіж для обраного плану. Суму визначає бекенд за `planId`.

Тіло:

```json
{ "planId": "monthly", "email": "user@example.com", "phone": "+380501234567" }
```

Усі три поля обов'язкові. `phone` у міжнародному форматі E.164: `+`, код країни і номер, лише цифри, без пробілів і дужок.

Необов'язковий заголовок `Idempotency-Key: <унікальний рядок>`: повторний запит із тим самим ключем і тим самим тілом поверне той самий платіж, а не створить новий.

Відповідь `201`:

```json
{
  "id": "pi_…",
  "status": "requires_payment_method",
  "planId": "monthly",
  "amount": 1499,
  "currency": "eur",
  "errorMessage": null,
  "clientSecret": "pi_…_secret_…"
}
```

`clientSecret` потрібен Stripe.js на фронті, щоб показати форму оплати й підтвердити платіж.

### `GET /payments/:id`

Актуальний стан платежу напряму зі Stripe. Та сама форма, що й вище, але без `clientSecret`.

Можливі `status`:

| status | що означає |
|---|---|
| `requires_payment_method` | платіж ще не оплачений або остання спроба не вдалася (відмова картки, провалений 3DS); причина в `errorMessage` |
| `requires_action` | потрібна дія користувача (3DS, редірект) |
| `processing` | Stripe ще обробляє платіж, фінального результату немає |
| `succeeded` | оплата пройшла |
| `canceled` | платіж скасовано |

### Помилки

```json
{ "error": { "code": "invalid_plan", "message": "…" } }
```

| HTTP | code | коли |
|---|---|---|
| 400 | `invalid_plan`, `invalid_email`, `invalid_phone`, `invalid_payment_id`, `invalid_json` | некоректний запит |
| 404 | `not_found`, `flow_not_found`, `resource_missing` | немає такого маршруту, флоу або платежу |
| 503 | `stripe_not_configured` | у `.env` немає ключів |
| інше | код помилки Stripe | помилка на боці Stripe |

## Тестові дані

Номери тестових карток (успіх, відмова, 3DS) і поведінка редіректних методів у test mode описані в документації Stripe: https://docs.stripe.com/testing
