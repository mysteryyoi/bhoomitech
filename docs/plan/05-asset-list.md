# Asset list: what to make, and who makes it

**For:** Rohit and GPT (Codex), who make the assets. Claude builds the site from them.
**Based on:** `00-master-plan.md` (§4 creative system, §6 signature moments, §9 phases) and area plans A1–A3.
**Written:** 27 Nov 2026.

---

## The one rule

**Anything that shows *our* farm, produce, team, sellers or farmers must be real:** a photo, a video or a 3D scan of the real thing.

GPT can make anything that is clearly illustrative: textures, line drawings, icons, mood boards. It must never make a picture that looks like a real Bhoomi Tech farm, vegetable, person or shop. The master plan rules this out (§4, "Imagery"), and a visitor who spots it stops trusting the site.

So this list has three parts:

1. **GPT + Rohit can make these now.** Illustrative assets.
2. **Must be captured for real.** Rohit arranges it, with a phone or a photographer.
3. **Claude builds these in code.** Nothing for you to make.

---

## 1. GPT + Rohit can make these now

| # | Asset | What it's for | Spec | Needed by |
|---|---|---|---|---|
| G1 | **Mood board** (12–20 reference frames) | Briefing the photographer, and agreeing the look before the expensive shoot and 3D work | Lighting, backgrounds, crop and grade, following §4: produce on soil-black, side-lit like a Dutch still life; blacks lifted to `#101610`; greens pulled toward leaf/lime; warm highlights; grain. Mark every frame **"reference only, not for the site"**. PDF or PNG. | Before the shoot is booked |
| G2 | **Abstract textures** (3): soil grain, leaf-vein macro, paper grain for the cream pages | The About "भूमि" letters filling with soil, the Home soil core, backgrounds | Seamless tile, 2048×2048 PNG, greyscale. No recognisable objects, so nothing can pass for a real field. | Phase 3 |
| G3 | **Technical line drawings of the 3 crops**: lettuce, kale, cucumber | Interim visuals on Our Produce, About and the lite version of Home, until scans and photos exist | Botanical or engineering-plate style. One line weight, no fill, no shading, no cartoon. Transparent background. SVG preferred; otherwise a 4000px PNG that Claude traces. | Phase 4 |
| G4 | **Growth-stage line drawings**: 6 per crop, 18 in total | The "Seed to Shelf" scrubber on each vegetable page, until real stage photos exist | Stages: Seed, Sprout, Growth, Harvest, Chill, Shelf. Same style as G3, same framing and size in every frame of a crop so they crossfade cleanly. Labelled "illustration" on the site. | Phase 4 |
| G5 | **Farmer icons**: 3 crops + "something else", and 5 problems (water, disease, soil, planning, selling) | The "Tap what you need" tiles and the service cards on For Farmers | Friendly, hand-drawn feel, but simple enough to read at 88px on a cheap phone. A 24px grid, 1.5px stroke, round caps, so they sit with the Phosphor Light icons. SVG. | Phase 4 |

