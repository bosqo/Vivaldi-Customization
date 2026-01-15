# Vivaldi Customization

This repository contains a curated collection of Vivaldi browser customizations, combining elements from various repositories (like VivalArc) with individual tweaks to create a unique and polished browsing experience.

## Features

### CSS Modifications (`/css`)
Custom styles to enhance the browser's UI:
*   **VivalArc**: Integrating the VivalArc theme for a modern look (`vivalarc.css`, `_vivalarc_mod.css`).
*   **Panel Enhancements**: Custom styles for panels (`Panel.css`), including download (`DownloadPanel.css`) and extensions (`ExtensionsPanel.css`) panels.
*   **Animations**: Hover animations for buttons (`BtnHoverAnime.css`).
*   **Quietify**: `quietify.css` for a cleaner UI.
*   **Quick Commands**: Styling for the quick command interface (`QuickCommand.css`).

### JavaScript Modifications (`/js`)
Scripts to add advanced functionality:
*   **Tab Management**:
    *   `ClearTabs.js`: Tools for clearing tabs.
    *   `TabsLock.js`: Ability to lock tabs.
    *   `colorTabs.js`: Colored tabs.
    *   `tidyTabs.js` & `tidyTitles.js`: Setup for organizing tabs and titles.
    *   `g_bartsch-hibernateTabs.js`: Hibernation control.
*   **UI Tweaks**:
    *   `immersiveAddressbar.js`: Immersive address bar experience.
    *   `ybAddressBar.js`: Address bar customizations.
    *   `autoHidePanel.js`: Auto-hiding side panels.
    *   `vivaldiDashboardCamo.js`: Dashboard camouflage.
*   **Utilities**:
    *   `Picture-in-Picture.js`: Enhanced PiP support.
    *   `accentMod.js`: Accent color modifications.

## Prerequisites

*   **Vivaldi Browser**: Ensure you have the latest version installed.

## Installation

### 1. CSS Setup
1.  Navigate to your Vivaldi User Data directory:
    *   Windows: `%USERPROFILE%\AppData\Local\Vivaldi\User Data`
2.  Create a new folder named `_css` 
3.  Copy all files from the `css` folder of this repository into the newly created folder.
4.  **Enable Custom UI Modifications**:
    *   Open Vivaldi and go to `vivaldi://flags`.
    *   Search for "Allow for using CSS modifications" (`#vivaldi-css-mods`) and **Enable** it.
    *   Restart Vivaldi.
5.  **Configure Path**:
    *   Go to **Settings** → **Appearance**.
    *   Under **Custom UI Modifications**, select the folder you created in step 2.

### 2. JavaScript Setup
1.  Navigate to your Vivaldi User Data directory again:
    *   Windows: `%USERPROFILE%\AppData\Local\Vivaldi\User Data`
2.  Create a new folder named `_js` (or `js`) in this directory.
3.  Copy all files from the `js` folder of this repository into the newly created folder.
4.  **Enable JavaScript Mods**:
    *   The recommended way is to use the [Vivaldi Mod Manager](https://github.com/eximido/vivaldimodmanager).
    *   Alternatively, you can follow manual installation methods found in the community resources.

### 3. Configuration Import
1.  **Preferences**: The `Preferences` file in the root of this repository contains specific browser settings.
    *   **Note**: Back up your existing `Preferences` file in `%USERPROFILE%\AppData\Local\Vivaldi\User Data\Default\` before replacing it.
    *   Copy the `Preferences` file to your *Default* user data folder to apply the settings.

### 4. Themes Import
This repository includes custom themes located in the `themes` folder (e.g., `mario_custom_theme.zip`).
1.  **Import to Vivaldi**:
    *   Open Vivaldi Settings → **Themes**.
    *   Click on the **Open Theme** button (folder icon) or drag and drop the `.zip` file directly into the Vivaldi window.
    *   The theme (including any custom icons) will be installed and applied automatically.
2.  **Icons**: If the theme includes custom icons (like `icons_theme.zip`), they will be part of the installed theme configuration.

## Credits & Resources

*   **VivalArc**: [tovifun/VivalArc](https://github.com/tovifun/VivalArc)
*   **Awesome Vivaldi**: [PaRr0tBoY/Awesome-Vivaldi](https://github.com/PaRr0tBoY/Awesome-Vivaldi/)
*   **Vivaldi Mod Manager**: [eximido/vivaldimodmanager](https://github.com/eximido/vivaldimodmanager)