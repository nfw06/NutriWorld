# 🌿 NutriWorld

Piattaforma web su alimentazione consapevole e salute globale.

## Tema
**Salute e Benessere** — Progetto di Educazione Civica

## Funzionalità
- 🥗 Ricerca alimenti con valori nutrizionali (OpenFoodFacts API)
- 🌍 Dashboard salute globale per paese (dati OMS)
- 📔 Diario alimentare personale (richiede login)
- 🔐 Registrazione e login con JWT
- 🌐 Web Service REST con autenticazione JWT

## Stack Tecnologico
- **Backend:** Node.js + Express
- **View:** Pug (template engine)
- **Frontend:** HTML / CSS / JavaScript
- **Auth:** JWT + express-session
- **API esterne:** OpenFoodFacts, dati OMS

## Architettura MVC
```
nutriworld/
├── controllers/   ← logica delle richieste
├── models/        ← gestione dati
├── views/         ← template Pug
├── routes/        ← definizione URL
├── services/      ← integrazione API esterne
├── middleware/    ← autenticazione
└── public/        ← CSS, JS, immagini
```

## Web Service API
| Endpoint | Metodo | Auth | Descrizione |
|---|---|---|---|
| `/api/health` | GET | No | Stato del server |
| `/api/auth/token` | POST | No | Ottieni token JWT |
| `/api/countries` | GET | JWT | Lista paesi con dati salute |
| `/api/countries/:code` | GET | JWT | Dati singolo paese |
| `/api/stats` | GET | JWT | Statistiche globali |
| `/api/food/search?q=` | GET | JWT | Ricerca alimenti |

## Installazione
```bash
npm install
cp .env.example .env
npm run dev
```

## Autori
- William Ferrari (nfw06)
