# API Reference

Detailed API reference for the Webhook Receiver + Event Processing API.

This document describes the available API endpoints, request formats, response shapes, filtering options, and standard error response format.

---

## Base URL

```text
http://localhost:3000
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

### Error Fields

| Field        |              Type | Description                                     |
| ------------ | ----------------: | ----------------------------------------------- |
| `statusCode` |            number | HTTP status code returned by the API.           |
| `timestamp`  |            string | ISO 8601 timestamp for when the error occurred. |
| `path`       |            string | Request path that caused the error.             |
| `method`     |            string | HTTP method used for the request.               |
| `message`    | string | string[] | Error message or validation messages.           |
| `error`      |            string | Short error name.                               |

---

## Health Check

### `GET /`

Returns a basic application health message.

### Example Response

```json
{
  "message": "Webhook Receiver API is running"
}
```

---

## Events

Event records represent webhook-style payloads received by the API.

---

## Create Event

### `POST /events`

Creates a new event record.

### Request Body

```json
{
  "source": "stripe",
  "eventType": "payment.created",
  "payload": "{\"amount\":1000}"
}
```

### Request Fields

| Field       |   Type | Required | Description                                    |
| ----------- | -----: | :------: | ---------------------------------------------- |
| `source`    | string |    Yes   | Source system or provider that sent the event. |
| `eventType` | string |    Yes   | Type/name of the event.                        |
| `payload`   | string |    Yes   | Raw event payload stored as a string.          |

### Example Response

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

### Optional Query Parameters

| Parameter   |   Type | Example           | Description                         |
| ----------- | -----: | ----------------- | ----------------------------------- |
| `source`    | string | `stripe`          | Filters events by source.           |
| `eventType` | string | `payment.created` | Filters events by event type.       |
| `processed` | string | `true` or `false` | Filters events by processed status. |

### Example Requests

```text
GET /events
GET /events?source=stripe
GET /events?eventType=payment.created
GET /events?processed=false
GET /events?source=stripe&processed=true
```

### Example Response

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

## Get Event by ID

### `GET /events/:id`

Returns a single event record by ID.

### Path Parameters

| Parameter |   Type | Required | Description      |
| --------- | -----: | :------: | ---------------- |
| `id`      | string |    Yes   | Unique event ID. |

### Example Request

```text
GET /events/event-id
```

### Example Response

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

### Not Found Response

```json
{
  "statusCode": 404,
  "timestamp": "2026-06-08T00:00:00.000Z",
  "path": "/events/event-id",
  "method": "GET",
  "message": "Event not found",
  "error": "NotFound"
}
```

---

## Mark Event as Processed

### `PATCH /events/:id/processed`

Marks an event as processed.

### Path Parameters

| Parameter |   Type | Required | Description      |
| --------- | -----: | :------: | ---------------- |
| `id`      | string |    Yes   | Unique event ID. |

### Example Request

```text
PATCH /events/event-id/processed
```

### Example Response

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

---

## Event Summary

### `GET /events/summary`

Returns aggregate event statistics.

### Example Request

```text
GET /events/summary
```

### Example Response

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

## Event Object

| Field         |          Type | Description                                       |
| ------------- | ------------: | ------------------------------------------------- |
| `id`          |        string | Unique event ID.                                  |
| `source`      |        string | Source system or provider that sent the event.    |
| `eventType`   |        string | Type/name of the event.                           |
| `payload`     |        string | Raw event payload stored as a string.             |
| `processed`   |       boolean | Whether the event has been processed.             |
| `receivedAt`  |        string | Timestamp when the event was received.            |
| `processedAt` | `string | null` | Timestamp when the event was marked as processed. |
| `createdAt`   |        string | Timestamp when the record was created.            |
| `updatedAt`   |        string | Timestamp when the record was last updated.       |

---

## Current Endpoint Summary

| Method  | Endpoint                | Description                       |
| ------- | ----------------------- | --------------------------------- |
| `GET`   | `/`                     | Basic application health check.   |
| `POST`  | `/events`               | Creates a new event.              |
| `GET`   | `/events`               | Lists events.                     |
| `GET`   | `/events/summary`       | Returns event summary statistics. |
| `GET`   | `/events/:id`           | Returns a single event by ID.     |
| `PATCH` | `/events/:id/processed` | Marks an event as processed.      |
