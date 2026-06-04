---
title: Making Your GitHub Repo
description: How to set up your project repository on GitHub.
order: 2
---

## Creating Your Repo

Before you start designing, you need a GitHub repo to document your build process, store your files, and submit your project.

1. Go to [github.com](https://github.com) and sign in (or create an account if you don't have one).
2. Click the **+** in the top right and select **New repository**.
3. Name it something like `my-keeb` or `custom-keyboard`.
4. Set it to **Public** — this is required for submission.
5. Check **Add a README file**.
6. Click **Create repository**.

## What to Put In It

Your repo should document your entire build. As you work through the guide, keep it updated with:

- **README.md** — a writeup of your project: what you built, why, and what you learned
- **PCB files** — your KiCad project (schematics, layout, Gerbers). To export from KiCad:
  1. Open your project in KiCad and launch **PCB Editor**
  2. Go to **File → Fabrication Outputs → Gerbers (.gbr)**
  3. Select all layers (F.Cu, B.Cu, F.Silkscreen, B.Silkscreen, F.Mask, B.Mask, Edge.Cuts) and click **Plot**
  4. Then click **Generate Drill Files** to export the `.drl` file
  5. Zip the output folder and commit it alongside your `.kicad_pcb` and `.kicad_sch` files
- **Case files** — your Onshape exports for the case and plate. To export from Onshape:
  1. In your Onshape document, right-click the part or assembly you want to export
  2. Select **Export**
  3. Choose **STEP** format, set units to **mm**, and click **Export**
  4. Commit the exported files to your repo 
- **Photos** — progress shots and your finished build

## Journaling 

The best way to log hours is journaling! In your repo, add images every 1-4 hours, and describe what you have done for your project!

This is one of the most **important** steps because it allows us to verify that you did your project. 


## Next Steps

Repo ready? Head to [Grants](/docs/kit-contents) to see what parts are available, then move on to [Planning Your Keyboard](/docs/planning).
