# Home scrapbook: the story and the Rive asset list

**For:** Rohit, who makes the moving pieces in Rive, and GPT, which can help with reference sketches. Claude builds the page around them.
**Written:** 27 Nov 2026.
**Status:** draft for Rohit to approve.
**Replaces, once approved:**
- the "one lettuce" Home story in `06-reference-mechanics.md` and in master plan §6
- the Home items in `05-asset-list.md`

Those files haven't been changed yet. The other pages in `05` are unaffected.

---

## The idea

The homepage is a moving scrapbook, like Diesel Farm's. You scroll down and the page travels sideways through cut-out pictures that tell you what Bhoomi Tech is:

> **Bhoomi means land. We bring new tools to the oldest work there is, side by side with the farmer, from the field to your plate.**

Old and new together, with people at the centre. That thread runs through every spread.

## Three kinds of movement

| Movement | Example | Who makes it |
|---|---|---|
| **Sideways drift.** Scroll down and the scrapbook slides left. Each piece slides at its own speed, so near pieces pass faster than far ones and the page feels deep. | Every piece | Claude, in code |
| **Life inside a piece.** A small loop that plays on its own. | The mammoty swinging, drone propellers, rice swaying | Rohit, in Rive |
| **Moments tied to scroll.** The site tells Rive how far you've scrolled, and the piece acts it out. | The engineer's hand settling on the farmer's shoulder as you arrive | Rohit animates it, Claude connects it |

You never animate the sideways movement or the layout. You make each piece come alive. I place it, move it and write the words around it.

---

## The story

The scrapbook has a cover, six spreads and a closing spread. On a laptop, each spread is about one screen wide. The words below are first drafts.

### Cover: भूमि
- **You see:** two hands cupping soil, with a seedling in the middle, and the headline beside them.
- **Moves:** the seedling's leaves sway. As you start scrolling, a new leaf unfolds.
- **Words:**
  - "भूमि means land."
  - "Bhoomi Tech grows food and builds farm technology, side by side with farmers."
  - "Scroll to walk the field →"

### 1. It starts with the land
- **You see:** a farmer turning the soil with a mammoty at the edge of a paddy field, early in the morning, with egrets in the water behind.
- **Moves:** the mammoty lifts and strikes in a slow rhythm and the soil puffs up. The rice sways in waves. An egret walks and pecks.
- **Words:**
  - "Every season begins the same way: hands, a mammoty and the soil."
  - "Farmers have read this land for generations."

### 2. The land doesn't make it easy (optional)
- **You see:** a rain cloud, a patch of cracked dry earth, a leaf eaten by a caterpillar, and a price tag.
- **Moves:** the rain falls and the caterpillar inches along.
- **Words:** "Too much rain, or too little. Pests. Prices that change overnight."
- **Why it's optional:** it gives the story tension, so the tools in spread 3 have something to solve. Leave it out if you'd rather the story stays warm all the way through.

### 3. New tools that listen to the land
- **You see:** a drone flying over the paddy and scanning it, a soil sensor in the ground, and a phone showing the farm app. A polyhouse and a drip line sit behind them.
- **Moves:**
  - The propellers spin and the drone bobs.
  - As you scroll, its scan sweeps across the field and squares light up.
  - The sensor blinks.
  - A drop forms on the drip line and falls.
  - The gauge on the phone rises and a note slides in.
- **Words:** "A drone sees the whole field in minutes. A sensor checks the soil every hour. The farmer gets the answer on their phone."
- **Check:** show only tools Bhoomi Tech really uses or offers, and only features the software really has. The words are confirmed before launch.

### 4. Together (the heart of the story)
- **You see:** an engineer and a farmer standing at the edge of the field, looking out over it. The engineer has a hand on the farmer's shoulder. Two glasses of tea sit on the bund.
- **Moves:**
  - As the spread arrives, the engineer's hand settles on the farmer's shoulder.
  - Then they breathe, and the farmer's towel lifts in the wind.
  - The farmer turns a little and smiles.
  - Steam rises from the tea.
- **Words:**
  - "Old knowledge. New tools. The same field."
  - "We don't replace the farmer. We stand beside them."

