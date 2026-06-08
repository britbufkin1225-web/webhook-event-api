# API Reference

Detailed API reference for the Webhook Receiver + Event Processing API.

This document describes the available API endpoints, request formats, response shapes, filtering options, and standard error response format.

---

## Base URL

```text
http://localhost:3000/api/v1
```

Unless otherwise noted, endpoint paths in this document are shown relative to the base API version:

```text
/api/v1
```

The root application health route is available at:

```text
http://localhost:3000/
```

---

## Response Format

API responses return JSON.

Timestamps are returned as ISO 8601 date strings.

Example timestamp:

```json
"2026-06-08T00:00:00.000Z"
```

---

## Error Response Format

Validation and HTTP errors use a consistent response shape.

```json
{
  "statusCode": 400,
  "timestamp": "2026-06-08T00:00:00.000Z",
  "path": "/events",
  "method": "POST",
  "message": "Validation failed",
  "error": "BadRequest"
}
```

### Error Response Fields

| Field        | Type                 | Description                                     |
| ------------ | -------------------- | ----------------------------------------------- |
| `statusCode` | `number`             | HTTP status code returned by the API.           |
| `timestamp`  | `string`             | ISO 8601 timestamp for when the error occurred. |
| `path`       | `string`             | Request path that caused the error.             |
| `method`     | `string`             | HTTP method used for the request.               |
| `message`    | `string \| string[]` | Error message or validation messages.           |
| `error`      | `string`             | Short error name.                               |

---

## Health Checks

### `GET /`

Returns a basic application root response.

This route is available outside the base API version.

### Root Example Response

```text
Webhook Receiver API is running
```

---

### `GET /health`

Returns a basic API health check response.

### API Health Example Response

```json
{
  "status": "ok"
}
```

---

## Events

Event records represent webhook-style payloads received by the API.

---

## Create Event

### `POST /events`

Creates a new event record.

### Create Event Request Body

```json
{
  "source": "stripe",
  "eventType": "payment.created",
  "payload": "{\"amount\":1000}"
}
```

### Create Event Request Fields

| Field       | Type     | Required | Description                                    |
| ----------- | -------- | :------: | ---------------------------------------------- |
| `source`    | `string` |    Yes   | Source system or provider that sent the event. |
| `eventType` | `string` |    Yes   | Type/name of the event.                        |
| `payload`   | `string` |    Yes   | Raw event payload stored as a string.          |

### Create Event Example Response

```json
{
  "id": "event-id",
  "source": "stripe",
  "eventType": "payment.created",
  "payload": "{\"amount\":1000}",
  "processed": false,
  "receivedAt": "2026-06-08T00:00:00.000Z",
  "processedAt": null,
  "createdAt": "2026-06-08T00:00:00.000Z",
  "updatedAt": "2026-06-08T00:00:00.000Z"
}
```

---

## List Events

### `GET /events`

Returns a list of event records.

### List Events Optional Query Parameters

| Parameter   | Type     | Example           | Description                         |
| ----------- | -------- | ----------------- | ----------------------------------- |
| `source`    | `string` | `stripe`          | Filters events by source.           |
| `eventType` | `string` | `payment.created` | Filters events by event type.       |
| `processed` | `string` | `true` or `false` | Filters events by processed status. |

### List Events Example Requests

```text
GET /events
GET /events?source=stripe
GET /events?eventType=payment.created
GET /events?processed=false
GET /events?source=stripe&processed=true
```

### List Events Example Response

```json
[
  {
    "id": "event-id",
    "source": "stripe",
    "eventType": "payment.created",
    "payload": "{\"amount\":1000}",
    "processed": false,
    "receivedAt": "2026-06-08T00:00:00.000Z",
    "processedAt": null,
    "createdAt": "2026-06-08T00:00:00.000Z",
    "updatedAt": "2026-06-08T00:00:00.000Z"
  }
]
```

---

## Event Summary

### `GET /events/summary`

Returns aggregate event statistics.

### Event Summary Example Request

```text
GET /events/summary
```

### Event Summary Example Response

```json
{
  "totalEvents": 2,
  "processedEvents": 1,
  "unprocessedEvents": 1,
  "eventsBySource": {
    "stripe": 2
  },
  "eventsByType": {
    "payment.created": 2
  }
}
```

---

## Get Event by ID

### `GET /events/:id`

Returns a single event record by ID.

### Get Event by ID Path Parameters

| Parameter | Type     | Required | Description      |
| --------- | -------- | :------: | ---------------- |
| `id`      | `string` |    Yes   | Unique event ID. |

### Get Event by ID Example Request

```text
GET /events/event-id
```

### Get Event by ID Example Response

