## Локальний запуск

Потрібен Node.js `22.9` або новіший і Stripe-акаунт у test mode.

1. Встановити залежності в корені та в кожній частині проєкту:

   ```powershell
   npm install
   npm --prefix backend install
   npm --prefix frontend install
   ```

2. Створити локальні файли конфігурації:

   ```powershell
   Copy-Item backend/.env.example backend/.env
   Copy-Item frontend/.env.example frontend/.env
   ```

3. У `backend/.env` вказати тестові `STRIPE_SECRET_KEY` і `STRIPE_PUBLISHABLE_KEY` з Stripe Dashboard. Значення `CLIENT_ORIGIN` за замовчуванням — `http://localhost:5173`.

4. У `frontend/.env` вказати адресу API:

   ```env
   VITE_API_URL=http://localhost:4242
   ```

5. Запустити frontend і backend з кореня:

   ```powershell
   npm run dev
   ```

   Frontend буде доступний на `http://localhost:5173`, API — на `http://localhost:4242`.

Тестові картки та сценарії Stripe описані в [документації Stripe](https://docs.stripe.com/testing). Не додавайте реальні ключі до репозиторію: `.env` ігнорується Git.

## Структура проєкту

```text
.
├── frontend/
│   └── src/
│       ├── components/       # перевикористовувані UI-компоненти та layout
│       ├── constants/        # маршрути, ключі екранів і тема
│       ├── hooks/            # типізовані Redux-хуки та навігація флоу
│       ├── screens/          # екрани onboarding; checkout має власні підкомпоненти
│       ├── services/api/     # HTTP-клієнт, API-методи й типи відповідей
│       └── store/            # Redux slices: flow, onboarding, payment
├── backend/                  # наданий Express API поверх Stripe
└── package.json              # спільні dev-скрипти та конфігурація інструментів
```

Frontend розділено за відповідальністю, а не за типом файлу одного екрану. `screens` містить UI конкретного кроку; API-деталі ізольовані в `services/api`; стан, який має переживати навігацію та перезавантаження, зберігається в Redux Persist.

Порядок кроків не зашитий у клієнті: `AppInitializer` отримує його з `GET /flow`, а `useFlowNavigation` переходить до наступного ключа в цьому масиві. Це дозволяє серверу змінювати набір і послідовність підтримуваних екранів. `InitialRedirect` пропускає ключі, яких фронтенд ще не знає.

## Як додати новий екран

Нижче приклад для серверного ключа `profile`.

1. Створіть `frontend/src/screens/profile.tsx`. Використовуйте спільні компоненти з `@/components`; за потреби збережіть значення у `onboarding` slice.
2. Експортуйте екран з `frontend/src/screens/index.ts`.
3. Додайте ключ у `screenRegistry` в `frontend/src/constants/screens.ts` та маршрут у `routes` в `frontend/src/constants/routes.ts`.
4. Додайте `<Route path={routes.profile} element={<ProfileScreen />} />` до `frontend/src/App.tsx`.
5. Якщо екран збирає дані, додайте поле й action у `frontend/src/store/onboarding/slice.ts`. Дані, потрібні лише цьому екрану до submit, можна залишити локальним state.
6. Додайте `profile` у потрібний флоу на backend. Після цього API поверне його в `screens`, а прогрес-бар і `useFlowNavigation` врахують крок автоматично.

Ключ API, `screenRegistry`, `routes` і `<Route>` мають збігатися. Невідомі фронтенду ключі свідомо пропускаються під час стартового редиректу; навігація до них не додається, доки екран не реалізовано.

## Що не встигли

- Обробка API-помилок зараз показує загальний стан завантаження або текст помилки платежу. Її варто розширити мапінгом кодів бекенду на зрозумілі повідомлення та кнопкою повторної спроби на кожному критичному кроці.
- Не допускати юзера до сторінки /success в обхід оплаті
- Інші мови, аналітика, Lazy Loading

## Що робити далі

- Покрити тестами усі сценарії.
- Повторне опитування бекенду у разі якщо платіж досі обробляється
- Позбавитись кнопки "Submit" на сторінці /checkout
