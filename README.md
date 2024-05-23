## Setup

```bash
pnpm
pnpm dx
```

### Requirements

- Node >= 18.0.0
- Postgres

## Development

### Start project

```bash
pnpm
pnpm dx
```

### Commands

```bash
pnpm build      # runs `prisma generate` + `prisma migrate` + `next build`
pnpm db-reset   # resets local db
pnpm dev        # starts next.js
pnpm dx         # starts postgres db + runs migrations + seeds + starts next.js
pnpm test-dev   # runs e2e tests on dev
pnpm test-start # runs e2e + unit tests
pnpm test-unit  # runs normal Vitest unit tests
pnpm test-e2e   # runs e2e tests
```

---

Created by [@alexdotjs](https://twitter.com/alexdotjs).
