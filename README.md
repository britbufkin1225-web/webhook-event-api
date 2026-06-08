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
- Event processed status update endpoint added
- Event filtering by `source`, `eventType`, and `processed` added
- Event summary endpoint added
- Event summary aggregation added for total, processed, and unprocessed events
- Event summary grouping added by source and event type
- Event summary controller test coverage added
- Event summary service test coverage added
- Event filtering, processing, and summary workflows tested
- Standard event API response shape added
- Standard API error response shape added
- Basic validation and error handling added
- Controller and service test coverage expanded
- Basic testing workflow established
- Repository documentation actively maintained

### Current Focus

- Keeping documentation aligned with implemented features
- Improving event response consistency
- Refining validation and error handling
- Expanding controller and service test coverage
- Preparing the project for cleaner portfolio presentation

### Planned Work

- Dedicated API endpoint reference documentation
- Additional test coverage
- Request and security hardening improvements

## Core Features

### Implemented

- Basic API root response
- API health check
- Webhook-style event creation
- Request payload validation
- SQLite database persistence
- Event history retrieval
- Event filtering by query parameters
- Event detail lookup
- Event processed/unprocessed status tracking
- Event summary reporting
- Event summary aggregation by processing status, source, and event type
- Standardized event API response structure
- Standardized API error response structure
- Not-found handling for missing events
- Bad-request handling for invalid query filters
- Geofence CRUD support
- Environment variable configuration
- Structured project documentation
- Jest-based testing workflow
- Events controller test coverage
- Events service test coverage

### Planned

- Event type classification
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
| GET | `/events` | List stored events with optional filtering | Implemented |
| GET | `/events/:id` | Retrieve a single event | Implemented |
| PATCH | `/events/:id/processed` | Mark an event as processed | Implemented |
| GET | `/events/summary` | View event count summaries grouped by processing status, source, and event type | Implemented |

### Standard Event API Response Shape

Event endpoints return a consistent response object containing a success flag, message, and data payload.

Standard success response format:

```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": {}
}
```

Create event response example:

```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "id": "event-test-id",
    "source": "stripe",
    "eventType": "payment.created",
    "payload": "{\"amount\":1000}",
    "processed": false,
    "receivedAt": "2026-06-07T18:04:49.152Z",
    "processedAt": null,
    "createdAt": "2026-06-07T18:04:49.152Z",
    "updatedAt": "2026-06-07T18:04:49.152Z"
  }
}
```

List events response example:

```json
{
  "success": true,
  "message": "Events retrieved successfully",
  "data": [
    {
      "id": "event-test-id",
      "source": "stripe",
      "eventType": "payment.created",
      "payload": "{\"amount\":1000}",
      "processed": false,
      "receivedAt": "2026-06-07T18:04:49.152Z",
      "processedAt": null,
      "createdAt": "2026-06-07T18:04:49.152Z",
      "updatedAt": "2026-06-07T18:04:49.152Z"
    }
  ]
}
```

Single event response example:

```json
{
  "success": true,
  "message": "Event retrieved successfully",
  "data": {
    "id": "event-test-id",
    "source": "stripe",
    "eventType": "payment.created",
    "payload": "{\"amount\":1000}",
    "processed": false,
    "receivedAt": "2026-06-07T18:04:49.152Z",
    "processedAt": null,
    "createdAt": "2026-06-07T18:04:49.152Z",
    "updatedAt": "2026-06-07T18:04:49.152Z"
  }
}
```

Processed event response example:

```json
{
  "success": true,
  "message": "Event marked as processed successfully",
  "data": {
    "id": "event-test-id",
    "source": "stripe",
    "eventType": "payment.created",
    "payload": "{\"amount\":1000}",
    "processed": true,
    "receivedAt": "2026-06-07T18:04:49.152Z",
    "processedAt": "2026-06-07T18:10:12.221Z",
    "createdAt": "2026-06-07T18:04:49.152Z",
    "updatedAt": "2026-06-07T18:10:12.221Z"
  }
}
```

## Error Responses

The API uses a consistent error response shape for failed requests.

