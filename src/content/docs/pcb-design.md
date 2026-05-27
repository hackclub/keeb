---
title: Designing the PCB
description: Step-by-step guide to designing your keyboard PCB in KiCAD.
order: 4
---

Probably this will take up most of your time.

## 1. Setting Up KiCAD

Just grab the latest version of KiCAD from their website.

You should also install [marbastlib](https://github.com/ebastler/marbastlib), which is a library that allows you to use common keyboard-related components on your PCB.

## 2. Designing Your Schematic

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

## 3. Assigning Footprints

Now that you are done with your schematic, you need to assign footprints to your symbols. Use the `Assign Footprints` icon.

![](https://cdn.hackclub.com/019d5a45-5db7-7166-a353-789bad1b1e10/image.png)

For the Pico, use the `Module:RaspberryPi_Pico_Common_THT` footprint.

Select all the diodes and assign them `Diode_THT:D_DO-35_SOD27_P7.62mm_Horizontal` footprints.

Then select all the switches and assign them `PCM_marbastlib-mx:SW_MX_1u` footprints.

For the stabilizers, use the `PCM_marbastlib-mx:STAB_MX` footprints.

## 4. Designing Your PCB Layout

When you import your schematic into your PCB, it should look something like this:

![](https://cdn.hackclub.com/019d5a51-fc10-78d8-a0c8-679a562127c9/image.png)

Now we only need to arrange our parts. Here are some tips that will make your life a bit easier.

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

## Next Steps

Now that your PCB is designed, move on to [Designing the Case](/docs/case-design).
