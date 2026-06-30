# CarDekho

## What did we build and why?

CarDekho is a simple car discovery and comparison application that lets users:

- Browse cars from the backend catalog
- Filter cars by fuel type, body type, and budget range
- Shortlist preferred cars
- Compare shortlisted cars side by side with EMI estimates

The goal was to build a focused product experience that helps a user quickly narrow down car choices before making a purchase decision.

## What did we deliberately cut?

To keep the project focused and within the requested scope, we deliberately left out:

- Authentication and user accounts
- Persistent saved shortlists across sessions
- Full search, sorting, and pagination systems
- Advanced analytics, recommendation engine, or CRM integrations
- Production-grade deployment and monitoring setup

## Tech stack

### Frontend
- React + Vite for a lightweight SPA structure with fast development feedback
- Plain CSS for simple, custom styling without adding extra UI libraries
- Fetch-based API service to call the backend endpoints directly

### Backend
- Spring Boot for the REST API layer
- Spring Data JPA for database-backed car management
- File-based H2 database for local persistence and seeded car data

## What was delegated to AI tools vs. done manually?

### Delegated to AI tools
- Initial component structure and UI refactoring suggestions
- Reusable service and compare-view implementation ideas
- Quick CSS and layout adjustments for the compare table and filter panel
- Build and syntax issue debugging during development

### Done manually
- Defined the core flow and user requirements
- Connected the frontend to the backend API endpoints
- Chose the actual comparison fields and EMI behavior
- Verified the final build and adjusted the final UI polish

## Where the tools helped most

The AI tools were most helpful for:

- Turning the feature list into a clean frontend component split
- Reducing repetitive code for repeated UI patterns
- Speeding up debugging for compile-time issues and layout inconsistencies

## Where they got in the way

The tools were less useful when:

- Product decisions needed domain judgment rather than generic code generation
- Backend contract behavior had to be validated against the real API responses
- Design decisions required manual refinement to match the expected user experience

## If we had another 4 hours, what would we add?

Given more time, we would add:

- Persistent shortlist storage with localStorage
- Better sorting and pagination for large car listings
- More advanced comparison highlights and explanations
- Loading skeletons and better empty/error states
- A more polished responsive design and accessibility improvements
