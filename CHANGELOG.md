# Changelog

The version number lives in one place: `extension/manifest.json`. `node scripts/check.mjs` (run by CI) fails if it has no entry below, or if a release tag doesn't match it.

## [1.0.1]

### Changed
- **One codebase for all languages.** The separate `en/` and `zh-CN/` folders are merged into a single `extension/` folder that uses Chrome's `_locales` (`chrome.i18n`). The UI follows the browser language (English and 简体中文 included); other languages fall back to English. The old `zh-CN` build had fallen behind the English one and did not have the fixes listed below; it now gets them.
- **Dark mode** for the toolbar popup and the settings page (follows the system theme).
- **Tighter permissions:** host permissions and the content script are limited to `https://www.youtube.com/*` (previously `*://*.youtube.com/*`).
- Shorter manifest description (fits the Chrome Web Store's 132-character limit).
- The popup builds its status messages with `textContent` instead of `innerHTML`.

### Added
- GitHub Actions workflow: validates the project on every push/PR and, on a `vX.Y.Z` tag, builds `YouTube-Screenshot-vX.Y.Z.zip` and publishes a GitHub release using these notes.
- `scripts/check.mjs`: manifest, version, locale-parity and host-pattern checks.

### Fixed
- **Preview mode (the default) errored on every capture:** an inner function in `showPreview` had the same name as the outer `closePreview`. It was hoisted and shadowed the outer function, so its first-line call touched uninitialized variables and threw `Cannot access 'wrap' before initialization`; the preview never appeared. Renamed to fix it.
- **Preview and toasts were invisible in fullscreen:** the overlays were attached under `<html>`, but in fullscreen only the fullscreen element's subtree is visible. They are now attached to the fullscreen element.
- **In "What you see" mode, the previous capture's toast/preview ended up in the next image:** overlays are now hidden at the moment of capture.
- **"Copy to clipboard" always failed when triggered from the popup:** the popup held focus, and clipboard writes are rejected when the page isn't focused. The popup now closes right after you click, and the page waits for focus before writing.
- **The shortcut did nothing on YouTube tabs opened before the extension was installed or updated:** the script is now injected automatically; if that still fails, the toolbar icon shows a red `!`.
- **Old buttons stopped working after an extension reload:** a button left behind by an old instance is replaced by the new one, and the old script shuts itself down.
- **Player button injection could throw:** if the settings button isn't a direct child of `.ytp-right-controls`, `insertBefore` throws `NotFoundError`. The button is now inserted into the settings button's own parent.
- The "is the canvas tainted" probe now reads 1 pixel instead of calling `toDataURL` (which encoded a whole PNG and froze the page on 4K).
- With several `<video>` elements on a page, the one with the largest visible area is used; the player button captures the video in its own player.
- DOM-change monitoring is throttled, and the 2-second polling is gone.
- `captureVisibleTab` only runs when the requesting page is the active tab, so it can't capture a different page.
- The file extension follows the format actually encoded (browsers without WebP encoding fall back to PNG).
- An unread-count prefix such as `(3) ` is removed from titles.
- Permissions: removed the unused `downloads`; added `scripting` (used only for the injection described above).

## [1.0]

Initial public release.
