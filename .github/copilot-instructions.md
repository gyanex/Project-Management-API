# Project-specific Copilot instructions

## Short overview

- This is a small Node + TypeScript Express API. The runtime entry is `src/server.ts` which imports `app` from `src/app.ts` and calls `connectDb` from `src/config/db.ts`.
- MongoDB is used via `mongoose` and the connection URL must come from `process.env.MONGO_URI` (see `src/types/env.d.ts`).

## How to run locally

- Development: `npm run dev` — nodemon (configured in `nodemon.json`) runs `ts-node src/server.ts`.
- Build: `npm run build` — runs `tsc` to emit compiled JS into `dist` using `tsconfig.json`.
- Production: `npm start` — runs the compiled `dist/server.js`.

## Key files & patterns to know

- `src/server.ts`: app bootstrap and DB connection. Changes here affect process start and lifecycle.
- `src/config/db.ts`: central place for mongoose connection logic. It logs the MONGO_URI and exits on failure.
- `src/app.ts`: Express `app` instance is created and exported — add middleware and route registration here.
- `src/models/*`: lightweight TypeScript interfaces (example `src/models/Iuser.ts`). Domain models live here; actual Mongoose schemas (when added) should live in a parallel `schemas` or `models` folder.
- `src/types/env.d.ts`: augments `process.env` types; contains `MONGO_URI` and `JWT_SECRET` declarations.

## Project-specific conventions

- Single-entry bootstrap: prefer adding top-level initialization (schedulers, metrics) in `src/server.ts` rather than `src/app.ts`.
- Keep `app` side-effect free: `src/app.ts` should only create and export the Express app; start/stop logic belongs in `src/server.ts`.
- Environment types are declared in `src/types/env.d.ts` — add any new env var names here to keep type-safety.
- Interface naming: interfaces use PascalCase starting with `I` (example `Iuser` in `src/models/Iuser.ts`). Follow the same naming for new DTO/interface files.

## Dev & debugging notes

- Nodemon config: `nodemon.json` runs `ts-node src/server.ts` so runtime errors will show in the terminal. If you change the entry, update `nodemon.json`.
- To debug compiled code, `npm run build` then run `node --inspect-brk dist/server.js`.

## Integration points & required env

- External: MongoDB (URI in `MONGO_URI`).
- Auth: code references `JWT_SECRET` in env types — ensure it's present before implementing auth logic.

## What Copilot should do here

- Prefer small, focused patches touching only relevant files (e.g., add a route: update `src/app.ts` and add `src/routes/...`).
- Keep `src/app.ts` side-effect free; add wiring in `src/server.ts` when needed.
- When adding new env vars, update `src/types/env.d.ts` to maintain typed `process.env`.
- Use existing npm scripts: follow `npm run dev` for iterative work and `npm run build` + `npm start` for production checks.

## Examples

- Add an API route: create `src/routes/tasks.ts`, export a router, then in `src/app.ts` add `app.use('/tasks', tasksRouter)`.
- Add a Mongoose schema: create `src/schemas/task.schema.ts` and import it where models/controllers need DB access.

## When unsure

- If a change touches startup (ports, DB boot), update `src/server.ts` and validate both `npm run dev` and `npm run build` work.

## Feedback

If any part is unclear or you prefer different conventions (e.g., controllers/services structure), tell me which area to expand or standardize.
