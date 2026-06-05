# Webhook Receiver + Event Processing API — Project Blueprint

## Project Overview

The Webhook Receiver + Event Processing API is a backend portfolio project designed to receive, validate, store, process, and expose webhook-style event data through a structured REST API.

The project demonstrates backend development skills beyond standard CRUD operations by focusing on event-driven API design, webhook ingestion, request validation, event status tracking, persistence, and backend observability.

## Project Goals

- Build a clean backend API for receiving webhook events.
- Store incoming event payloads in a database.
- Track event processing status.
- Provide API endpoints for reviewing received events.
- Add filtering and summary endpoints.
- Add basic webhook security.
- Document the project clearly for portfolio and GitHub presentation.
- Add test coverage for core success and error paths.

## Core Backend Skills Demonstrated

| Skill Area | Demonstrated By |
|---|---|
| API Design | REST endpoints for receiving and querying webhook events |
| Event Handling | Processing incoming webhook-style payloads |
| Validation | DTO validation for required event fields |
| Persistence | Prisma-backed database storage |
| Security | Webhook secret/API-key validation |
| Testing | Unit and controller test coverage |
| Documentation | Project blueprint, API docs, schema docs, and setup docs |
| Observability | Event status, summaries, timestamps, and error tracking |

## MVP Scope

The MVP version of this project will include:

- NestJS backend application
- Prisma ORM
- SQLite database for local development
- Webhook event model
- Event creation endpoint
- Event listing endpoint
- Single event lookup endpoint
- Event summary endpoint
- Basic request validation
- Basic webhook secret validation
- Documentation files
- Initial test coverage

## Out of Scope for MVP

The following features are intentionally excluded from the first version:

- Real third-party webhook provider integration
- Background queue workers
- Redis
- Message brokers
- User authentication
- Frontend dashboard
- Cloud deployment
- Real-time WebSocket updates

These may be considered later as stretch goals.

## Planned API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Check API health |
| POST | `/webhooks/events` | Receive a webhook event |
| GET | `/events` | List stored events |
| GET | `/events/:id` | Get one event by ID |
| GET | `/events/summary` | Get event totals and status summary |

## Event Lifecycle

A webhook event will move through the following lifecycle:

1. Event is received by the API.
2. Request body is validated.
3. Webhook secret is checked.
4. Event is saved to the database with `received` status.
5. Event processing logic runs.
6. Event status is updated to `processed` or `failed`.
7. Event can be queried through the API.

## Event Status Values

| Status | Meaning |
|---|---|
| `received` | Event was accepted and stored |
| `processed` | Event was processed successfully |
| `failed` | Event processing failed |

## Example Webhook Payload

```json
{
  "source": "github",
  "eventType": "push",
  "payload": {
    "branch": "main",
    "commits": 3,
    "repository": "webhook-event-api"
  }
}

## Example Webhook Response

```json
{
  "id": "event-id-here",
  "source": "github",
  "eventType": "push",
  "status": "processed",
  "message": "Webhook event received and processed successfully."
}
```

## Suggested Stretch Goals

After the MVP is complete, possible upgrades include:

- HMAC signature validation
- Retry tracking
- Failed event replay endpoint
- Event priority levels
- Event tags
- Processing logs
- Docker support
- PostgreSQL support
- GitHub webhook compatibility mode
- Deployment to Render, Railway, or Fly.io
- Minimal dashboard for event monitoring

## Portfolio Value

This project is designed to show that the developer can build a backend system that handles external event input, validates requests, persists data, separates receiving from processing, and exposes useful operational endpoints.

It is intentionally small enough to complete quickly while still demonstrating real backend engineering patterns used in production systems.