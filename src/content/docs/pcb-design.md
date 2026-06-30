---
title: Designing the PCB
description: Step-by-step guide to designing your keyboard PCB in KiCAD.
order: 5
---

Probably this will take up most of your time.

## Keyboard Parts

Before you start placing components in KiCAD, it helps to know what everything actually is and how it fits together physically.

### Switches

Switches are the mechanical components under each key, the part you actually press. When you press a key, the switch closes an electrical circuit that the Pico detects.

There are three main types:

- **Linear**: smooth and consistent from top to bottom, no bump or click. Popular for gaming.
- **Tactile**: a subtle bump partway through the press gives you feedback that the key registered. Quiet but noticeable.
- **Clicky**: has both a tactile bump and an audible click. Satisfying, but loud.

This project uses **MX-style switches**, which is the most common standard. Almost all aftermarket switches, keycaps, and plates are compatible with it.

### Keycaps

Keycaps are the plastic caps that sit on top of each switch, the part your fingers touch. They pull off and snap back on, so they're easy to swap.

Keycaps come in many profiles (the shape and height), but for this project **DSA keycaps** are a good choice because every key is the same height, which means one set fits any layout without worrying about rows.

### Stabilizers

Wider keys (2u and above, like spacebar, backspace, left shift, and enter) would wobble if held only by their switch. **Stabilizers** are mechanical brackets that clip onto the PCB and keep both ends of the key moving evenly.

You only need stabilizers for keys that are **2u or wider**. Anything smaller uses just the switch.

### The Raspberry Pi Pico

The **Pico** is the microcontroller, the "brain" of the keyboard. It reads the switch matrix, figures out which key was pressed, and sends that keypress to your computer over USB.

The Pico solders directly onto your PCB through-hole. Its USB-C port will hang off the edge of the board slightly so you can plug a cable in.

It has **29 GPIO pins**, which is why we use a matrix. A 60% keyboard has far more keys than available pins.

### Diodes (1N4148)

Each switch has a **1N4148 diode** wired in series with it. Diodes only let current flow one way, which prevents "ghosting", a problem where pressing multiple keys at once confuses the matrix and registers phantom keypresses.

These are through-hole components (legs go through the PCB) and are straightforward to solder.

### Optional Add-ons

If you want to go further, these parts can be added to your PCB:

| Part | What it does |
|---|---|
| **RGB LEDs** (SK6812 MINI-E) | Individually addressable color lighting under each key |
| **Rotary encoder** (EC11) | A dial you can turn, useful for volume, scrolling, etc. |
| **OLED screen** | A small display showing things like current layer or a logo |
| **Buzzer** | Audio feedback on keypresses |

These are all optional. You can keep it simple and just build a clean typing keyboard.

---

## Setting Up KiCAD

