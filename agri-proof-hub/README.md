# 🌱 AgriMRV-Lite

Low-cost Monitoring, Reporting & Verification (MRV) for Smallholder Agriculture

AgriMRV-Lite is a beginner-friendly prototype that demonstrates an end-to-end MRV (Monitoring, Reporting & Verification) flow for smallholder farmers.
It is built with Lovable (React + TypeScript) for the frontend and Supabase for authentication, database, and secure data storage.

The goal is to create a scalable, cost-effective, and easy-to-use MRV system that empowers smallholder farmers while giving financial institutions & NABARD a transparent, verifiable way to measure climate-smart practices.

| Link Type       | URL                                                                 |
|-----------------|----------------------------------------------------------------------|
| **Live Demo**   | [Lovable Prototype](https://lovable.dev/projects/c1ba5e32-e78b-454b-b785-7cca257b671e) |

## 🚀 Features

- 🔐 Authentication – Secure signup/login with Supabase Auth

- 👨‍🌾 Farmer Management – Add farmers, track crops & locations

- 📊 Dashboard – Each user sees only their own farmers via Row Level Security (RLS)

- 📷 Offline-ready Inputs (Future) – Voice, images, video clips from farmers

- 🛰️ Satellite + IoT-lite Integration (Future) – Combine free satellite data & low-cost village sensors

🔗 Blockchain Proof-of-Practice (Future) – Tamper-proof verification for carbon credits

## 🛠️ Tech Stack
- Frontend

- Lovable.dev → Low-code React builder

- React.js + TypeScript

- TailwindCSS + shadcn/ui for UI components

- Backend

- Supabase

- Auth (user login/signup)


## 📂 Project Structure
```bash
AgriMRV-Lite/
│── frontend/ (Lovable React + TS)
│   ├── pages/
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   ├── dashboard.tsx
│   │   └── farmers.tsx
│   └── components/ (UI components)
│
│── supabase/ (Database + Auth)
│   ├── farmers.sql   (Schema for farmers table)
│   └── policies.sql  (RLS rules)
│
└── README.md
```
## 🏗️ System Architecture

The system follows a **frontend + backend + database** model:

- **Frontend (Lovable / React + TS)**
  - Provides user interface for login, dashboard, farmer entry
- **Supabase Auth**
  - Manages signup/login
- **Supabase Database**
  - Stores farmer records
  - Applies Row-Level Security (RLS) so each user only sees their own data
- **Future Extensions**
  - IoT sensors
  - Satellite data APIs
  - Blockchain proof-of-practice

![AgriMRV Architecture](https://github.com/user-attachments/assets/e016d8a5-0549-484c-82d1-80f7a0f563ee)

## ⚡ Getting Started
1️⃣ Clone or Open in Lovable

Create a new Lovable project

Paste the frontend prompts (auth + farmers dashboard)

## 2️⃣ Setup Supabase

- Create a Supabase project at https://supabase.com/dashboard

- Go to Settings → API Keys → Copy Project URL and anon key

- Add them in Lovable → Project Settings → Environment Variables
```bash
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
3️⃣ Database Schema

Run this SQL in Supabase → SQL Editor:
```bash
create table if not exists farmers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  crop text,
  created_at timestamp with time zone default now(),
  user_id uuid references auth.users (id) on delete cascade
);

alter table farmers enable row level security;

create policy "Users can view their own farmers"
on farmers for select
using (auth.uid() = user_id);

create policy "Users can insert their own farmers"
on farmers for insert
with check (auth.uid() = user_id);

create policy "Users can update their own farmers"
on farmers for update
using (auth.uid() = user_id);

create policy "Users can delete their own farmers"
on farmers for delete
using (auth.uid() = user_id);
```
## 4️⃣ Run Frontend

In Lovable, just Deploy & Preview.
Try:
```bash
/register → Create account

/login → Login

/dashboard → See your farmers

/farmers → Add new farmer record
```
## 🔐 Authentication (Supabase)

- In Supabase → Auth → Providers, enable Email (password).

- In Supabase → Auth → URL Configuration, add your Lovable preview domain to Redirect URLs (e.g. https://id-preview--xxxx.lovable.app).
## 🧑‍💻 Example Flow

- Register as a user

- Add a farmer (Name: Ramesh, Crop: Wheat, Location: Bihar)

- Record is saved in Supabase → linked to your user ID

- Dashboard shows only your farmers

## 📌 Roadmap (Future Enhancements)

🌍 Offline-first mobile app (voice + photo submissions)

🛰️ Satellite data fusion (Sentinel/ISRO APIs)

⛅ Low-cost IoT sensors at cluster level

🔗 Blockchain ledger for tamper-proof MRV logs

📈 Analytics Dashboard with climate-smart indicators

## 🤝 Team

Hackathon project by [GreenByte]

## Built for NABARD Hackathon → GFF 2025

## ✨ With AgriMRV-Lite, we show that even a simple, low-cost system can pave the way for climate-smart, inclusive agriculture monitoring.
Postgres Database (farmer records)

Row-Level Security (RLS) – each user only sees their own data
## 🤝 Contributing

Fork → Create feature branch

Make changes in Lovable UI or code sections

Keep code TypeScript-strict and RLS-safe

Open PR with screenshots / Loom of the flow

## 📜 License

MIT © 2025 AgriMRV-Lite Team
