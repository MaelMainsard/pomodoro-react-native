
<div align="center">

<img src="assets/images/global_icon.png" alt="Logo" width="80" height="80">

<h3 align="center">Pomoboro - React Native</h3>

<p align="center">
    A Pomodoro timer built with React Native 🚀
</p>
</div>

<summary>Table of Contents</summary>
<ol>
    <li>
        <a href="#about-the-project">About the Project</a>
        <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#compatibility">Compatibility</a></li>
            <li><a href="#built-with">Built With</a></li>
        </ul>
    </li>
    <li>
        <a href="#getting-started">Getting Started</a>
        <ul>
            <li><a href="#prerequisites">Prerequisites</a></li>
            <li><a href="#installation">Installation</a></li>
        </ul>
    </li>
    <li><a href="#optimization">Optimization</a></li>
    <li>
        <a href="#usage">Usage</a>
        <ul>
            <li><a href="#android-emulator">Android Emulator</a></li>
            <li><a href="#ios-emulator">iOS Emulator</a></li>
        </ul>
    </li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#contact">Contact</a></li>
</ol>

## About the Project

**Pomoboro** is an application that offers a timer with multiple modes to work according to the Pomodoro technique 🍅. This project was developed as part of a cross-platform mobile development course 📱.

<img src="assets/screenshots/Home.png" alt="HomePage" width="200"/>
<img src="assets/screenshots/TimerChoose.png" alt="ModePage" width="200"/>
<img src="assets/screenshots/TimerWork.png" alt="WorkPage" width="200"/>
<img src="assets/screenshots/TimerWork.png" alt="RestPage" width="200"/>

### Features:

- 3 modes (Work Time / Rest Time):
    - 45 min / 15 min 🕒
    - 25 min / 5 min ⏳
    - 1 min / 1 min ⏱️
- The timer works in the background, allowing you to use other applications while it's active 🕒.
- Ability to stop or pause the timer ⏸️.
- A notification with a custom sound 🎶 alerts you when the timer is finished, reminding you to switch between work and rest modes 🔔.
- Sign in with your Google account to access your session history 🗓️.

⚠️ If you are not signed in or close the app, the session will not be recorded in the history.

### Compatibility

- **Android**
    - Minimum required version: `Android 5.0` (API level 21).
    - Recommended version: `>= Android 10` (API level 29).

- **iOS**
    - Minimum required version: `iOS 12`.
    - Recommended version: `iOS 13`.

- **Web**: `Not supported`.

### Built With

Pomoboro uses several technologies to function 🚀:

- [![React Native][React-Native.js]][React-Native-url]
- [![Expo][Expo.js]][Expo-url]
- [![UI Kitten][UI-Kitten.js]][UI-Kitten-url]
- [![JavaScript][JavaScript.js]][JavaScript-url]
- [![TypeScript][TypeScript.js]][TypeScript-url]

## Getting Started

Before using the project code, ensure you have the correct prerequisites ✅.

### Prerequisites

* **Node.js**: `>= v21.7.3`
* **Java**: `>= 17.0.12`
* Environment variables file: `env.ts`
* Firebase configuration file for Android: `google-services.json`
* Firebase configuration file for iOS: `GoogleService-Info.plist`

### Installation

Please follow the installation guide carefully 📝 to avoid issues when starting up 🚀.

1. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Install npm packages
   ```sh
   npm install
   ```
3. Move the `env.ts`, `google-services.json`, and `GoogleService-Info.plist` files to the root of the project.
4. Create the `android` and `ios` folders by prebuilding the project
   ```sh
   npx expo prebuild
   ```

## Optimization

Pomodoro uses a custom sound for its notifications. Unfortunately, this may delay the push notification by a few seconds.

If this delay is problematic, you can disable this feature by modifying the `hooks/useNotification.ts` file:

```typescript
trigger: {} 
```

to

```typescript
trigger: null
```

## Usage

### Android Emulator

1. Launch your emulator
   ```sh
   emulator @XXXXXX
   ```
2. Run the application on the emulator
   ```sh
   npm run android
   ```

### iOS Emulator

To be completed.

## Contributors

The contributors to this project are:
- Maël Mainsard
- Symeon Rougevin

## Contact

Maël Mainsard - mainsardm@gmail.com

[React-Native.js]: https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-Native-url]: https://reactnative.dev/

[Expo.js]: https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white
[Expo-url]: https://expo.dev/

[UI-Kitten.js]: https://akveo.github.io/react-native-ui-kitten/images/Group-142x.png?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABZUlEQVR4nI2TvUtCYRjFf/dK4RJFg0G4RBAtzkVT0FxbBP0DDQ1NEbg11x8QNDS4NTREBTk0NUWNzRG4NbREgYRlIWXem3fv7em99kHvvSie6TnnPM/vPOd9OTA2tiynk0lEQJYZAzKZDFarlWQyCYDZbP6TUz+YY/f2hdPBMgCGSCSCw+Hg47PCer32IXV9jl6vJ51Os7m5gc/n+1NWMpkkFApxff/K3uE+AH09bRwdR1B1n3QKcLlc5PN5isUiVquVarXK+vo6fr+fzc0NstksFouFUqnEysoKPp8Pl8uFpml4vV4qlQqFQoFAIEA4HEbXdZLJJJFIhPPzM7R6o0kul8Ptdv+YPxgM4nQ6ASiXy1xcXGC321lbW2NpaYlcLgfA7e0dj09vP3L/wHAohEQiQSAQIBaLoes6DocDTdPQNA2TycTi4iLRaJRQKMTd/SvHp+H/j/j0/E48Hv/qw2azAVCr1bBYLOTzeQAsFgsAX7k/HJVuP0qiAAAAAElFTkSuQmCC
[UI-Kitten-url]: https://akveo.github.io/react-native-ui-kitten/

[JavaScript.js]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript

[TypeScript.js]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org//react-native-ui-kitten/
