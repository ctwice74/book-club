# Book Club

A full-stack Book Club management app built with Next.js, React, and Postgres.

## Features

- Book list management with reading status
- Meeting scheduling
- Book proposals and discussion notes
- Next.js API routes backed by Prisma + Postgres

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and fill in values:

   ```bash
   cp .env.example .env
   ```

3. Run Prisma migrations:

   ```bash
   npm run prisma:migrate
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

## Database

The Postgres schema is managed with Prisma in `prisma/schema.prisma`.

## API Endpoints

- `GET /api/books`, `POST /api/books`
- `PATCH /api/books/:id`, `DELETE /api/books/:id`
- `GET /api/meetings`, `POST /api/meetings`
- `PATCH /api/meetings/:id`, `DELETE /api/meetings/:id`
- `GET /api/proposals`, `POST /api/proposals`
- `DELETE /api/proposals/:id`
- `GET /api/discussions`, `POST /api/discussions`
- `DELETE /api/discussions/:id`
