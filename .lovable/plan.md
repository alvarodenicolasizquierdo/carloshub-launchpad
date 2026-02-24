

# Update Custom Domain Support for dnaventures.es

## What's changing

The Hub currently only trusts URLs ending in `.lovable.app` or `.lovable.dev`. Since you're setting up custom domains on `dnaventures.es`, we need two changes:

1. **Add `.dnaventures.es` to the trusted domains whitelist** so the Settings URL override feature accepts your new custom domains.
2. **Update the test file** to cover the new trusted domain.

The default `APP_URLS` will stay as the Lovable URLs (they'll keep working as fallbacks). Once DNS propagates, you can enter the new URLs in **Settings** and they'll be accepted by the validator.

## Summary of expected custom domains

| App | Current (stays as default) | New custom domain |
|---|---|---|
| Hub | carloshub-launchpad.lovable.app | carloshub-launchpad.dnaventures.es |
| Portal | sgs-carlos.lovable.app | sgs-carlos.dnaventures.es |
| AI | sgs-ai-carlos.lovable.app | sgs-ai-carlos.dnaventures.es |
| BLUE | sgs-bs-carlos.lovable.app | sgs-bs-carlos.dnaventures.es |
| SMART | sgs-smart-adv.lovable.app | sgs-smart-adv.dnaventures.es |

## Technical details

### File 1: `src/config/constants.ts`
- Line 193: Add `".dnaventures.es"` to the `ALLOWED_DOMAINS` array

### File 2: `src/config/constants.test.ts`
- Add a test case confirming that a `.dnaventures.es` override is accepted
- Example: override portal to `https://sgs-carlos.dnaventures.es` and verify it's returned

### No other changes
- `APP_URLS` defaults stay as-is (Lovable URLs remain the fallback)
- No UI, layout, or functional changes
- The Hub's own URL (`carloshub-launchpad.lovable.app`) is unaffected by this code change -- that's configured in Lovable project Settings separately

