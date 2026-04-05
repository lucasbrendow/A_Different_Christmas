# Task 003 - Creating Login Page

## Objective
Build the website login page based on the general description and the technical foundation. The goal of this task is to create the authentication entry point for the platform while also establishing a strong visual and emotional first impression aligned with the campaign purpose.

The login page must be created inside the ND.Front solution and must follow the established frontend architecture.

## References
- [Docs/General_description.md](c:/Projetos/A_Different_Christmas/Docs/General_description.md)
- [Docs/Technical_foundation.md](c:/Projetos/A_Different_Christmas/Docs/Technical_foundation.md)

## Description
This task is responsible for creating the frontend login page of the system as a public entry screen for authorized administrative users. The page must combine a clear and user-friendly authentication experience with a visual presentation that reinforces the emotional purpose of the project.

The layout must position the Christmas tree on the left side of the page and the login form on the right side. The Christmas tree is not a decorative element only. It must act as a visual communication area for relevant campaign indicators, such as the number of underprivileged children receiving presents, the number of presents already collected, and the number of guardians participating in the project.

The visual direction of the page must feel cozy, warm, and welcoming, while remaining professional, readable, and accessible. The login form must stay clear and focused, and the metrics area must help communicate the impact of the project without harming usability or maintainability.

This task must follow the existing frontend organization and prepare the page for proper integration with authentication and campaign indicator data sources. If some backend integrations are not fully available yet, the frontend must still be structured with clear service and state boundaries so the final integration can be completed without reworking the page architecture.

## Expected Scope
- Create the login page inside ND.Front following the existing frontend structure
- Add the route and page flow required for the public authentication entry point
- Create a focused login form experience for authorized administrative users
- Create the Christmas tree visual area as a structured UI component and not as isolated decorative markup
- Display relevant campaign metrics in the Christmas tree area, including children receiving presents, presents collected, and participating guardians
- Ensure the page layout places the Christmas tree on the left and the login form on the right in desktop usage, with a responsive adaptation for smaller screens
- Apply a warm and welcoming visual design consistent with the emotional purpose of the campaign
- Prepare the page for bilingual interface support in Portuguese and English from the beginning
- Keep the page ready for integration with authentication services and campaign indicator services
- Handle loading, unavailable data, or fallback states in a way that preserves a usable login experience

## Rules
- All code and technical naming must be in English
- The implementation must be created inside ND.Front
- The page must follow the existing feature-oriented frontend organization
- All UI text must come from centralized translation resources
- Portuguese and English support must exist from the start
- User-generated content must never be translated automatically
- The page component must coordinate the screen, while reusable pieces such as the form and the metrics tree remain focused components
- UI logic must remain separated from data access, authentication integration, and any domain-oriented logic
- The Christmas tree metrics area must be implemented in a maintainable way, without mixing visual composition, data access, and page orchestration into a single oversized component
- The page must remain responsive, accessible, and readable across desktop and mobile layouts
- Temporary or mock data, if needed during implementation, must be isolated behind clear frontend service boundaries
- The task must follow the project technical foundation without creating parallel structures or ad hoc patterns

## Expected Result
At the end of this task, the project must have a bilingual login page that works as the platform authentication entry point and also communicates the campaign impact through a warm, welcoming, and maintainable visual experience, aligned with the project architecture and ready for final service integration.
