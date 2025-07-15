# Wix Website Product Filter Function

Filter function script used for a product search page built on Wix.

## Overview

This JavaScript file enables dynamic filtering of products (e.g., tires) on a Wix website using repeater elements and connected dropdowns.  
It connects to a Wix Data Collection and allows filtering based on:
- Tire Brand
- Tire Type
- Tire Rim
- Tire Size

## Features
- Dynamic search on dropdown change or button click
- Dynamic population of dropdown options from the database
- Reset button to clear all filters and reload all data
- Binds filtered results to a repeater for display

## Usage
1. Connect this script to your Wix page with the corresponding dropdowns, repeater, and buttons.
2. Ensure your dataset (**TireImage**) contains the required fields.
3. Customize UI element IDs if needed:
   - Dropdowns: `#dropdown1`, `#dropdown2`, `#dropdown3`, `#dropdown4`
   - Repeater: `#repeater1`
   - Buttons: `#button1` (Search), `#resetButton` (Reset)

## Notes
- This script is written for **Wix Velo** environment.
- You may customize the item binding inside the repeater to fit your display needs.

