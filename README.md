# 🧠Backend (Node.js + Express)

Dieses Backend verarbeitet Anfragen für eine Food Recognition Web-App.  
Es ermöglicht Benutzerregistrierung, Anmeldung und das Zählen von Bildanalysen.

---

## 🚀 Deployment

Die App ist als **Web Service auf [Render](https://render.com)** gehostet.  
Beim Deployment wird automatisch:

-   das Repository von GitHub gepullt
-   `npm install` ausgeführt
-   und der Server via `npm start` gestartet

Umgebungsvariablen wie die `DATABASE_URL` werden im Render-Dashboard gesetzt.  
Verbindungen zur Datenbank erfolgen über **SSL (TLS erforderlich)**.

---

## 🗄️ Datenbank

Das Backend verwendet eine **PostgreSQL-Datenbank**, gehostet ebenfalls auf Render.  
Es gibt zwei Tabellen:

-   `users`: speichert Benutzerinformationen, Registrierungszeitpunkt und Bildanalyse-Zähler
-   `login`: speichert gehashte Passwörter (mit argon2) getrennt von den Userdaten

Die Datenbankverbindung wird über **`knex.js`** verwaltet.

---

## 📦 Stack

-   **Node.js** + **Express**
-   **PostgreSQL** via **knex**
-   **argon2** zum sicheren Passwort-Hashing
-   CORS aktiviert für das GitHub Pages Frontend