### 5. What grows
- **You see:** lettuce, kale and cucumbers, a harvest crate, and a seed packet.
- **Moves:** the leaves ruffle, and a drop of water slides off a leaf.
- **Words:** "Lettuce, kale and cucumber, picked fresh."
- **Open:** whether they're grown in a polyhouse or an open field is still undecided (master plan Q5).

### 6. From our field to your plate
- **You see:** an auto-rickshaw carrying crates, a shop counter with our produce, and a plate of salad with a fork. A dashed line links the field, the shop and the plate.
- **Moves:** the rickshaw's wheels turn and it bounces as it drives across. The dashed line draws itself as you scroll.
- **Words:**
  - "Seed to fork."
  - "Find our vegetables at shops near you."
  - The link goes to Where to Buy. Nothing is sold on the site.

### Closing: find your way in
- **You see:** three tags hanging on strings, one for each kind of visitor.
- **Moves:** each tag swings when you point at it.
- **Words:**
  - "I want fresh vegetables" → Our Produce
  - "I'm a farmer" → For Farmers
  - "I run a farm business" → Farm Software

---

## The asset list

**How to read it**

- **Type:**
  - **Rive:** it moves, made in Rive.
  - **Still:** it doesn't move. Draw it in Rive as an artboard with no animation and I'll turn it into an image, or send a PNG or SVG.
  - **Claude:** built in code, nothing for you to make.
- **Artboard:** the name my code looks for. Please use it exactly.
- **Size:** the artboard's rough size on the 2400 × 1500 layout (rule 3), including room to move.
- **Still pose:** the single frame some visitors see instead of the animation (rule 6).
- **Direction:** every piece faces **right**, the way the story travels.

### First: the farmer's character sheet

The same farmer appears twice: with the mammoty in spread 1, and with the engineer in spread 4. Before animating, draw him once from the side and once in three-quarter view, so he's clearly the same man both times. GPT can help with sketches for this sheet. It's for reference only and doesn't go on the site.

- **Who he is:** a man in his fifties, lean and strong from work. Sun-darkened skin, short grey stubble.
- **Clothes:**
  - a white mundu folded up to the knee
  - a faded short-sleeved shirt, or bare-chested if that's how farmers there really work
  - a thorthu: a thin cream cotton towel with a narrow coloured border, tied round his head, with one end hanging loose
- **Feet:** bare.

### Cover: `home-0-cover.riv`

**H0.1 Hands with a seedling** · Rive · `hands-seedling` · about 700 × 700
- **Looks:**
  - Two weathered hands cupped together, seen from slightly above, holding a mound of dark, crumbly soil.
  - A seedling stands in the middle: two round seed leaves and one small true leaf.
  - The hands end at the wrist, with the cut edge.
- **Moves:** the leaves sway gently (4 s loop). `scroll`: a new leaf unfolds from the tip of the stem.
- **Still pose:** the new leaf fully open.

**H0.2 Soil clods** · Still · `soil-clod-1`, `soil-clod-2`, `soil-clod-3` · about 300 × 200 each
- **Looks:** three lumps of dark soil in different sizes, with a few root threads and a small pebble. I scatter them around the cover.

### 1. The land: `home-1-land.riv`

**H1.1 Farmer with mammoty** (hero) · Rive · `farmer-mammoty` · about 900 × 1100
- **Looks:**
  - The farmer from the character sheet, in side view.
  - He stands in wet soil at the edge of the paddy, working with a mammoty: a broad iron blade set at a right angle to a long wooden handle, its edge worn shiny.
- **Moves (3.5 s loop):**
  1. He lifts the mammoty slowly, up past his shoulder.
  2. He pauses at the top.
  3. He brings it down hard into the soil. A few crumbs and a puff of dust fly up.
  4. He pulls the earth back towards his feet, and lifts again.
  - His knees bend and his back leans in on the strike.
  - The towel end follows a moment later.
- **`tap` (optional):** he straightens, wipes his brow with his forearm and goes back to work.
- **Still pose:** the mammoty raised at the top of the swing.
- **Watch:** the artboard must be tall enough to hold the raised blade.

