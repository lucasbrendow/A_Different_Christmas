# Task Documentation - 004 Creating the Persistence Layer

## 1. Summary
This task completed the backend persistence layer inside ND.Service, following the project overview and technical foundation. The result is a persistence structure with explicit code-based mappings, transactional Unit of Work behavior, consistent audit handling during persistence, and migration tooling support aligned with the layered backend architecture.

## 2. What Was Implemented
- Extended the Unit of Work contract with explicit transaction lifecycle operations
- Implemented transactional Unit of Work behavior in the infrastructure layer
- Added centralized audit handling in the database context for created and modified timestamps
- Added a design-time database context factory to support migration operations consistently
- Preserved explicit code-based mapping through the existing entity configuration structure
- Added persistence-focused unit tests for commit, rollback, and audit behavior
- Added the required task documentation record for this persistence task

## 3. Main Technical Decisions
- The persistence layer continues to live inside ND.Service.Infrastructure to preserve separation from API and presentation concerns.
- Transaction control was strengthened by extending the Unit of Work abstraction instead of letting application code depend directly on EF Core transaction types.
- Audit timestamp handling was centralized in ApplicationDbContext so entity persistence remains consistent and future entities inherit the same behavior automatically.
- A design-time ApplicationDbContextFactory was introduced so migration commands can create the DbContext using the same infrastructure assembly without depending on ad hoc startup behavior.
- Persistence tests were added using SQLite in-memory so transaction and database behavior could be validated without introducing presentation dependencies.

## 4. Files and Modules Affected
Application layer:
- ND.Service/src/ND.Service.Application/Abstractions/Persistence/IUnitOfWork.cs

Infrastructure layer:
- ND.Service/src/ND.Service.Infrastructure/ND.Service.Infrastructure.csproj
- ND.Service/src/ND.Service.Infrastructure/Persistence/ApplicationDbContext.cs
- ND.Service/src/ND.Service.Infrastructure/Persistence/ApplicationDbContextFactory.cs
- ND.Service/src/ND.Service.Infrastructure/Persistence/UnitOfWork.cs
- ND.Service/src/ND.Service.Infrastructure/Persistence/Configurations/SystemConfigurationMap.cs

Tests:
- ND.Service/tests/ND.Service.UnitTests/ND.Service.UnitTests.csproj
- ND.Service/tests/ND.Service.UnitTests/ApplicationDbContextPersistenceTests.cs

Task record:
- Docs/Tasks/Tasks_documentation/004-Creating_the_persistence_layer_documentation.md

## 5. Validation Performed
The following validations were executed successfully:
- dotnet test ND.Service.sln

Result:
- solution build succeeded through the test run
- unit tests passed, including the new persistence transaction and audit tests
- integration tests passed

## 6. Notes for Future Tasks
- New persisted entities should continue to use explicit mapping classes in the infrastructure layer.
- Future application use cases should rely on the Unit of Work abstraction for transactional persistence instead of using DbContext transactions directly.
- Schema changes must continue to be delivered through migrations only.
- Additional persistence tests should reuse the same isolated database-testing pattern when new entities and relationships are introduced.