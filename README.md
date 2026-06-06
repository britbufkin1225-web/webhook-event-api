# Webhook Receiver + Event Processing API

A NestJS backend API for receiving, validating, storing, and reviewing webhook-style event records using Prisma and SQLite.

This project is designed as a portfolio-ready backend system that demonstrates API design, request handling, validation, database persistence, documentation, testing, and security-aware development practices.

## Project Purpose

Modern applications often rely on webhooks to send event notifications between services. This project simulates a production-style webhook receiver that can accept incoming event data, validate request payloads, store event records, and expose API endpoints for reviewing event activity.

The goal is to build a compact but professional backend API that demonstrates real-world backend development patterns without unnecessary complexity.

## Project Status

Current status: **Active development**

### Completed Foundation Work

- NestJS application initialized
- Prisma configured
- SQLite database foundation added
- Environment variables documented
- Event model added to Prisma schema
- Geofence model restored to Prisma schema
- Events module foundation created
- Event creation endpoint added
- Event list endpoint added
- Event detail lookup endpoint added
- Basic validation and error handling added
- Controller and service test coverage expanded
- Basic testing workflow established
- Repository documentation started

### Current Focus

- Expanding controller and service test coverage
- Improving event response consistency
- Refining validation and error handling
- Keeping documentation aligned with implemented features
- Preparing the project for cleaner portfolio presentation

### Planned Work

- Event processed/unprocessed status updates
- Event summary endpoint
- API endpoint reference documentation
- Additional test coverage
- Request/security hardening improvements

## Core Features

### Implemented

- Basic API root response
- API health check
- Webhook-style event creation
- Request payload validation
- SQLite database persistence
- Event history retrieval
- Event detail lookup
- Not-found handling for missing events
- Geofence CRUD support
- Environment variable configuration
- Structured project documentation
- Jest-based testing workflow
- Events controller test coverage
- Events service test coverage

### Planned

- Event type classification
- Event summary endpoint
- Processed/unprocessed event tracking
- Security-conscious request handling improvements
- Expanded API documentation
- Expanded testing documentation

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

## API Endpoints

### Application Endpoints

| Method | Endpoint | Purpose | Status |
| --- | --- | --- | --- |
| GET | `/` | Basic root response | Implemented |
| GET | `/health` | API health check | Implemented |

### Event Endpoints

| Method | Endpoint | Purpose | Status |
| --- | --- | --- | --- |
| POST | `/events` | Receive and store event payloads | Implemented |
| GET | `/events` | List stored events | Implemented |
| GET | `/events/:id` | Retrieve a single event | Implemented |
| PATCH | `/events/:id/process` | Mark an event as processed | Planned |
| GET | `/events/summary` | View event count summaries | Planned |

### Geofence Endpoints

| Method | Endpoint | Purpose | Status |
| --- | --- | --- | --- |
| POST | `/geofences` | Create a geofence | Implemented |
| GET | `/geofences` | List geofences | Implemented |
| GET | `/geofences/:id` | Retrieve a single geofence | Implemented |
| PATCH | `/geofences/:id` | Update a geofence | Implemented |
| DELETE | `/geofences/:id` | Delete a geofence | Implemented |

Endpoint names and behavior may evolve as the project is refined.

## Database Models

Current Prisma models include:

- `Event`
- `Geofence`

### Event

The `Event` model stores incoming webhook-style records and tracks basic event metadata.

Current event fields include:

- `id`
- `source`
- `eventType`
- `payload`
- `processed`
- `receivedAt`
- `processedAt`
- `createdAt`
- `updatedAt`

### Geofence

The `Geofence` model supports location-based records with coordinates, radius, active status, and timestamps.

Current geofence fields include:

- `id`
- `name`
- `description`
- `latitude`
- `longitude`
- `radius`
- `isActive`
- `createdAt`
- `updatedAt`

## Testing Status

Current test status:

- Test suites: 3 passed / 3 total
- Tests: 11 passed / 11 total

Current tested areas:

- App controller default behavior
- Events controller response handling
- Events service creation behavior
- Events service list retrieval behavior
- Events service single-record lookup behavior
- Events not-found error handling

Recent Events coverage includes:

- Creating an event through the controller
- Returning all events with response metadata
- Returning a single event by ID
- Creating an event through the service
- Fetching events ordered by `receivedAt` descending
- Throwing `NotFoundException` when an event ID does not exist

## Repository Structure

```text
webhook-event-api/
├── docs/           # Project documentation
├── generated/      # Generated Prisma client output
├── prisma/         # Prisma schema and migrations
├── src/            # NestJS application source code
├── test/           # Test files
├── .env.example    # Example environment variables
├── README.md       # Project overview
└── package.json    # Project scripts and dependencies
```

## Documentation

Project documentation lives in the [`docs`](docs/) folder.

Current documentation includes:

- [Documentation Index](docs/README.md)
- [Environment Variables](docs/environment-variables.md)
- [Project Overview](docs/project-overview.md)
- [Session 7.5 — Documentation and Repository Polish](docs/session-7-5-repo-polish.md)

Planned documentation includes:

- API endpoint reference
- Database schema notes
- Expanded testing notes
- Development workflow notes

## Portfolio Value

This project is intended to demonstrate:

- Backend API structure
- Modular NestJS architecture
- Request and response handling
- Database-backed event storage
- Prisma ORM usage
- SQLite persistence
- Environment configuration
- DTO-based validation
- Error handling patterns
- CRUD endpoint design
- Testable service and controller design
- Professional documentation habits
- Security-aware backend thinking

## Development Notes

This project is being built in small, documented sessions. Each session focuses on one clear improvement so the repository remains clean, understandable, and easy to review.

Private local workflow notes and shorthand references are intentionally excluded from version control.

## License

This project is licensed under the terms included in the repository license file.