# Keeb

In this guide, we will guide you through how to make a keyboard from scratch! Then you will get a kit to assemble it.
You may think, "I can't do it." Don't worry, we will help you. If you have any questions, ask in #keeb.

This guide will be quite different from the regular HC guide. I will try to show you the right road to go down, but not walk it for you. I will link a bunch of good resources along the way. Google will be your best friend if you don't understand something.

We'll be assuming basic knowledge of KiCAD and Fusion. [Here](https://youtu.be/3FGNw28xBr0) is a 13-minute video to get you started with KiCAD, and [here](https://youtu.be/p0eBy7Z5VH8) is a 9-minute tutorial for Fusion.

Hack Club also offers other valuable resources, such as this [one](https://hackpad.hackclub.com/resources).

Fusion is free for hobbyists, and for students, they offer [something similar](https://www.autodesk.com/education/edu-software/fusion) to the GitHub Education Pack.

## Steps of making a keyboard

This is the TL;DR of this guide.

### 1. Making a sketch of what you want to make

This could be on paper or in a 3D modeling software. The point is that you know what you want to make, and you can change this along the way.

### 2. Making the PCB

1. Setting up the PCB design tool (installing KiCAD, libraries, etc.)
2. Designing your schematic
3. Assigning footprints
4. Designing your PCB

### 3. Designing your case

1. Setting up the CAD program
2. Importing the 3D model of your PCB
3. Actually designing your case

### 4. Writing the firmware

1. Set up your environment
2. Building your first firmware
3. Flashing firmware

## 1. Making a sketch of what you want to make

The point of this step is for you to have a vision of what you want to make, so you can easily execute on your idea. Sketch up what the layout of the switches should be, where the Raspberry Pi Pico should go, etc. Make it a weird shape, or add a cool feature, or silkscreen!

## 2. Making the PCB

Probably this will take up most of your time 💀

### 1. Setting up the PCB design tool

In this guide, we'll be using KiCAD. Just grab the latest version from their website.

You should also install [marbastlib](https://github.com/ebastler/marbastlib), which is a library that allows you to use common keyboard-related components on your PCB.

### 2. Designing your schematic

The first step is to place the symbols that will be used. This is probably `RaspberryPi_Pico`, `SW_Push`, `MX_stab`, and `1N4148` (you will see where this comes in).

![the above mentioned components](https://cdn.hackclub.com/019d5a05-bb5a-78df-9991-555673b3b395/image.png)

***Do you take the red or the blue pill?***

Since a full-sized keyboard has 104 keys, and our Pico only has 29 GPIO pins, we need to use a keyboard matrix, which allows us to use only one pin per row and one pin per column instead of one per switch.

For us to make a matrix, we need to use diodes (we placed them down earlier, the `1N4148`).

I will not go through how a matrix exactly works, but [here](https://www.dribin.org/dave/keyboard/one_html/) is a really good explanation.

The basic thing is that you need to connect a diode in series to your switch:

![](https://blueprint.hackclub.com/old-cdn/33681c7410a242de5ab273f34b54981f62390f1e_image.webp)

Then, with these *units*, you need to replicate the layout of your keyboard from your sketch. For example, I replicated the layout of [this](https://www.reddit.com/r/olkb/comments/1lbyer9/ortholinear_no_numpadtkl_keyboard/) keyboard I found on Reddit.

![](https://cdn.hackclub.com/019d5a20-1615-7758-a98a-e6e13774825d/image.png)

![](https://cdn.hackclub.com/019d5a20-13c5-794d-891f-65e7dc9524c6/image.png)

Then you should connect all of the rows and columns to the Pico. I used labels for this:

![](https://cdn.hackclub.com/019d5a2f-7776-72b7-b1be-2a70b4d8385e/image.png)

Now we need to add the stabilizers. Continuing the previously shown schematic, I only need to use three 2u stabilizers, because you only need to use stabilizers if the keycap is equal to or larger than 2u.

![](https://cdn.hackclub.com/019d5a37-3a12-7eb0-a1f1-432d97299137/image.png)

We also should add some mounting holes if we want to go with a tray mount style keyboard. There are a bunch of mount types you can use, and each one gives a different feel:

![](https://cdn.hackclub.com/019d5a3e-353c-7eb9-ad7a-745c287e6495/image.png)

As a final step, you should annotate your schematic:

![](https://cdn.hackclub.com/019d5a64-00ca-7a8b-a6c2-54472a8aec7f/image.png)
![](https://cdn.hackclub.com/019d5a64-0303-73ac-9eae-925b731c66ff/image.png)

### 3. Assigning footprints

Now that you are done with your schematic, you need to assign footprints to your symbols. Use the `Assign Footprints` icon.

![](https://cdn.hackclub.com/019d5a45-5db7-7166-a353-789bad1b1e10/image.png)

For the Pico, use the `Module:RaspberryPi_Pico_Common_THT` footprint.

Select all the diodes and assign them `Diode_THT:D_DO-35_SOD27_P7.62mm_Horizontal` footprints.

Then select all the switches and assign them `PCM_marbastlib-mx:SW_MX_1u` footprints.

For the stabilizers, use the `PCM_marbastlib-mx:STAB_MX` footprints.

### 4. Designing your PCB

When you import your schematic into your PCB, it should look something like this:

![](https://cdn.hackclub.com/019d5a51-fc10-78d8-a0c8-679a562127c9/image.png)

Now we only need to arrange our parts. I will share some tips that will make your life a bit easier.

You should use a grid spacing of `0.79375mm`; this way everything should just snap in the right place:

![](https://cdn.hackclub.com/019d5a57-81bc-7464-b614-c262c1343e1c/image.png)

Use the `Geographical reannotate` feature, which allows you to copy and paste footprints, and then annotate them afterwards so they line up with the schematic:

![](https://cdn.hackclub.com/019d5a64-04f1-7779-ac1d-7bf698897aff/image.png)

Your PCB should look something like this after it's all laid out:

![](https://cdn.hackclub.com/019d5a6c-46d4-70c7-98e4-12d7ad983377/image.png)

For routing, you should use one layer for horizontal lines and one for vertical lines. This makes it a lot easier to route. This is not a strict rule, but you should follow it.

![image](https://user-cdn.hackclub-assets.com/019d5f80-cb8f-7832-bc27-c838d27bac42/paste-1775423770762.png)

The USB port of the Pico should also hang off the PCB a little. This will make it easier to connect a USB cable:

![image](https://user-cdn.hackclub-assets.com/019d6389-830e-7423-b611-df54d0ae55e3/paste-1775491449889.png)

And it should look like this after you route it. I added a GND fill, but that's optional:

![image](https://user-cdn.hackclub-assets.com/019d638a-2280-7df0-8a56-f0db0d094496/paste-1775491491043.png)

After you add all the 3D models, it should look something like this:

![image](https://user-cdn.hackclub-assets.com/019d639b-9fe6-7c10-92d5-241a3d449c47/paste-1775492637208.png)

## 3. Designing your case

You should create a new `Hybrid Design`:

![image](https://user-cdn.hackclub-assets.com/019d63ab-a394-7ad3-a642-e9470da2062d/paste-1775493687083.png)

You should also export your PCB as a STEP file, so you can upload it into Fusion and easily model around it:

![image](https://user-cdn.hackclub-assets.com/019d63ae-3095-7258-85ee-b41e8f08eb82/paste-1775493854642.png)

You can simply drag the PCB model into your hybrid design.

Because we exported as a STEP file, we can reference the edges of the PCB in sketches, which makes your life a whole lot easier.

![image](https://user-cdn.hackclub-assets.com/019d63b7-46fe-7b99-bbbc-9fca1605614d/paste-1775494449388.png)

![image](https://cdn.hackclub.com/019d680d-757c-7ed4-ad8d-136e079e99ce/paste-1775567206894.png)

You should use threaded inserts and screws to hold your case together.

Our end result should look something like this:

![image](https://cdn.hackclub.com/019d8883-00c6-7e53-b28f-4b0e7caefc26/paste-1776111779191.png)

But now you may wonder: how is this going to fit on a 3D printer's build plate? Isn't it too big? You're right, and we can solve this in the slicer. This works in PrusaSlicer and all other slicers that were forked from PrusaSlicer.

You need to start a cut action and position the cut plane where you want to cut your part in half:

![image](https://cdn.hackclub.com/019d888a-c9db-73b7-8d45-568cf5615a45/paste-1776112289552.png)

Then add connectors and choose the dowel option:

![image](https://cdn.hackclub.com/019d888b-07af-79be-a2ee-194fe02c867e/paste-1776112305298.png)

And perform the cut:

![image](https://cdn.hackclub.com/019d8890-a0cf-7827-b1d0-afa0f97786d2/paste-1776112672062.png)

## 4. Writing the firmware

This guide will not cover how you should write your firmware. There are a bunch of other resources that cover this topic really well. I recommend that you use QMK, since it has a lot of cool features. [Here](https://docs.qmk.fm/newbs) is a tutorial for it.