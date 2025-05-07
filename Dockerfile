FROM oven/bun:1.2.10-slim AS base
WORKDIR /app

FROM base AS shared-builder

COPY shared/package.json shared/bun.lock ./shared/

RUN cd shared && bun install --ci

COPY shared ./shared

FROM shared-builder AS frontend-builder

COPY frontend/package.json frontend/bun.lock ./frontend/

RUN cd frontend && bun install --ci

COPY frontend ./frontend

WORKDIR /app/frontend

RUN bun run build

FROM shared-builder AS backend-builder

COPY --from=frontend-builder /app/backend/dist ./backend/dist

COPY backend/package.json backend/bun.lock ./backend/

RUN cd backend && bun install --ci

COPY backend ./backend

WORKDIR /app/backend

FROM base

ENV NODE_ENV=production

COPY --from=shared-builder /app/shared ./shared

COPY --from=frontend-builder /app/backend/dist ./dist

COPY --from=backend-builder /app/backend ./backend

EXPOSE 3000

WORKDIR /app/backend

CMD ["bun", "run", "start"]