**H1.2 Paddy field strip** · Rive · `paddy-strip` · about 2400 × 450
- **Looks:** a wide strip of paddy, seen from the side and a little above. Rows of young green rice stand in shallow water that reflects the sky. A raised mud bund runs along the front.
- **Moves:** waves of wind pass through the rice from left to right (6–8 s loop). Two or three glints slide across the water.
- **Watch:** make the left and right edges match, so I can repeat the strip across spreads. It also runs under the drone in spread 3.

**H1.3 Egret** · Rive · `egret` · about 500 × 450
- **Looks:** a small white egret, standing ankle-deep in water. It has a slim body, a long S-shaped neck, a yellow bill and long dark legs.
- **Moves (5 s loop):** it takes a slow step, dips and pecks the water so a ripple ring spreads, then lifts its head.
- **`tap` (optional):** it flaps up, flies off and lands back.
- **Still pose:** standing, head up.
- **Note:** I'll use it two or three times at different sizes, so one good egret is enough.

**H1.4 Morning sun** · Still · `sun` · about 600 × 600
- **Looks:** a large, low sun: a flat disc of sun yellow with a hand-cut edge, and two thin strips of cream cloud across it.

**H1.5 Women transplanting paddy** (optional) · Rive · `transplanting` · about 900 × 550
- **Looks:** two women with saris tucked up for field work, bent over in the water. Each holds a bundle of rice seedlings.
- **Moves (5 s loop, the two out of step):** bend, push a seedling into the mud, step back.
- **Still pose:** both bent over, mid-planting.

**H1.6 Coconut palms** (optional) · Still · `palms` · about 700 × 1200
- **Looks:** two or three tall coconut palms with curving trunks. Make them a little darker and simpler than the pieces in front, so they read as far away.

### 2. The hard parts (optional spread): `home-2-hard.riv`

**H2.1 Rain cloud** · Rive · `rain-cloud` · about 700 × 650
- **Looks:** a heavy blue-grey cloud cut from paper, with streaks of rain falling from it.
- **Moves:** it drifts and swells a little, and the rain falls in a loop. `scroll`: the rain gets heavier.
- **Still pose:** heavy rain.

**H2.2 Cracked dry soil** · Still · `cracked-soil` · about 800 × 300
- **Looks:** a patch of dry, red-brown earth split into cracked plates, with one wilted seedling.

**H2.3 Leaf with a caterpillar** · Rive · `leaf-caterpillar` · about 500 × 400
- **Looks:** a big leaf with ragged bite holes, and a green caterpillar on its edge. Use leaf greens, not lime.
- **Moves (4 s loop):** the caterpillar inches along the edge.

**H2.4 Price tag** · Claude
- A paper tag on a string that swings. The price is text on the page.

### 3. New tools: `home-3-tools.riv`

**H3.1 Drone** (hero) · Rive · `drone` · about 600 × 900, with the beam hanging below
- **Looks:** a farm drone seen from the side and a little above. It has a dark body, four arms with propellers, a small camera underneath and a lime status light.
- **Moves:**
  - The propellers spin; draw them as blurred discs.
  - The body bobs up and down and tilts a little.
  - The light blinks every 1.5 s.
  - `scroll`: a soft lime scan beam switches on underneath and sweeps from left to right.
- **Still pose:** hovering, with the beam on, mid-sweep.

**H3.2 Field from above, with a scan grid** · Rive · `field-scan` · about 1000 × 650
- **Looks:** paddy fields seen straight from above: a patchwork of green plots split by bunds, with a thin canal.
- **Moves (`scroll`):** a fine lime grid draws across from left to right, as if the drone is passing over. As it passes, three or four squares glow lime (healthy) and one or two glow clay (needs water).
- **Still pose:** the grid complete, with the squares lit.

**H3.3 Soil sensor** · Rive · `soil-sensor` · about 300 × 700
- **Looks:**
  - A slim sensor stake pushed into the ground.
  - It's drawn as a cut-away, so you see the soil layers, the roots and the probe underground.
  - On top is a small head with a tiny solar panel and a lime light.
- **Moves (2 s loop):** the light blinks, and with each blink three lime signal arcs pulse outwards.

**H3.4 Phone with the farm app** · Rive · `phone-app` · about 450 × 800
- **Looks:**
  - A phone, tilted slightly.
  - Its screen shows a simple drawn app: a round gauge, a small map of the field and a note card.
  - Use lines in place of words, and no numbers.
