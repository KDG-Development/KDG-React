# Storybook Usage in kdg-react

## Overview

Storybook is used in this project as the primary tool for developing, testing, and documenting React UI components and reusable utilities in isolation. It provides a live, interactive environment for both developers and designers to view and interact with components and utilities, ensuring consistency and quality across the library.

## Running Storybook

- **Locally:**
  - Start Storybook with: `npm run dev`
  - Access the UI at: [http://localhost:6006](http://localhost:6006)
- **With Docker:**
  - Run: `docker-compose up`
  - Access at: [http://localhost:6006](http://localhost:6006)

## Directory Structure

- **Configuration:** `.storybook/`
  - `main.ts`, `preview.ts`, `manager.ts`, `theme.ts` define Storybook's behavior, theming, and addons.
- **Stories:** `src/stories/components/`
  - Each component and reusable utility must have a corresponding `*.stories.ts(x)` file for its stories.

## Conventions

- All new or updated components and reusable utilities must include or update a Storybook story in `src/stories/components/`.
- Stories should demonstrate all major states, variants, and edge cases of the component or utility.
- Use [CSF (Component Story Format)](https://storybook.js.org/docs/react/api/csf) for all stories.
- Shared story utilities/types can be placed in `src/stories/utilities/` or `src/stories/types/`.

## Integration with Development Workflow

- Storybook is used for visual review during PRs and for manual QA.
- Changes to components or reusable utilities should be reflected in their stories for accurate documentation and testing.
- Storybook can be extended with custom themes and addons via `.storybook/` config files.

## References

- See the [README.md](../README.md) for quick start and contribution steps.
- For Storybook configuration, review files in `.storybook/`.
- For component and utility stories, see `src/stories/components/`. 