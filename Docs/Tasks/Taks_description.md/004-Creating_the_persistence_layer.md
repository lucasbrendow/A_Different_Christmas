# Task 004 - Creating the Persistence Layer

## Objective
Create the persistence layer for the backend solution based on the general description and the technical foundation. The goal of this task is to establish the database access and mapping structure required to persist and retrieve the campaign administrative data in a consistent, maintainable, and migration-driven way.

The persistence layer must be created inside the ND.Service solution and must follow the established backend architecture.

## References
- [Docs/General_description.md](c:/Projetos/A_Different_Christmas/Docs/General_description.md)
- [Docs/Technical_foundation.md](c:/Projetos/A_Different_Christmas/Docs/Technical_foundation.md)

## Description
This task is responsible for creating the backend persistence layer of the system using SQL Server with a code-first approach. It must connect the domain models of the Christmas campaign administrative system to the database structure through explicit mapping classes, ensuring that schema definition remains centralized, controlled, and ready to evolve over time.

The persistence layer must support the project needs described in the general overview, including future persistence for children, guardians, sponsors, groupings, delivery progress, campaign indicators, and system-level configuration. The implementation must avoid database definitions scattered across the application and must keep persistence concerns isolated inside the infrastructure layer.

The solution must define the database context, entity mappings, persistence configuration, and transactional save coordination through the Unit of Work pattern. Relationships, constraints, field characteristics, keys, and table definitions must be expressed in code so that future schema evolution can be managed safely through migrations only.

This task is not intended to implement presentation or controller logic. Its purpose is to establish a solid persistence foundation that future backend tasks can extend without bypassing the layered architecture.

## Expected Scope
- Create or complete the database context inside ND.Service.Infrastructure
- Configure entity mappings in code for the persisted domain models
- Define table names, primary keys, field properties, required fields, lengths, constraints, and relationships through mapping classes
- Prepare the persistence structure for future entities related to children, guardians, sponsors, delivery tracking, and system configuration
- Implement or complete the Unit of Work structure to centralize save operations and transactional consistency
- Configure the infrastructure layer for SQL Server persistence using environment-aware configuration
- Prepare the solution for migration-based schema evolution and future database updates
- Keep persistence responsibilities isolated from API, controller, and presentation concerns
- Keep the persistence layer aligned with the existing backend dependency injection and layered structure

## Rules
- All code and technical naming must be in English
- The implementation must be created inside ND.Service
- Persistence concerns must remain in the infrastructure layer
- All entities and tables must be explicitly mapped in code
- All database changes must be handled through migrations only
- Table definitions, relationships, and constraints must not be scattered outside the mapping structure
- The Unit of Work pattern must centralize save operations and transactional consistency
- Controllers must remain thin and must not contain persistence rules
- Business rules must not be moved into persistence code
- The persistence layer must follow the project technical foundation without creating parallel patterns or ad hoc structures

## Expected Result
At the end of this task, the project must have a backend persistence layer ready to support the campaign administrative system through a structured database context, explicit code-based mappings, SQL Server configuration, and a Unit of Work implementation aligned with migration-based schema evolution and the established backend architecture.