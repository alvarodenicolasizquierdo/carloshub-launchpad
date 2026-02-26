

## Add "The Trust Shift" Strategy Deck to Collateral

**What**: Add the uploaded PDF ("TIC Strategy Board Deck — The Trust Shift") as a new downloadable resource on the Collateral page.

**Changes**:

### 1. Copy the PDF to the project
- Copy `user-uploads://TIC-Strategy-Board-Deck_-_THE_TRUST_SHIFT.pdf` to `public/collateral/TIC-Strategy-Board-Deck_-_THE_TRUST_SHIFT.pdf`

### 2. Update `src/pages/Collateral.tsx`
- Add a new entry to the `RESOURCES` array:
  - **Title**: "The Trust Shift — Board Strategy Deck"
  - **Format**: PDF
  - **Icon**: `Presentation` (already imported)
  - **Audience**: "Board / Executive"
  - **Status**: available
  - **isNew**: true
  - **Description**: "From Commodity Testing to the Compliance Operating System — 84-source strategic analysis of the global TIC industry covering market evolution, regulatory triggers, competitive landscape, and the shift from labs to digital compliance platforms. Feb 2026."
  - **downloadUrl**: `/collateral/TIC-Strategy-Board-Deck_-_THE_TRUST_SHIFT.pdf`

No other files need to change.

