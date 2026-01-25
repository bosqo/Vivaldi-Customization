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
    *   Both Themes have to be included. The Theme `icons_theme.zip` is required for the Theme to work and need to be selected as icon set for the `mario_custom_theme.zip` to work. Sometimes it gets autoselected but make sure it is selected.
2. Other Themes don't need icon sets to work.

### 5. Side panel extensions
Installed extensions in the sidepanel:
1. Raindrop (https://raindrop.io/) - Bookmarks
2. Gemini (https://gemini.com/) - AI Chat
3. Microsoft ToDo (https://todo.microsoft.com/) - To Do List
4. Notion (https://www.notion.so/) - Notes
5. OneNote (https://www.onenote.com/) - Notes
6. Claude (https://claude.ai/) - AI Chat
7. DeepL (https://www.deepl.com/) - Translation
8. QuillBot (https://www.quillbot.com/) - Text Improver

### 6. Shortcuts
For a list of custom shortcuts configured in this setup, please refer to the **[Shortcut Cheatsheet](CHEATSHEET.md)**.

## Credits & Resources

*   **VivalArc**: [tovifun/VivalArc](https://github.com/tovifun/VivalArc)
*   **Awesome Vivaldi**: [PaRr0tBoY/Awesome-Vivaldi](https://github.com/PaRr0tBoY/Awesome-Vivaldi/)
*   **Vivaldi Mod Manager**: [eximido/vivaldimodmanager](https://github.com/eximido/vivaldimodmanager)