- **Moves (5 s loop):** the gauge needle rises and settles, then a note card slides up from the bottom.
- **Still pose:** the gauge up and the note showing.
- **Check:** show only the kinds of things the real software does.

**H3.5 Polyhouse** · Still (or Rive) · `polyhouse` · about 1100 × 600
- **Looks:** a polyhouse from the side. Curved steel hoops are covered in white, slightly see-through film, with rows of green plants showing faintly through it and a door at the end.
- **Optional Rive:** fine mist drifting inside.

**H3.6 Drip line** · Rive · `drip` · about 400 × 300
- **Looks:** a short length of black drip pipe lying on soil, with one emitter.
- **Moves (3 s loop):** a drop of water swells at the emitter and falls. A dark wet patch spreads in the soil, then fades.

### 4. Together: `home-4-together.riv`

**H4.1 The engineer and the farmer** (hero) · Rive · `together` · about 900 × 1100
- **Looks:**
  - Two people stand side by side at the edge of the field, in three-quarter view, looking out to the right over the field.
  - **Left:** the farmer from the character sheet.
  - **Right:** an engineer, younger, in a plain shirt with the sleeves rolled up, with an ID card on a lanyard and a phone in the other hand.
  - The engineer's hand rests on the farmer's shoulder.
- **Moves:**
  - `scroll`: the engineer's arm lifts and the hand settles on the farmer's shoulder.
  - Then the idle loop (6 s):
    - both of them breathe
    - the farmer's towel end lifts in the wind
    - the farmer turns his head a little towards the engineer and smiles, then looks back out
    - the lanyard sways
- **Still pose:** the hand on the shoulder, both looking out.
- **Watch:** this is the heart of the story, so take the most care with the faces and the hand.

**H4.2 Two glasses of tea** · Rive · `tea` · about 300 × 400
- **Looks:** two small glass tumblers of milky tea on a flat stone on the bund.
- **Moves (4 s loop):** thin wisps of steam rise and curl.

**H4.3 Notebook** · Still · `notebook` · about 600 × 450
- **Looks:** an open notebook with a pencil sketch of the field's layout: plot lines, rows and a few arrows, but no words. A pencil lies across it.

### 5. What grows: `home-5-grows.riv`

**H5.1 Lettuce** · Rive · `lettuce` · about 600 × 500
- **Looks:** a whole, fresh head of lettuce with ruffled leaves, pale in the middle and greener outside. Use leaf greens, not lime.
- **Moves (4 s loop):** the outer leaves ruffle, as if in a breeze.

**H5.2 Kale** · Rive · `kale` · about 500 × 700
- **Looks:** a bunch of curly kale tied at the stems, deep blue-green, with tightly curled edges.
- **Moves (4 s loop):** the leaf tips flutter.

**H5.3 Cucumbers** · Still · `cucumbers` · about 600 × 350
- **Looks:** two whole cucumbers crossed, with a few round slices beside them showing the pale flesh and seeds.

**H5.4 Harvest crate** · Still · `crate-back`, `crate-front` · about 800 × 450 each
- **Looks:** a slatted wooden harvest crate, drawn as two layers: the back (inside wall and floor) and the front (the front slats). I put the vegetables between the two layers, so they sit inside the crate.

**H5.5 Seed packet** · Still · `seed-packet` · about 350 × 500
- **Looks:** a paper seed packet with a folded top and a simple drawing of a lettuce. Leave a blank label area; I add the words.

**H5.6 Water drop on a leaf** (optional) · Rive · `leaf-drop` · about 400 × 400
- **Looks:** one big lettuce leaf, close up.
- **Moves (4 s loop):** a drop of water runs down the centre vein and drips off the tip.

### 6. To your plate: `home-6-plate.riv`

**H6.1 Goods auto with crates** · Rive · `rickshaw` · about 900 × 550
- **Looks:** a three-wheeled goods auto, the small cargo rickshaw with an open back. Side view, facing right, stacked with crates of vegetables.
- **Moves:** the wheels turn, the body bounces gently, the top crate wobbles, and there's a small puff of exhaust. I move it across the page as you scroll.
- **Check:** if the produce really travels in a van, draw that instead.

