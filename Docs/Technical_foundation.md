# Technical Foundation

## Purpose
This document is the mandatory baseline for every task. Its goal is to keep the project consistent, maintainable, scalable, and easy to evolve.

## Technical Baseline
- Web application
- Frontend: React with Vite
- Backend: C# with ASP.NET Core
- Database: SQL Server
- Cloud hosting
- Database changes: migrations only
- Persistence: explicit mapping for all entities and tables
- Transaction control: Unit of Work is mandatory
- UI languages: Portuguese and English
- Source code and technical naming: English only

User-generated content must never be translated automatically. Only the interface and system-managed texts are bilingual.

## Architectural Direction
Use a practical layered architecture with clear separation of concerns.

Backend layers:
- Domain: entities, rules, value objects, contracts
- Application: use cases, orchestration, validation, DTO flow
- Infrastructure: persistence, mappings, repositories if needed, Unit of Work, integrations
- API: controllers, authentication, authorization, transport concerns

Frontend direction:
- Prefer feature-oriented organization
- Separate pages, components, services, hooks, state, and translation resources
- Keep reusable code shared only when it is truly cross-cutting

## Structure Rules
Backend must stay organized by layer and responsibility. Frontend must stay organized by feature and shared technical concerns.

Recommended frontend areas:
- `app`, `routes`, `layouts`, `features`, `components`, `services`, `hooks`, `i18n`, `utils`, `types`, `config`

No new task may introduce parallel structures, duplicated logic, or ad hoc patterns outside the established organization.

## Engineering Standards
- Prefer clarity over cleverness
- Prefer maintainability over premature optimization
- Keep classes, methods, and components small and focused
- Use clear, consistent English naming everywhere
- Avoid hardcoded values when configuration or constants are more appropriate
- Validate inputs and handle errors explicitly
- Use comments only when they explain important or non-obvious logic
- Avoid unnecessary abstractions

## Backend Rules
- Controllers must be thin
- Business rules must stay out of controllers and persistence code
- Application layer must orchestrate use cases and transactions
- Domain layer must protect core rules and invariants
- Infrastructure must own persistence and external integrations
- All entities and tables must be explicitly mapped
- All schema changes must be delivered through migrations
- Unit of Work must coordinate transactional consistency
- API design must be secure, validated, and maintainable

## Frontend Rules
- Pages coordinate screens; components stay reusable and focused
- Avoid oversized components with mixed responsibilities
- Keep UI logic separate from data access and domain logic
- Use consistent patterns for forms, validation, layouts, and state handling
- Build all screens with internationalization support from the start

## Internationalization Rules
- All UI text must come from centralized translation resources
- Do not hardcode translatable text in components
- Portuguese and English support is mandatory from the beginning
- Language switching must be reliable and driven by system configuration
- User-created content must remain unchanged

## Security and Configuration Rules
- Design for secure access from the start
- Never hardcode secrets or sensitive settings
- Use environment-aware configuration suitable for cloud hosting
- Keep authentication, authorization, logging, and error handling safe and explicit

## Task Rules
Every new task must follow this document.

Every completed task must also create a task documentation record in the project task documentation area explaining:
- what was implemented
- which files or modules were affected
- which relevant technical decisions were applied
- any important notes for future maintenance

A task is only fully complete after its task documentation has been created.

## Final Rule
Extend the project by strengthening the existing architecture, not by bypassing it. Consistency is a mandatory engineering requirement.