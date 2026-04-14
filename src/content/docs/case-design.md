---
title: Designing the Case
description: How to design a 3D-printable case for your keyboard in Fusion.
order: 5
---

## Setting Up Fusion

You should create a new `Hybrid Design`:

![image](https://user-cdn.hackclub-assets.com/019d63ab-a394-7ad3-a642-e9470da2062d/paste-1775493687083.png)

## Importing Your PCB

Export your PCB as a STEP file from KiCAD, so you can upload it into Fusion and easily model around it:

![image](https://user-cdn.hackclub-assets.com/019d63ae-3095-7258-85ee-b41e8f08eb82/paste-1775493854642.png)

You can simply drag the PCB model into your hybrid design.

Because we exported as a STEP file, we can reference the edges of the PCB in sketches, which makes your life a whole lot easier.

![image](https://user-cdn.hackclub-assets.com/019d63b7-46fe-7b99-bbbc-9fca1605614d/paste-1775494449388.png)

![image](https://cdn.hackclub.com/019d680d-757c-7ed4-ad8d-136e079e99ce/paste-1775567206894.png)

## Fasteners

You should use threaded inserts and screws to hold your case together.

Our end result should look something like this:

![image](https://cdn.hackclub.com/019d8883-00c6-7e53-b28f-4b0e7caefc26/paste-1776111779191.png)

## Splitting for 3D Printing

But now you may wonder: how is this going to fit on a 3D printer's build plate? Isn't it too big? You're right, and we can solve this in the slicer. This works in PrusaSlicer and all other slicers that were forked from PrusaSlicer.

You need to start a cut action and position the cut plane where you want to cut your part in half:

![image](https://cdn.hackclub.com/019d888a-c9db-73b7-8d45-568cf5615a45/paste-1776112289552.png)

Then add connectors and choose the dowel option:

![image](https://cdn.hackclub.com/019d888b-07af-79be-a2ee-194fe02c867e/paste-1776112305298.png)

And perform the cut:

![image](https://cdn.hackclub.com/019d8890-a0cf-7827-b1d0-afa0f97786d2/paste-1776112672062.png)

## Next Steps

With your case designed, it's time to move on to [Writing Firmware](/docs/firmware).
