# Webhook Receiver + Event Processing API

A backend-focused API project for receiving webhook events, validating incoming payloads, storing event records, and exposing structured endpoints for reviewing event activity.

This project is designed as a portfolio-ready backend system that demonstrates API design, request handling, validation, database persistence, documentation, and security-aware development practices.

## Project Purpose

Modern applications often rely on webhooks to send event notifications between services. This project simulates a production-style webhook receiver that can accept incoming events, process them safely, and make the stored event data available through clean API endpoints.

The goal is to build a compact but professional backend API that demonstrates real-world development patterns without becoming unnecessarily bloated.

## Core Features

Planned and/or implemented features include:

- Webhook event receiver endpoint
- Request payload validation
- Event type classification
- SQLite database persistence
- Event history retrieval
- Event detail lookup
- Event summary endpoint
- Basic API health check
- Environment variable configuration
- Structured documentation
- Security-conscious request handling

## Tech Stack

| Area | Technology |
| --- | --- |
| Runtime | Node.js |
| Framework | NestJS |
| Language | TypeScript |
| Database | SQLite |
| ORM | Prisma |
| Testing | Jest |
| Documentation | Markdown |
| Version Control | Git + GitHub |

## Planned API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/` | Basic root response |
| GET | `/health` | API health check |
| POST | `/webhooks/events` | Receive webhook event payloads |
| GET | `/events` | List stored events |
| GET | `/events/:id` | Retrieve a single event |
| GET | `/events/summary` | View event count summaries |

Endpoint names may change as the project evolves.

## Documentation

Project documentation lives in the [`docs`](docs/) folder.

Current documentation:

- [Documentation Index](docs/README.md)

Planned documentation:

- API endpoint reference
- Database schema notes
- Environment variable guide
- Testing notes
- Project status tracker
- Development workflow notes

## Project Status

Current phase:

```text
Foundation setup and starter documentation
```

Completed setup items:

- Repository created
- Git initialized
- `.gitignore` added
- License added
- Starter README created
- Documentation folder started

## Portfolio Value

This project is intended to demonstrate:

- Backend API structure
- Clean project organization
- Request/response handling
- Database-backed event storage
- Security-aware backend thinking
- Professional documentation habits
- Testable service/controller design

## Development Notes

This project is being built in small, documented sessions. Each session focuses on one clear improvement so the repository remains clean, understandable, and easy to review.

## License

This project is licensed under the terms included in the repository license file.n