Download and install the latest version of KiCAD from [kicad.org](https://www.kicad.org/).

### Installing marbastlib

marbastlib is a KiCAD library with pre-made symbols and footprints for keyboard components. Without it, you won't have access to the switch, stabilizer, or LED parts you need.

[Marbastlib](https://github.com/ebastler/marbastlib)

1. Open KiCAD and go to **Plugin and Content Manager** in the main window.
2. Click **Manage** next to Repositories, then hit the **+** button.
3. Paste this URL into the field: `https://raw.githubusercontent.com/ebastler/ebastler-KiCad-repository/main/repository.json`

![KiCAD plugin manager repository screen](https://cdn.hackclub.com/019ea7dc-7ca1-71d0-bf87-ffbbb29ef360/kicadlibrary.png)

4. Switch to the **ebastler KiCAD Repository** tab, find the marbastlib library, and click **Install**.
5. Click **Apply Pending Changes**, then close and fully reopen KiCAD for the libraries to load.

---

## Creating a New Project

1. In the KiCAD main window, go to **File → New Project**.
2. Choose a folder and give your project a name (e.g. `my-keeb`).
3. KiCAD creates two main files: a `.kicad_sch` (schematic) and a `.kicad_pcb` (board layout). You'll work in both.

---

## Designing Your Schematic

The schematic is where you define all the electrical connections. Think of it as the wiring diagram before you worry about physical placement.

### Opening the Schematic Editor

From the KiCAD project window, click the **Schematic Editor** button (the icon that looks like a circuit diagram), or double-click your `.kicad_sch` file.

### Adding Symbols (Bringing In Parts)

1. Press **A** (or go to **Place → Add Symbol**) to open the symbol chooser.
2. In the search bar, type the part you want:
   - `RaspberryPi_Pico` for the Pico microcontroller
   - `SW_Push` for a key switch
   - `MX_stab` for a stabilizer (from marbastlib)
   - `1N4148` for a diode
3. Select the symbol and click **OK**. It will attach to your cursor. Click to place it on the schematic.
4. Press **Escape** when you're done placing.

![the above mentioned components](https://cdn.hackclub.com/019d5a05-bb5a-78df-9991-555673b3b395/image.png)

### Understanding the Keyboard Matrix

A full 60% keyboard has around 61 keys, but the Pico only has 29 GPIO pins, which is not enough for one wire per switch. The solution is a **keyboard matrix**.

In a matrix, switches are arranged in rows and columns. You only need one pin per row and one pin per column. A 6-row × 11-column matrix can handle 66 keys using just 17 pins.

To make the matrix work correctly, each switch needs a **diode** wired in series with it. Without diodes, pressing multiple keys at once causes "ghosting", phantom keypresses that shouldn't be there.

For a deeper explanation of how matrices work, see [this guide](https://www.dribin.org/dave/keyboard/one_html/).

### Wiring a Switch-Diode Unit

Each key is a pair: one switch and one diode. Wire them like this:

1. Place a `SW_Push` symbol and a `1N4148` diode next to each other.
2. Connect one leg of the diode to one pin of the switch using the **Wire** tool (press **W**).
3. The other leg of the diode connects to the row line. The other switch pin connects to the column line.

![](https://blueprint.hackclub.com/old-cdn/33681c7410a242de5ab273f34b54981f62390f1e_image.webp)

### Replicating Your Layout

Replicate the switch-diode unit for every key in your layout. Arrange them to match the physical layout of your keyboard from your sketch, with rows going left to right and columns going top to bottom.

![](https://cdn.hackclub.com/019d5a20-1615-7758-a98a-e6e13774825d/image.png)

![](https://cdn.hackclub.com/019d5a20-13c5-794d-891f-65e7dc9524c6/image.png)

### Using Net Labels

Instead of drawing a wire all the way from each row/column to the Pico (which would make the schematic unreadable), use **Net Labels**:

1. Press **L** (or go to **Place → Net Label**) to add a label.
2. Name your rows `ROW0`, `ROW1`, `ROW2`, etc. and your columns `COL0`, `COL1`, etc.
3. Attach matching labels to the corresponding pins on the Pico.

KiCAD treats any two wires with the same label as electrically connected, even if they aren't physically drawn touching. The small green dots you see are junctions that confirm two wires are connected. If wires cross without a dot, they are not connected.

![](https://cdn.hackclub.com/019d5a2f-7776-72b7-b1be-2a70b4d8385e/image.png)

### Adding Stabilizers

Stabilizers need to be placed in the schematic too so they get footprints on the PCB.

Only add a stabilizer for each key that is **2u or wider** (spacebar, backspace, left shift, enter). For a standard 60% layout, that's usually 3-4 stabilizers.

1. Press **A** and search for `MX_stab`.
2. Place one for each wide key in your layout.

![](https://cdn.hackclub.com/019d5a37-3a12-7eb0-a1f1-432d97299137/image.png)

### Adding Mounting Holes

If you're building a tray-mount case, add mounting holes to your schematic so they appear on the PCB.

1. Press **A** and search for `MountingHole`.
2. Place 4–6 holes around the edges and corners of where your board will be.

There are several mount styles, and each one changes the typing feel of the finished keyboard:

![](https://cdn.hackclub.com/019d5a3e-353c-7eb9-ad7a-745c287e6495/image.png)

### Annotating Your Schematic

Before you can move to the PCB layout, every component needs a unique reference designator (like `SW1`, `D1`, `U1`). This is called annotation.

1. Go to **Tools → Annotate Schematic**.
2. Leave the default settings and click **Annotate**.

KiCAD will automatically number all your components.

![](https://cdn.hackclub.com/019d5a64-00ca-7a8b-a6c2-54472a8aec7f/image.png)
![](https://cdn.hackclub.com/019d5a64-0303-73ac-9eae-925b731c66ff/image.png)

---

## Assigning Footprints

A footprint tells KiCAD the physical size and pad layout for each component on the PCB. Every symbol in your schematic needs one.

1. Go to **Tools → Assign Footprints** (or click the footprint icon in the toolbar).

![](https://cdn.hackclub.com/019d5a45-5db7-7166-a353-789bad1b1e10/image.png)

2. The left panel lists your component types. The right panel shows available footprints. The center panel shows your components.

### Assigning the Pico

1. Click `RaspberryPi_Pico` in the left panel.
2. In the search bar on the right, type `RaspberryPi_Pico_Common_THT`.
3. Double-click the result to assign it.

### Assigning Diodes

1. Click `D_1N4148` (or whatever your diode symbol is named) in the left panel.
2. Hold **Ctrl** and click every diode in the center panel to select them all at once.
3. Search for `Diode_THT:D_DO-35_SOD27_P7.62mm_Horizontal` on the right.
4. Double-click to assign it to all selected diodes at once.

### Assigning Switches

1. Select all switch symbols (`SW_Push`) in the center panel.
2. Search for `PCM_marbastlib-mx:SW_MX_1u` on the right.
3. Double-click to assign.

### Assigning Stabilizers

1. Select all stabilizer symbols in the center panel.
2. Search for `PCM_marbastlib-mx:STAB_MX` on the right.
3. Double-click to assign.

Click **OK** when all footprints are assigned.

---

## Designing Your PCB Layout

Now you move from the logical schematic to the physical board. Go back to the KiCAD project window and open the **PCB Editor**.

### Importing from the Schematic

1. In the PCB Editor, go to **Tools → Update PCB from Schematic** (or press **F8**).
2. Click **Update PCB**. All your components will appear as a pile in the center of the screen.

It will look messy at first. That's normal.

![](https://cdn.hackclub.com/019d5a51-fc10-78d8-a0c8-679a562127c9/image.png)

### Setting Up the Board Outline

Before placing components, draw the outer edge of your PCB on the `Edge.Cuts` layer.

1. In the right panel, select the `Edge.Cuts` layer.
2. Use the **Draw Rectangle** tool (or **Draw Line** for custom shapes) to draw the outline of your board.
3. A standard 60% keyboard is roughly 285mm × 95mm, but size it to fit your layout.

### Placing Components

Start by placing the Pico, then build out from there.

1. Click and drag components into position. Use **R** to rotate.
2. Place the **Pico** at one edge of the board so its USB-C port hangs slightly off the PCB. This makes it easier to plug in a cable.
3. Place **switches** according to your layout. Use a consistent spacing. MX switches use a 19.05mm grid.
4. Place **stabilizers** directly under their corresponding wide keys.
5. Place **diodes** near their switches, typically just below or above each one.

You can use whatever spacing works for you, just keep it consistent.

![](https://cdn.hackclub.com/019d5a57-81bc-7464-b614-c262c1343e1c/image.png)

### Geographical Reannotation

If you copy-pasted footprints, their reference numbers may be out of order. Use **Geographical Reannotate** to renumber them by their physical position on the board:

1. Go to **Tools → Geographical Reannotate**.
2. Choose your preferred order (left-to-right, top-to-bottom).
3. Click **OK**. The references update to match position, and KiCAD will sync this back to your schematic.

![](https://cdn.hackclub.com/019d5a64-04f1-7779-ac1d-7bf698897aff/image.png)

Your PCB should look something like this after everything is laid out:

![](https://cdn.hackclub.com/019d5a6c-46d4-70c7-98e4-12d7ad983377/image.png)

### Routing Traces

Routing is the process of drawing the copper traces (wires) that connect all the pads together. The thin "ratsnest" lines show you which pads still need to be connected.

1. Press **X** to activate the Route Track tool.
2. Click a pad to start a trace, then click the destination pad to complete the connection.
3. Use the `F.Cu` layer (front copper) for traces going in one direction and `B.Cu` (back copper) for the other direction. This keeps things organized and avoids most crossings.
4. Press **/** to switch between front and back copper mid-trace (this adds a via, a small hole that connects the two layers).

Tips:
- Route the Pico connections first since they touch everything.
- Keep traces as short and direct as possible.
- Avoid sharp 90-degree corners. Use 45-degree angles instead.

![image](https://cdn.hackclub.com/019e944d-5ec4-74ca-b0cd-c3b093f3af74/Full%20wiring.png)
![image](https://cdn.hackclub.com/019e944d-7bd5-7bfc-827b-b783aeb97c14/Pico%20Routing.png)
![image](https://cdn.hackclub.com/019e944d-6f14-7b74-a063-b46dbcdcb443/General%20Red%20Routing.png)

The USB port of the Pico should hang off the PCB edge slightly so a cable can plug in:

![image](https://user-cdn.hackclub-assets.com/019d6389-830e-7423-b611-df54d0ae55e3/paste-1775491449889.png)

### Adding a Ground Fill (Optional)

A ground fill floods any empty copper area on the board with a solid GND connection. It's optional but good practice.

1. Select the `F.Cu` layer.
2. Go to **Place → Add Rule Area** or use the **Add Filled Zone** tool.
3. Draw a rectangle covering your entire board outline.
4. In the dialog, set the net to `GND` and click **OK**.
5. Press **B** to fill all zones.
6. Repeat on `B.Cu`.

The finished board should look something like this:

![image](https://user-cdn.hackclub-assets.com/019d638a-2280-7df0-8a56-f0db0d094496/paste-1775491491043.png)

### Adding 3D Models

You can attach 3D models to footprints to visualize what your board will look like. Many footprints already include a model. For others (like the Pico), download a STEP file from GrabCAD and link it in the footprint properties.

To view your board in 3D, press **Alt+3** or go to **View → 3D Viewer**.

![image](https://user-cdn.hackclub-assets.com/019d639b-9fe6-7c10-92d5-241a3d449c47/paste-1775492637208.png)

### Running the Design Rule Check

Before exporting, run a DRC to catch any mistakes:

1. Go to **Inspect → Design Rules Checker**.
2. Click **Run DRC**.
3. Review any errors. Common ones are unconnected pads (ratsnest lines you missed) or traces that are too close together.
4. Fix all errors before exporting.

### Exporting Gerber Files

Now that the PCB is finished, it's time to get it fabricated. Gerber files are the production files you send to a PCB manufacturer. Save your PCB, then go to **File → Fabrication Outputs → Gerbers (.gbr)** and export everything in that dialog.

If you want a known-good starting point, here are the exact settings to use.

**Include these layers:**

`F.Cu`, `B.Cu`, `F.Paste`, `B.Paste`, `F.Silkscreen`, `B.Silkscreen`, `F.Mask`, `B.Mask`, `Edge.Cuts`

**General options:**

| Option | Setting |
|---|---|
| Plot drawing sheet | off |
| Subtract soldermask from silkscreen | off |
| Indicate DNP on fabrication layers | on, set to **Cross-out** |
| Sketch pads on fabrication layers | off |
| Check zone fills before plotting | on |
| Drill marks | None |
| Scaling | 1:1 |
| Plot mode | Filled |

**Gerber options:**

| Option | Setting |
|---|---|
| Use Protel filename extensions | off |
| Generate Gerber job file | on |
| Use extended X2 format (recommended) | on |
| Include netlist attributes | on |
| Disable aperture macros | off |
| Coordinate format | 4.6, unit mm |

Once your settings match, click **Plot** to generate the Gerbers. Then click **Generate Drill Files** and click **Generate Drill File** to export the `.drl` file.

Finally, zip the entire output folder. That zip is what you send to the manufacturer, and you should commit it to your repo alongside your `bom.csv` and KiCad project files.

---

## Next Steps

Now that your PCB is designed, move on to [Designing the Case](/docs/case-design).
