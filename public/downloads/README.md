# Download files for the website

After building the desktop app, copy installers here so the site download links work:

```bash
npm run electron:build:linux   # or electron:build:win on Windows
npm run copy:downloads
```

Expected files:

| Platform | Files |
| -------- | ----- |
| Linux | `ClipMate-1.0.0.AppImage`, `clipmate_1.0.0_amd64.deb` |
| Windows | `ClipMate-Setup-1.0.0.exe`, `ClipMate-1.0.0-portable.exe` |

Large binaries are gitignored; deploy this folder with your static site or CI artifact upload.
