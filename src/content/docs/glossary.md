---
title: Glossary
description: Definitions for technical terms and jargon you'll encounter while building your keyboard.
order: 2
---

New to keyboards or electronics? This page breaks down the terms you'll run into throughout the docs.

## Electronics & PCB

<details>
<summary><strong>BOM (Bill of Materials)</strong></summary>

A complete list of every part and component you need to buy to build your keyboard: quantities, part numbers, and where to get them.

</details>

<details>
<summary><strong>PCB (Printed Circuit Board)</strong></summary>

The main board that holds all the electronic components and switches. It's what you design in KiCAD. The copper traces on it act as the wires connecting everything together.

</details>

<details>
<summary><strong>Schematic</strong></summary>

A diagram showing how all the electrical components connect to each other. Think of it as the blueprint before you lay things out on the actual board.

</details>

<details>
<summary><strong>Footprint</strong></summary>

The physical shape and pad layout of a component on the PCB, specifically the spots where solder goes. Every component has both a schematic symbol (how it looks in the diagram) and a footprint (where it physically sits on the board).

</details>

<details>
<summary><strong>Diode (1N4148)</strong></summary>

A small electronic component that only lets current flow one direction. Keyboards use one diode per switch to prevent "ghosting" are proccess where pressing multiple keys at once accidentally triggers extra keypresses.

</details>

<details>
<summary><strong>Keyboard Matrix</strong></summary>

A wiring pattern that connects many switches using fewer wires than if each switch had its own dedicated wire. Switches are arranged in rows and columns; pressing a key completes the circuit at that row/column intersection.

</details>

<details>
<summary><strong>GPIO (General Purpose Input/Output)</strong></summary>

The physical pins on the Raspberry Pi Pico that you connect things to. The Pico has 29 of them, and they're how the microcontroller talks to your switches, LEDs, and other components.

</details>

<details>
<summary><strong>Net Label</strong></summary>

A label in KiCAD that electrically connects wires that aren't physically drawn touching each other in the schematic. Two wires with the same net label are treated as connected.

</details>

<details>
<summary><strong>Through-hole</strong></summary>

A type of electronic component where the legs (leads) go all the way through the PCB and are soldered on the back. Easier to hand-solder than surface-mount parts. most beginner-friendly keyboards use through-hole components.

</details>

<details>
<summary><strong>GND Fill (Ground Fill)</strong></summary>

A solid area of copper on the PCB that's connected to ground (the electrical reference point). It fills empty space on the board, which helps with signal quality.

</details>

<details>
<summary><strong>USB-C</strong></summary>

The small oval connector used to plug your keyboard into a computer. The Pico has a built-in USB-C port that handles both power and data.

</details>

---

## PCB Layers

<details>
<summary><strong>F.Cu / B.Cu</strong></summary>

Front Copper and Back Copper. The two sides of the PCB where electrical traces are routed. Using both sides gives you more room to route wires without them crossing.

</details>

<details>
<summary><strong>Silkscreen (F.Silkscreen / B.Silkscreen)</strong></summary>

Text and graphics printed on the PCB surface. Used to label components, mark orientation, and add visual design. Doesn't affect the electronics at all.

</details>

<details>
<summary><strong>Solder Mask (F.Mask / B.Mask)</strong></summary>

A protective coating over the copper traces that prevents accidental shorts. The classic green color you see on most PCBs is the solder mask. Holes in the mask are where you solder.

</details>

<details>
<summary><strong>Edge.Cuts</strong></summary>

The KiCAD layer that defines the outer outline of your PCB: where the manufacturer cuts the board to shape.

</details>

<details>
<summary><strong>Gerber Files</strong></summary>

The set of files (.gbr, .drl) you export from KiCAD to send to a PCB manufacturer. Each file represents one layer of the board (copper, silkscreen, solder mask, drill holes, etc.).

</details>

---

## Software & Tools

<details>
<summary><strong>KiCAD</strong></summary>

Free, open-source software for designing schematics and PCB layouts. You'll use it to design the entire circuit board for your keyboard.

</details>

<details>
<summary><strong>marbastlib</strong></summary>

A KiCAD library that contains pre-made symbols and footprints for common keyboard components (switches, encoders, etc.) so you don't have to create them from scratch.

</details>

<details>
<summary><strong>Onshape</strong></summary>

A free, browser-based CAD program used to design the 3D model of your keyboard case. No installation required.

</details>

<details>
<summary><strong>CAD (Computer-Aided Design)</strong></summary>

Software for creating 2D or 3D models of physical objects. Onshape is the CAD tool used for designing the keyboard case.

</details>

<details>
<summary><strong>Firmware</strong></summary>

The software that runs on your Pico and defines how your keyboard behaves: which key does what, how LEDs work, etc. You write it once and flash it to the Pico.

</details>

<details>
<summary><strong>RMK</strong></summary>

A beginner-friendly firmware framework for custom keyboards. It handles the low-level Pico communication so you mostly just configure a keymap.

</details>

<details>
<summary><strong>Flash (Flashing)</strong></summary>

