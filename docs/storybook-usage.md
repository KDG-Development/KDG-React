# Storybook Usage in kdg-react

## Overview

Storybook is used in this project as the primary tool for developing, testing, and documenting React UI components in isolation. It provides a live, interactive environment for both developers and designers to view and interact with components, ensuring consistency and quality across the component library.

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
  - Each component has a corresponding `*.stories.ts(x)` file for its stories.

## Conventions

- All new or updated components must include or update a Storybook story in `src/stories/components/`.
- Stories should demonstrate all major states, variants, and edge cases of the component.
- Use [CSF (Component Story Format)](https://storybook.js.org/docs/react/api/csf) for all stories.
- Shared story utilities/types can be placed in `src/stories/utilities/` or `src/stories/types/`.

## Integration with Development Workflow

- Storybook is used for visual review during PRs and for manual QA.
- Changes to components should be reflected in their stories for accurate documentation and testing.
- Storybook can be extended with custom themes and addons via `.storybook/` config files.

## References

- See the [README.md](../README.md) for quick start and contribution steps.
- For Storybook configuration, review files in `.storybook/`.
- For component stories, see `src/stories/components/`. 