Example `404 Not Found` response:

```json
{
  "success": false,
  "message": "Event not found",
  "error": "Not Found",
  "statusCode": 404
}
```

Example `400 Bad Request` response:

```json
{
  "success": false,
  "message": "Invalid processed filter. Use true or false.",
  "error": "Bad Request",
  "statusCode": 400
}
```

### Error Response Fields

| Field | Type | Description |
| --- | --- | --- |
| `success` | boolean | Always `false` for failed requests |
| `message` | string or array | Human-readable error message |
| `error` | string | Short HTTP error label |
| `statusCode` | number | HTTP status code |

### Event Filtering

The event list endpoint supports optional query parameters for filtering stored webhook events.

Endpoint:

`GET /events`

Supported query parameters:

| Query Parameter | Type | Description | Example |
| --- | --- | --- | --- |
| `source` | `string` | Filters events by source system or service. | `stripe` |
| `eventType` | `string` | Filters events by event type. | `payment.created` |
| `processed` | `boolean-like string` | Filters events by processing status. Supported values are `true` and `false`. | `true` |

Example requests:

| Request | Purpose |
| --- | --- |
| `GET /events` | Retrieve all events |
| `GET /events?source=stripe` | Retrieve events from a specific source |
| `GET /events?eventType=payment.created` | Retrieve events by event type |
| `GET /events?processed=true` | Retrieve processed events |
| `GET /events?processed=false` | Retrieve unprocessed events |
| `GET /events?source=stripe&eventType=payment.created&processed=false` | Combine multiple filters |

Filtering is optional. If no query parameters are provided, the endpoint returns all stored events ordered by most recently received first.

Invalid `processed` query values are rejected. The only supported values are `true` and `false`.

### Event Summary

The event summary endpoint returns aggregate statistics for stored webhook events.

Endpoint:

`GET /events/summary`

Returned summary data includes:

| Field | Description |
| --- | --- |
| `totalEvents` | Total number of stored events |
| `processedEvents` | Number of events marked as processed |
| `unprocessedEvents` | Number of events not yet processed |
| `sources` | Event counts grouped by source |
| `eventTypes` | Event counts grouped by event type |

Example response:

```json
{
  "success": true,
  "message": "Event summary retrieved successfully",
  "data": {
    "totalEvents": 2,
    "processedEvents": 1,
    "unprocessedEvents": 1,
    "sources": {
      "stripe": 2
    },
    "eventTypes": {
      "payment.created": 2
    }
  }
}
```

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
- Tests: 16 passed / 16 total

Current tested areas:

- App controller default behavior
- Events controller response handling
- Events controller response metadata
- Events controller query validation
- Events service creation behavior
- Events service list retrieval behavior
- Events service filtering behavior
- Events service single-record lookup behavior
- Events processed status update behavior
- Events not-found error handling
- Event summary aggregation behavior

Recent Events coverage includes:

- Creating an event through the controller
- Returning all events with response metadata
- Returning filtered events with response metadata
- Rejecting invalid `processed` query values
- Returning a single event by ID with response metadata
- Marking an event as processed through the controller
- Creating an event through the service
- Fetching events ordered by `receivedAt` descending
- Filtering events by `source`
- Filtering events by `eventType`
- Filtering events by `processed`
- Marking an event as processed through the service
- Setting the `processedAt` timestamp when an event is processed
- Throwing `NotFoundException` when an event ID does not exist
- Returning event summary totals
- Returning processed and unprocessed event counts
- Returning event counts grouped by source and event type

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
- README API endpoint reference
- README success response shape documentation
- README error response shape documentation
- README event filtering documentation
- README event summary documentation

Planned documentation includes:

- Dedicated API endpoint reference
- Database schema notes
- Expanded testing notes
- Development workflow notes

## Portfolio Value

This project is intended to demonstrate:

- Backend API structure
- Modular NestJS architecture
- Request and response handling
- Consistent API response design
- Consistent API error response design
- Database-backed event storage
- Prisma ORM usage
- SQLite persistence
- Environment configuration
- DTO-based validation
- Query parameter filtering
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