```json
{
  "id": "event-id",
  "source": "stripe",
  "eventType": "payment.created",
  "payload": "{\"amount\":1000}",
  "processed": false,
  "receivedAt": "2026-06-08T00:00:00.000Z",
  "processedAt": null,
  "createdAt": "2026-06-08T00:00:00.000Z",
  "updatedAt": "2026-06-08T00:00:00.000Z"
}
```

### Get Event by ID Not Found Response

```json
{
  "statusCode": 404,
  "timestamp": "2026-06-08T00:00:00.000Z",
  "path": "/events/event-id",
  "method": "GET",
  "message": "Event with ID event-id not found",
  "error": "NotFound"
}
```

---

## Mark Event as Processed

### `PATCH /events/:id/processed`

Marks an event as processed.

### Mark Event as Processed Path Parameters

| Parameter | Type     | Required | Description      |
| --------- | -------- | :------: | ---------------- |
| `id`      | `string` |    Yes   | Unique event ID. |

### Mark Event as Processed Example Request

```text
PATCH /events/event-id/processed
```

### Mark Event as Processed Example Response

```json
{
  "id": "event-id",
  "source": "stripe",
  "eventType": "payment.created",
  "payload": "{\"amount\":1000}",
  "processed": true,
  "receivedAt": "2026-06-08T00:00:00.000Z",
  "processedAt": "2026-06-08T00:00:00.000Z",
  "createdAt": "2026-06-08T00:00:00.000Z",
  "updatedAt": "2026-06-08T00:00:00.000Z"
}
```

### Mark Event as Processed Not Found Response

```json
{
  "statusCode": 404,
  "timestamp": "2026-06-08T00:00:00.000Z",
  "path": "/events/event-id/processed",
  "method": "PATCH",
  "message": "Event with ID event-id not found",
  "error": "NotFound"
}
```

---

## Delete Event

### `DELETE /events/:id`

Deletes an existing event record by ID.

### Delete Event Path Parameters

| Parameter | Type     | Required | Description      |
| --------- | -------- | :------: | ---------------- |
| `id`      | `string` |    Yes   | Unique event ID. |

### Delete Event Example Request

```text
DELETE /events/event-id
```

### Delete Event Example Response

```json
{
  "id": "event-id",
  "source": "stripe",
  "eventType": "payment.created",
  "payload": "{\"amount\":1000}",
  "processed": false,
  "receivedAt": "2026-06-08T00:00:00.000Z",
  "processedAt": null,
  "createdAt": "2026-06-08T00:00:00.000Z",
  "updatedAt": "2026-06-08T00:00:00.000Z"
}
```

### Delete Event Not Found Response

```json
{
  "statusCode": 404,
  "timestamp": "2026-06-08T00:00:00.000Z",
  "path": "/events/event-id",
  "method": "DELETE",
  "message": "Event with ID event-id not found",
  "error": "NotFound"
}
```

---

## Event Object

| Field         | Type             | Description                                       |
| ------------- | ---------------- | ------------------------------------------------- |
| `id`          | `string`         | Unique event ID.                                  |
| `source`      | `string`         | Source system or provider that sent the event.    |
| `eventType`   | `string`         | Type/name of the event.                           |
| `payload`     | `string`         | Raw event payload stored as a string.             |
| `processed`   | `boolean`        | Whether the event has been processed.             |
| `receivedAt`  | `string`         | Timestamp when the event was received.            |
| `processedAt` | `string \| null` | Timestamp when the event was marked as processed. |
| `createdAt`   | `string`         | Timestamp when the record was created.            |
| `updatedAt`   | `string`         | Timestamp when the record was last updated.       |

---

## Current Endpoint Summary

| Method   | Endpoint                | Description                           |
| -------- | ----------------------- | ------------------------------------- |
| `GET`    | `/`                     | Basic application root response.      |
| `POST`   | `/events`               | Creates a new event.                  |
| `GET`    | `/events`               | Lists events with optional filtering. |
| `GET`    | `/events/summary`       | Returns event summary statistics.     |
| `GET`    | `/events/:id`           | Returns a single event by ID.         |
| `PATCH`  | `/events/:id/processed` | Marks an event as processed.          |
| `DELETE` | `/events/:id`           | Deletes an event by ID.               |

---

## Current CRUD Coverage

The API currently supports create, read, filtered read, single-record lookup, processed-status update, summary workflows, and single-record deletion.

The event resource now has complete basic CRUD coverage:

| CRUD Operation | Endpoint                      | Status        |
| -------------- | ----------------------------- | ------------- |
| Create         | `POST /events`                | `Implemented` |
| Read many      | `GET /events`                 | `Implemented` |
| Read one       | `GET /events/:id`             | `Implemented` |
| Update         | `PATCH /events/:id/processed` | `Implemented` |
| Delete         | `DELETE /events/:id`          | `Implemented` |
