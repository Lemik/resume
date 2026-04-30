---
title: 'Example: a thin smoke layer you can run on every PR'
description: >-
  A concrete pattern for a fast UI smoke suite—scope, folder layout, and one
  Playwright-style check—written as a reference post for this blog.
published: false
pubDate: 2036-04-29
tags: ['playwright', 'ci', 'example']
image: images/blog/placeholder.svg
imageAlt: Abstract blog cover graphic with “Article cover” label
---

This post is a **worked example** for your Astro blog: headings, lists, a code block, and a cover image in front matter. Replace the text with your own notes when you are ready.

## When a smoke layer helps

Use a **smoke** suite when you need confidence that the app *loads and critical paths respond* without running the full regression set. Good candidates:

- Login or session bootstrap
- Main navigation and one “create/read” flow per core domain
- A health or API probe the UI depends on

Keep the suite **small** (often 5–15 minutes wall time) so it can run on every pull request.

## Suggested layout

```text
tests/
  smoke/
    sanity.spec.ts
    checkout-happy-path.spec.ts
  e2e/
    … fuller scenarios …
```

Naming smoke tests explicitly (`smoke/` or `@smoke` tag) makes it easy to filter in CI.

## Minimal login check (illustrative)

The snippet below is **example-only**—selectors and URLs should match your app.

```ts
import { test, expect } from '@playwright/test';

test.describe('smoke', () => {
	test('sign-in page renders and accepts known user', async ({ page }) => {
		await page.goto('/sign-in');
		await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
		await page.getByLabel('Email').fill('smoke.user@example.com');
		await page.getByLabel('Password').fill(process.env.SMOKE_PASSWORD!);
		await page.getByRole('button', { name: 'Continue' }).click();
		await expect(page).toHaveURL(/\/dashboard/);
	});
});
```

Store secrets in **CI variables**, not in the repo.

## Checklist before you merge

1. **Scope** — Each test maps to one business-critical path.
2. **Stability** — Prefer role- and label-based locators over brittle CSS.
3. **Speed** — No unnecessary `waitForTimeout`; rely on auto-waiting.
4. **Ownership** — On failure, the PR author knows who fixes it (team rotate is fine).

> **Tip:** If smoke is flaky, fix or quarantine the test immediately—otherwise teams stop trusting the signal.

## Next steps

Swap `images/blog/placeholder.svg` for a real asset under `public/images/blog/`, tune `imageAlt` for accessibility, and delete or rewrite this file when you no longer need the sample.
