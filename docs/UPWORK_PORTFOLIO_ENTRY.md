# Upwork Portfolio Entry

## Project Title

Webhook Receiver + Event Processing API

## Overview

A backend API built with NestJS, TypeScript, Prisma, and SQLite for receiving, validating, storing, and reviewing webhook-style event records.

The project demonstrates REST API design, database persistence, event processing workflows, filtering, standardized error responses, test coverage, and clean technical documentation.

This sample was created to show how a compact backend service can be structured, documented, tested, and prepared for a professional GitHub portfolio.

## Problem

Many applications need to receive webhook events from external services such as payment platforms, automation tools, or internal systems. Without a structured receiver, those events can be hard to validate, store, review, or troubleshoot.

This project solves that problem by providing a small backend API that can accept webhook-style events, save them to a database, and expose routes for reviewing and managing event records.

## Solution

I built a REST API that accepts incoming event records, validates the request payload, stores events in a SQLite database through Prisma, and exposes endpoints for listing, filtering, reviewing, updating, and deleting events.

The project also includes standardized error responses, API documentation, setup instructions, and verification notes so another developer can understand and run the project locally.

## Tech Stack

- NestJS
- TypeScript
- Node.js
- Prisma
- SQLite
- REST API
- Jest
- Markdown documentation

## Key Features

- REST API built with NestJS and TypeScript
- Prisma ORM configured with SQLite
- Webhook-style event creation endpoint
- Event listing endpoint
- Event detail lookup endpoint
- Event processed status update endpoint
- Event delete endpoint
- Event filtering by source, event type, and processed status
- Standardized error response format
- API reference documentation
- README with local setup instructions
- Test and verification checkpoint documentation

## My Role

I designed, built, documented, and tested the backend API. My work included setting up the NestJS project structure, configuring Prisma with SQLite, creating the event model, implementing API routes, adding validation, standardizing error responses, and writing project documentation.

## Results

- Built a working backend API for webhook-style event handling
- Added persistent event storage with Prisma and SQLite
- Created documented REST endpoints for event review and management
- Added clear README and API reference documentation
- Verified the project with local testing and server startup checks
- Prepared the repository as a professional backend portfolio sample

## Suggested Upwork Portfolio Summary

Webhook Receiver + Event Processing API

A backend API built with NestJS, TypeScript, Prisma, and SQLite for receiving, validating, storing, and reviewing webhook-style event records.

This project demonstrates REST API design, database persistence, event processing workflows, filtering, standardized error responses, test coverage, and clean technical documentation.

Key deliverables included backend route development, Prisma database setup, API documentation, README cleanup, error response standardization, and local verification.