The process of uploading compiled firmware code onto your Pico. You typically do this by holding the BOOTSEL button, plugging in USB, then dragging the firmware file onto the Pico like a USB drive.

</details>

<details>
<summary><strong>SnapEDA</strong></summary>

A website where you can search for and download schematic symbols and PCB footprints for components that aren't included in KiCAD's default libraries.

</details>

<details>
<summary><strong>GrabCAD</strong></summary>

A website where you can find and download 3D models of components (like the Pico or a switch) to import into your PCB or case design.

</details>

---

## Hardware & Keyboard Parts

<details>
<summary><strong>Raspberry Pi Pico</strong></summary>

The small microcontroller (the "brain") at the center of your keyboard. It reads which keys are pressed and sends that information to your computer over USB.

</details>

<details>
<summary><strong>Switch (Mechanical Switch)</strong></summary>

The mechanical component under each keycap that you physically press. Each keypress pushes the switch down, closing an electrical circuit that the Pico detects.

</details>

<details>
<summary><strong>Keycap</strong></summary>

The plastic cap you put on top of each switch. It's the part your fingers actually touch. Keycaps come in many colors, materials, and profiles.

</details>

<details>
<summary><strong>Stabilizer (Stab)</strong></summary>

A mechanical part that keeps wider keys (like spacebar or backspace) from wobbling when pressed. Any key 2 units wide or larger needs one.

</details>

<details>
<summary><strong>2u</strong></summary>

Short for "2 units", meaning a key that's twice as wide as a standard key. The spacebar, backspace, and shift keys on a 60% layout are typically 2u or larger.

</details>

<details>
<summary><strong>MX-Style</strong></summary>

Refers to the Cherry MX switch standard, the most common switch form factor. Most aftermarket switches, keycaps, and plates are designed around this standard.

</details>

<details>
<summary><strong>Linear Switch</strong></summary>

A switch type with a smooth, consistent feel from top to bottom with no bump or click. Popular for gaming and fast typing.

</details>

<details>
<summary><strong>Tactile Switch</strong></summary>

A switch type with a subtle physical bump partway through the press that gives you feedback that the key registered. Quiet, but noticeable.

</details>

<details>
<summary><strong>Clicky Switch</strong></summary>

A switch type with both a tactile bump and an audible click sound. Satisfying but loud, so not ideal in shared spaces.

</details>

<details>
<summary><strong>Rotary Encoder (EC11)</strong></summary>

An optional dial-shaped component you can add to your keyboard. Turning it can control things like volume or scrolling. EC11 is a common model number for this type.

</details>

<details>
<summary><strong>OLED</strong></summary>

A small display screen (Organic Light-Emitting Diode) that can be added to your keyboard to show information like the current layer or a logo.

</details>

<details>
<summary><strong>RGB LED (SK6812 MINI-E)</strong></summary>

Small color-changing lights that can be added under or around keys for backlighting. SK6812 MINI-E is the specific addressable LED model commonly used, and each one can be set to any color independently.

</details>

<details>
<summary><strong>Heatset Insert</strong></summary>

A small threaded metal sleeve that you press into 3D-printed plastic using a soldering iron. Once set, it gives you a durable metal thread so screws don't strip the plastic.

</details>

<details>
<summary><strong>Case</strong></summary>

The outer shell that houses the PCB, switches, and plate. Designed in Onshape and usually 3D printed.

</details>

<details>
<summary><strong>Plate</strong></summary>

A layer between the case and the PCB that the switches clip into. It adds rigidity and affects the feel of your keystrokes.

</details>

<details>
<summary><strong>Tray Mount</strong></summary>

A keyboard assembly style where the PCB sits inside a tray-shaped bottom case. One of several mounting styles that affects typing feel and sound.

</details>

---

## Layout Terms

<details>
<summary><strong>60% Keyboard</strong></summary>

A keyboard with roughly 60% of the keys of a standard full-sized keyboard, typically 61 to 68 keys. No numpad, no function row, no arrow cluster. Compact and popular for custom builds.

</details>

<details>
<summary><strong>Ortholinear</strong></summary>

A keyboard layout where all keys are arranged in a perfectly straight grid, with rows and columns lining up exactly. Different from the slightly staggered layout of a standard keyboard.

</details>

<details>
<summary><strong>Keymap</strong></summary>

The configuration of what each key does. Your keymap tells the firmware "when key at row 0, column 3 is pressed, send the letter 'E' to the computer."

</details>

---

## GitHub & Documentation

<details>
<summary><strong>Repository (Repo)</strong></summary>

A folder on GitHub that contains all your project files, including code, design files, photos, and documentation. Your entire keyboard project lives in one repo.

</details>

<details>
<summary><strong>README</strong></summary>

The main documentation file (README.md) in your repo. It's what people see first when they visit your project page on GitHub.

</details>

<details>
<summary><strong>Markdown</strong></summary>

A simple plain-text format for writing formatted content. Files ending in `.md` use markdown. For example, two asterisks around text **makes it bold**, and a `#` starts a heading.

</details>

<details>
<summary><strong>Public Repository</strong></summary>

A GitHub repo that anyone on the internet can view. Your Keeb submission must be in a public repo so it can be reviewed.

</details>
