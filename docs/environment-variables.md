# Environment Variables

This document explains the environment variables used by the GeoFence Alert API.

Environment variables keep configuration separate from application code. This makes the project easier to run locally, test safely, and prepare for deployment later.

---

## Required Variables

| Variable | Required | Example | Description |
|---|---:|---|---|
| `DATABASE_URL` | Yes | `file:./dev.db` | SQLite database connection string used by Prisma. |

---

## Optional Variables

| Variable | Required | Example | Description |
|---|---:|---|---|
| `PORT` | No | `3000` | Port the API server runs on. |
| `NODE_ENV` | No | `development` | Defines the runtime environment. Common values are `development`, `test`, and `production`. |

---

## Local Development `.env`

Create a `.env` file in the project root.

Example:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
NODE_ENV=development
```

---

## Prisma SQLite Configuration

This project uses Prisma with SQLite for local development.

The SQLite database URL should look like this:

```env
DATABASE_URL="file:./dev.db"
```

This tells Prisma to use a local SQLite database file named:

```text
dev.db
```

---

## `.env.example`

The project should include a safe example environment file:

```text
.env.example
```

Recommended content:

```env
DATABASE_URL="file:./dev.db"
PORT=3000
NODE_ENV=development
```

The `.env.example` file is safe to commit because it does not contain real secrets.

---

## Git Safety

The real `.env` file should not be committed.

Make sure this line exists in `.gitignore`:

```gitignore
.env
```

Commit this:

```text
.env.example
docs/environment-variables.md
```

Do not commit this:

```text
.env
```

---

## Notes

- `DATABASE_URL` is required by Prisma.
- `PORT` is optional unless the application explicitly depends on it.
- `NODE_ENV` helps separate local development, testing, and production behavior.
- Future secrets such as API keys, webhook secrets, or production database URLs should be stored in `.env`, not directly in source code or documentation.

---

## Session Completion Checklist

- [ ] Created `docs/environment-variables.md`
- [ ] Documented `DATABASE_URL`
- [ ] Documented optional `PORT`
- [ ] Documented optional `NODE_ENV`
- [ ] Added local `.env` example
- [ ] Added `.env.example` recommendation
- [ ] Confirmed `.env` is ignored by Git