**H6.2 Shop counter** · Still · `shop` · about 1000 × 800
- **Looks:**
  - A small shop front: a wooden counter with baskets of lettuce, kale and cucumbers, a striped clay-coloured awning, and shelves behind.
  - A blank sign board, with no real shop's name or logo. It's a made-up shop.

**H6.3 Plate of salad** · Still · `plate` · about 600 × 600
- **Looks:** a plate seen from directly above, with a fresh salad of lettuce, kale and cucumber slices, and a fork beside it on a cloth napkin.

**H6.4 Dashed route** · Claude
- A dashed line from the field to the shop to the plate, which draws itself as you scroll.

### Built in code (nothing to make)

- The closing tags
- Torn note cards and tape
- Paper grain over the whole page
- The handwritten notes
- The chapter rail
- The shadow under every piece

### How many

| | Rive | Still |
|---|---|---|
| Needed | 14 | 9 |
| Optional | 2 (H1.5, H5.6) | 1 (H1.6) |
| Spread 2, if we keep it | 2 | 1 |

Plus the farmer's character sheet, which is for reference only.

---

## Rive rules (the hand-off between your files and my code)

1. **One file per spread.**
   - Use the file names above, with each moving piece as its own artboard inside.
   - Also keep each file's `.rev` backup, so nothing is lost.
2. **A transparent background, with room to move.** The artboard must hold the whole movement. If the mammoty goes past the top edge of its artboard at the top of the swing, it gets cut off.
3. **One shared scale.**
   - In each file, lay the spread out on a 2400 × 1500 layout artboard. It's for reference only.
   - Make each piece's artboard the size the piece has in that layout. That keeps line widths and cut edges matching across pieces.
   - Send me a screenshot of the layout. I'll match it on the page and rearrange it for phones.
4. **One state machine per artboard, named `Bhoomi Motion`.** (The first set of pieces used this name, so we keep it.)
   - Its idle loop starts by itself and loops without a jump.
   - Living things loop over 3–8 s. Propellers and blinking lights can be quicker.
5. **Controls, through data binding.** Give each piece a view model called `Motion Controls`, with only the controls it needs:

   | Name | Type | Meaning |
   |---|---|---|
   | `scrollProgress` | Number, 0–100 | 0 when its spread comes in from the right. 100 when the spread is centred and the moment has fully happened. |
   | `driveProgress` | Number, 0–100 | For the goods auto only: how far it has driven across its frame |
   | `activate` | Trigger | The piece was clicked, tapped, or chosen with the keyboard |

   - Rive now recommends data binding over the older state machine inputs. If you use inputs instead, keep the same names and tell me.
   - The page also sends `activate` from a labelled button, so keyboard users get the same moment.
6. **The first frame is the still.**
   - Some visitors see a single frame: when motion is reduced, when the phone is slow, or while the file is loading. Make the first frame of the idle loop a good pose.
   - For scroll pieces, the still is the pose at `scrollProgress` = 100.
7. **No words inside Rive.** All text sits on the page, so screen readers and search engines can read it, and it can be translated into Hindi and Malayalam later.
8. **A cut-paper edge on every piece.**
   - A cream (`#f2eee3`) border, about 8 px wide at the 2400 scale, following the shape.
   - Draw it in Rive, so it moves with the piece.
   - No shadows: I add those, so they match.
9. **Keep files light.**
   - Shapes, strokes, flat fills, simple gradients, bones and meshes are all fine.
   - No photos inside Rive.
   - Ask me before using feathering or blur, Rive text, layouts, audio or scripting, because they may need a heavier player on the site.
   - Aim for 200 KB or less per file.
   - Keep to about 5 moving pieces per spread at most, so phones stay smooth.
10. **Plan:**
    - Files exported on Rive's free plan play a Rive splash screen. That's fine while we build and test.
    - For the live site, take a paid plan (Cadet or higher) for one month once the final pieces are ready, and re-export every file from the Rive editor.
    - Rive says exported files keep working whatever plan you're on later, so you can cancel afterwards.
    - Re-exporting needs the original Rive files, because the editor can't open a `.riv`. So keep the `.rev` backups.

