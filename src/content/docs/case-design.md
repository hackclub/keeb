---
title: Designing the Case
description: How to design a 3D-printable case for your keyboard in Onshape.
order: 6
---

The case is the outer shell that protects your PCB and gives your keyboard its look and feel. You'll design it in Onshape, a free browser-based CAD tool, and 3D print it.

## Setting Up Onshape

Onshape runs entirely in your browser so there's nothing to install.

1. Go to [onshape.com/education](https://www.onshape.com/en/education/) and create a free Education account.
2. Verify your email and sign in.
3. You'll land on your Onshape home page where all your documents live.

---

## Creating a New Document

1. Click the **Create** button in the top left corner of the home page.

![Onshape Front page](https://cdn.hackclub.com/019e6eda-af2c-7f76-880c-0fccf6bc3f02/onshape.png)

2. Select **Document** from the dropdown.
3. Give it a name, something like `my-keeb-case`.
4. Click **OK**.

![Onshape Create](https://cdn.hackclub.com/019e6ab9-2ecc-77e5-b089-172c567d91d4/OnshapeCreat.htm)

A new document opens with two default tabs at the bottom: a **Part Studio** and an **Assembly**. You'll use both.

---

## Importing Your PCB

Before designing the case, import your PCB into Onshape so you can model the case around its exact shape and dimensions.

### Exporting a STEP file from KiCAD

1. Open your project in the KiCAD **PCB Editor**.
2. Go to **File → Export → STEP**.
3. Leave the default settings and click **Export**.
4. Save the `.step` file somewhere easy to find.

### Importing into Onshape

1. In your Onshape document, click the **+** button in the bottom left corner of the screen.
2. Select **Import**.
3. Choose the `.step` file you just exported from KiCAD.
4. Onshape will process it and add a new tab to your document. It may take a moment.

Once imported, your PCB appears as a 3D model you can view and reference.

![Keeb Main](https://cdn.hackclub.com/019e6abb-e49a-7b38-a30f-e0ac0d157e26/Keebmainpic.png)

---

## Understanding Part Studios vs Assemblies

Onshape has two main workspace types and it's important to know the difference:

- **Assembly**: where you combine multiple parts together and check how they fit. Your imported PCB lives here.
- **Part Studio**: where you actually model and design new parts. You'll build your case here.

You can't model new geometry in an Assembly. You need a Part Studio for that.

---

## Setting Up the Part Studio

To design the case while being able to see and snap to your PCB, you need to bring the PCB's geometry into your Part Studio as a reference.

1. Open the **Assembly** tab that contains your imported PCB.
2. Click the **+** button at the bottom left and select **Create Part Studio in Context**.
3. Click the white origin dot floating in the assembly viewport and press **Enter**.

This creates a new Part Studio that is linked to the Assembly. You can now see your PCB as a transparent reference while you model, and snap directly to its edges and faces.

![Reference](https://cdn.hackclub.com/019e6abd-2afb-7606-947b-4a5efa2d2b60/Referencepic.png)

---

## Designing Your Case

The case needs to do three things: hold the PCB securely, leave the switches accessible from the top, and expose the USB port on the side.

### Step 1: Sketch the Bottom Profile

1. Click **Sketch** in the top toolbar.
2. Select the top face of your PCB (or the front plane if you prefer) as the sketch plane.
3. Use the **Rectangle** tool to draw the outer boundary of your case. Make it 2–4mm larger than the PCB on all sides to leave room for walls.
4. Click **Finish Sketch**.

### Step 2: Extrude the Base

1. Select your sketch and click **Extrude** in the toolbar.
2. Set the depth to around **3–5mm** for the base plate thickness.
3. Extrude downward (away from the PCB) so the PCB will sit on top.
4. Click the green checkmark to confirm.

### Step 3: Add Walls

1. Create a new sketch on the top face of the base you just extruded.
2. Draw a rectangle matching the outer boundary of the case.
3. Draw another rectangle slightly inside it (2–3mm inset) to define wall thickness.
4. Select both rectangles. This creates a hollow profile.
5. Extrude the wall profile upward to the height of your PCB plus a few mm to contain it (usually 10–15mm total height depending on your switch and keycap height).

### Step 4: Cut the Switch Holes

Each switch needs a 14mm × 14mm square hole in the top plate for the switch stem to poke through.

1. Create a new sketch on the top face of your case.
2. Draw a **14mm × 14mm square** centered on where one switch sits. Reference the PCB footprint positions to get accurate locations.
3. Use the **Linear Pattern** tool to duplicate the square across your entire switch grid:
   - Set the X spacing to **19.05mm** (standard MX switch spacing).
   - Set the Y spacing to **19.05mm**.
   - Set the count to match your row and column count.
4. Click **Finish Sketch**, then **Extrude** with **Remove** mode to cut through the top plate.

![Switches](https://cdn.hackclub.com/019e6abe-734b-77e7-86e0-e762896cb175/switchesreferecnec.png)

Here is an example of what the switch hole sketch looks like using the Linear Pattern tool:

![Sketch](https://cdn.hackclub.com/019e6abf-0ff0-7133-944f-034629a60110/onshapesketch.png)

### Step 5: Cut the USB Port Opening

The Pico's USB-C port hangs off the edge of the PCB. You need to cut a slot in the case wall so a cable can reach it.

1. Create a sketch on the side wall where the USB port is.
2. Draw a rectangle roughly **10mm wide × 5mm tall** centered on the USB port location (measure from your PCB if needed).
3. Extrude with **Remove** mode to cut through the wall.

### Step 6: Add Screw Mounts (Optional)

If you want to screw the top and bottom together rather than glue or snap-fit them, add cylindrical bosses for heatset inserts.

1. Create a sketch on the base.
2. Draw small circles (3.5mm diameter for M3 heatset inserts) at each corner and midpoints along the edges.
3. Extrude them upward as cylinders.
4. When you 3D print the case, press M3 heatset inserts into these holes using a soldering iron.

### Step 7: Model the Top Plate (Optional)

If you want a separate top plate that sandwiches the switches, create a second part in the same Part Studio:

1. Create a new sketch on a new plane at switch height.
2. Draw the outer boundary of the plate.
3. Cut the switch holes using the same Linear Pattern method as Step 4.
4. Extrude to 1.5–2mm thickness.

This is optional. Many simple cases skip a separate plate.

---

## Size Limits for 3D Printing

Most consumer 3D printers have a bed size of around 220mm × 220mm. A full 60% keyboard is roughly 285mm wide, which is too wide to print in one piece.

If your case is wider than about 200mm you'll need to split it:

1. Use the **Split** tool in Onshape (under the Part menu) to cut the case into two halves.
2. Add alignment pins or a tongue-and-groove joint along the split edge so the pieces line up when glued.

---

## Exporting for 3D Printing

When your case is ready, export each part as an STL file:

1. Right-click the part in the left panel (the Part Studio feature tree).
2. Select **Export**.
3. Choose **STL** format, set units to **mm**, and resolution to **Fine**.
4. Click **Export** and save the file.

Repeat for each separate part (bottom case, top plate, etc.).

Upload the STL files to your slicer software (like Cura or Bambu Studio), orient the parts flat-side down, and slice for printing.

---

Here is an example of a finished case, simple but functional:

![Finished Case](https://cdn.hackclub.com/019e6ac0-514b-7328-a064-7fe474023357/Keyboard.png)

---

## Next Steps

With your case designed, move on to [Firmware](/docs/firmware) to write the code that makes your keyboard work.
