<img src="https://github.com/Dou2ble/Tauridoro/blob/main/static/tauridoro-white.png?raw=true" alt="Tauridoro Logo" width="256">

# Tauridoro

A FOSS pomodoro timer app inspired by [Pomofocus](https://pomofocus.io).

## Building from source

### Setup

Make sure that you have set up your machine in order to compile tauri applications.
https://tauri.app/v1/guides/getting-started/prerequisites/

### Build

Run the following command to build the project

```bash
pnpm tauri build
```

If you get the error _"**Error** failed to bundle project: error running appimage.sh"_ setting the enviorment variable _"**NO_STRIP**"_ to _"**true**"_ might help.

```bash
NO_STRIP=true pnpm tauri build
```

## Screenshots

![Screenshot of tauridoro during a pomodoro](/screenshots/pomodoro.png)
![Screenshot of tauridoro during a long break](/screenshots/long-break.png)