---

## Style guide (so everything looks like one scrapbook)

- **Look:** cut-paper collage. Flat shapes of colour with one shade tone, as if cut from coloured paper. I add the paper grain in code.
- **Colours:** the brand palette below, plus natural skin tones and real clothing colours.

  | Name | Hex | Use |
  |---|---|---|
  | Soil | `#101610` | Darkest shadows and lines |
  | Loam | `#2b2219`, `#4a3a2a` | Earth and soil |
  | Moss | `#294a20` | Deep leaves |
  | Fern | `#3a6b22` | Leaves |
  | Leaf | `#629e36` | Fresh green |
  | Lime | `#b8ed79` | Technology: scan beams, signals, screens |
  | Husk | `#f2eee3` | Cut edges and paper |
  | Sun | `#f2b544` | The sun and warm light |
  | Water | `#7cc8d8` | Water and sky |
  | Clay | `#d1683a` | Warnings and red soil |

- **Lime means technology.** Keep lime for scan beams, sensor lights and screens, so visitors learn that the lime part is the tech.
- **People:**
  - Real proportions, calm and dignified. Simple faces are fine.
  - No cartoon faces and no exaggeration.
  - Don't trace a real person's photo without their consent.
  - No photo-real AI images.
- **Light** comes from the upper left on every piece.
- **Movement:**
  - Slow and weighty, like breathing, wind and work. Ease in and out.
  - Nothing bouncy, except the drone and the rickshaw.
- **Place details:** mundu, thorthu, egrets in the paddy, coconut palms, the auto-rickshaw. Use them where they're true to where the farm and its farmers are.

Drawings are fine here, because they're plainly drawings: nobody will take them for photos of our real farmers. The rule in `05` still holds for anything photographic: it must be real.

---

## How to make a piece (suggested)

1. **Agree the look first.**
   - GPT can make a few style frames and reference sketches. Name them `ai-…`.
   - They're for reference only and never go on the site.
2. **Draw the piece as vectors.**
   - Use Rive itself, or Figma or Illustrator.
   - Put every moving part on its own layer. For the farmer, that's the upper arm, forearm, hands, mammoty, head and towel end.
   - If you drew it outside Rive, import the SVG into Rive.
3. **Rig and animate.**
   - Rig the piece with bones.
   - Animate the idle loop.
   - Set up `main` and the controls.
4. **Deliver.** Export the `.riv` and the `.rev` backup into `B:\bhoomi tech website\assets-inbox\home-rive\`.

## What Claude builds around the pieces

- The sideways scroll, the layered drift and the chapter rail
- The layout on laptops and phones
- Loading each spread's file only as you approach it, and pausing pieces that are off screen
- Sending `scrollProgress`, `driveProgress` and `activate` to Rive
- The words, notes, tape and torn cards
- A still image of each piece, made from your files, for slow phones and reduced motion
- Keyboard access, and a plain reading version when motion is reduced

## Order of work, part by part

| Part | Rohit makes | Claude builds |
|---|---|---|
| 1. Style test | The farmer's character sheet, then H1.1, the farmer with the mammoty, and nothing else. Once he looks right, he sets the style for every other piece. | The scroll engine and spread 1's layout around him, with placeholders for the rest |
| 2. The opening | The rest of the cover and spread 1 | The cover and spread 1, finished on desktop and phone |
| 3. The heart | Spreads 3 and 4 (the drone, and the engineer with the farmer) | Spreads 3 and 4 |
| 4. The ending | Spreads 5 and 6 | Spreads 5 and 6, and the closing tags |
| 5. If kept | Spread 2 | Spread 2 |

## Open questions for Rohit

1. Do we keep spread 2, the hard parts?
2. Where is the farm, and where are the farmers Bhoomi Tech works with? That decides the place details (mundu, egrets, palms).
3. Which tools does Bhoomi Tech really use or offer: drones, soil sensors, the app, polyhouses, drip lines? Spread 3 shows only the real ones.
4. How is the produce grown (master plan Q5)? That decides whether spread 5 shows a polyhouse.
5. When will you take one month of a paid Rive plan to do the final, splash-free export? Rule 10 has the details.
