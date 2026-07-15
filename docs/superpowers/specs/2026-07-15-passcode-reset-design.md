# Passcode Reset Script — Design

**Date:** 2026-07-15
**Status:** Approved

## Purpose

Provide a break-glass recovery path for the single-admin CMS passcode. The
existing Settings page remains the normal way to change the passcode while
logged in; this script covers the locked-out (forgotten passcode) case.

## Decision

A local CLI script run from the repo — no public endpoint, no email
infrastructure. Chosen over a secret-token reset page and an email reset link
because it adds zero attack surface and no new services, at the cost of
requiring the repo + `.env.local` locally.

## Behaviour

- Invocation: `npm run passcode:reset -- "<new-passcode>"`
- New file `prisma/reset-passcode.ts`, run via `tsx` (same pattern as
  `prisma/seed.ts`): loads `.env.local`, connects with
  `DIRECT_URL ?? DATABASE_URL` through the pg adapter.
- Validates the new passcode with the same rule as the app (min 6 chars).
- Hashes with `bcrypt.hash(passcode, 12)` (same cost as the app).
- **Upserts** Settings row `id: 1`, so it also repairs a missing settings row
  without touching portfolio content (unlike `db:seed`, which wipes
  experiences/projects).
- Errors: missing arg → usage message, exit 1; short passcode → validation
  message, exit 1; DB failure → underlying error, exit 1.

## Known limitation (accepted)

Existing admin JWT sessions stay valid for up to 7 days after a reset —
sessions are not revocable. The script's success output reminds the operator
to rotate `AUTH_SECRET` if compromise is suspected.

## Verification

Run the script against the dev DB; confirm the old passcode fails and the new
one logs in. (In practice: round-trip by saving the prior hash, resetting to a
temp passcode, confirming the hash changed, then restoring the prior hash.)