**How to deliver:** put the files in `B:\bhoomi tech website\assets-inbox\` (outside the code repo, so large files don't bloat it), one folder per row: `G1-moodboard`, `G2-textures` and so on. Start every AI-made file name with `ai-`, so we always know which images are illustrative.

---

## 2. Must be captured for real (Rohit arranges)

Ordered by what to start first. **R1 takes a full growing cycle, so start it this week.**

### R1. Growth diary: start now

- **What:** the same plant of each crop, photographed at the 6 stages (Seed, Sprout, Growth, Harvest, Chill, Shelf).
- **Why first:** it can't be rushed. Lettuce takes about 4–6 weeks from seed. These photos replace the G4 drawings.
- **How:** a phone on a fixed stand, the same spot, angle and distance every time, and a plain backdrop behind the plant. A few photos at each stage, plus one every 2–3 days in between (they could later become a real time-lapse).
- **Also record:** the real day number of each stage. The site shows "Day --" until real numbers exist, and never invents them.

### R2. Produce turntables and 3D scans: lettuce, kale, cucumber

This is the cheapest way to unlock the big homepage and produce moments before the shoot.

- **Turntable photos (do these first):**
  - Phone on a tripod, the vegetable on a lazy Susan, and black cloth behind and under it.
  - Two soft lights from the side.
  - **72 photos per crop**, turning 5° each time. Lock the focus and exposure so the frames match.
  - They're real photos, so they're honest, and they become the "harvest turntable" on Home directly.
- **3D scans:**
  - Use a free phone app, such as RealityScan or Scaniverse, and keep the raw photos as well as the model.
  - Two specimens per crop: a hero and a spare.
  - Scan within 30 minutes of harvest, dry with no water drops, in shade or an overcast light.
  - Cucumber scans easily. Lettuce and kale may come out rough, because thin leaves are hard to scan. That's why the turntable photos come first.

### R3. The 2-day shoot (photographer)

Still open: the budget (master plan Q3). Book it once G1 is agreed. Hand the photographer this list and the mood board.

**Day 1: the farm**

| Shot | Notes |
|---|---|
| The farm at golden hour | 3–4 wide angles. Leave empty sky or ground for headline text. |
| Macro leaves | Veins, edges, water on a leaf |
| Hands at work | Sowing, transplanting, harvesting, packing |
| The tech in use | Sensors, irrigation, any screen the software runs on |
| Team portraits | Natural light, 4:5, plain background, one per person |
| Video loops | 6–10 s, silent, tripod with no camera movement so they loop cleanly: misting, leaves moving, hands |

**Day 2: studio and market**

| Shot | Notes |
|---|---|
| **The lettuce story** (Codex's "one lettuce" spine) | Five matched frames, each with the subject in the **same spot of the frame**: a seed between two fingers, a leaf, the head, a seller's counter, a plate |
| Produce still lifes | Lettuce, kale and cucumber, each alone and together, on soil-black, side-lit |
| Cut-outs | Each crop on a plain background, for the Our Produce specimens |
| A top-down plate | The "fork" end of seed to fork |
| A real seller's shop | In daylight, with the owner's written permission |
| One social-share frame | A wide hero image with space for the logo |

**For every shot:**
- RAW files plus full-size JPEGs, at least 3000px on the long side.
- A signed release from every person in a photo, and written permission for every shop.
- A licence for unlimited web and social use. Keep the agreement in writing.

### R4. Things only Bhoomi Tech has

| Item | Notes | Needed by |
|---|---|---|
| Original logo files (AI, SVG, PDF, or whatever the designer used) | If none exist, Claude redraws the logo from the current B mark | Phase 1 |
| Software screenshots or a screen recording | Real ones, with private data blurred. Only if the software exists and runs today. | Phase 4 |
| Seller logos | Collected with each seller's written consent to be listed | Phase 5 |
| Farmer stories: photo, first name, village, crop, one-line quote, short audio | Written consent for each. If there are none at launch, the section is left out, not faked. | Phase 5–6 |
| Voice recordings for the farmers page's "Listen" buttons | A real team member's voice, English and Hindi, one short line per service | Phase 6 (Hindi) |
| Explainer video, 60–90 s (optional) | One per language, with captions | Phase 6 |

### R5. Decisions, not files

- **Display font:** GT Alpina, a paid web licence from Grilli Type, or the free Fraunces. The site works with either.
- **How the produce is grown** (master plan Q5): open field, polyhouse, hydroponic or vertical. This changes what the farm shots show and the homepage 3D model (soil core or grow cube), so answer it before the shoot.

The non-visual facts (phone, WhatsApp, sellers, claims, team) are in master plan §11.

---

## 3. Claude builds these in code (nothing to make)

- **The logo redraw:** the B mark on its grid as filled outlines, the outlined wordmark, the lockups, the favicon, and the app and share icons.
- **The annotation kit:** callouts, brackets, crosshair, scan bar, the ground line, and the 12 chapter glyphs (seed, sprout, sensor and so on).
- **The homepage soil core and growing seedling:** generated in 3D in code, plus the pre-rendered image sequence for mid-range phones.
- **Turntable renders from the R2 scans**, if the turntable photos don't work out. This needs Blender (free) installed on this PC.
- **The Live Farm Console:** the greenhouse drawing and its simulation.
- **The Where to Buy dot-map of India,** from public-domain map data.
- **The For Farmers sunrise,** the "भूमि" About hero, and the share images for every page.

---

## What to start first

1. **This week:**
   - Start the R1 growth diary.
   - Do the R2 turntable photos of all three crops.
   - Look for the original logo files.
   - Answer how the produce is grown.
2. **GPT, in parallel:**
   - G1, the mood board, comes first, because the shoot brief depends on it.
   - Then G2 textures, G3 crop drawings and G5 icons.
   - G4 last, because R1 may replace it.
3. **Then:** agree the mood board, set the shoot budget and book the photographer for R3.

Phases 1 and 2 (the skeleton and the contact forms) need none of these, so the build carries on with placeholders while the assets are made.
