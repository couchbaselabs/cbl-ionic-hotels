# Couchbase Lite Hotels Demo App
In spirit of the original demo app for the "Build Offline-Enabled Mobile Apps With Ionic and Couchbase Lite" talk at Couchbase Connect 2021, this app allows users to search and bookmark hotels using data loaded from a Couchbase Lite database.

You can find the original demo app [here](https://github.com/ionic-team/demo-couchbaselite-hotels)

Created with modern React and the new Couchbase Lite integration in Ionic. 

## Features

* Data from a Couchbase Lite database: The database is embedded into the Android and iOS apps.

* Couchbase Lite Plugin designed using Capacitor

* UI components powered by Ionic Framework: search bar, bookmarks, icons, list items, and more.

* Bookmarked hotels: Saved in a Couchbase Lite database.

* Cross-platform: Create iOS and Androids apps all from the same codebase with standard web technologies.

## Tech Details

- UI: [Ionic Framework 7](https://ionicframework.com) and [React 18](https://react.dev/)
- Native runtime: [Capacitor 6](https://capacitorjs.com)
- Database: Couchbase Lite v3.2.1 powered by [Couchbase Lite integration](https://cbl-ionic.dev/)

## Development Requirements
[Documentation](https://cbl-ionic.dev/StartHere/prerequisites)

## How to Run

Note: Installing and running this app, which uses Couchbase Lite Enterprise edition , which requires a license. 

- Install the Ionic CLI: `npm install -g @ionic/cli`
- Clone the repo: `git clone git@github.com:couchbaselabs/cbl-ionic-hotels.git`

## Setup the demo app

- Install the dependencies for the demo app

```shell
cd cbl-ionic-hotels

npm install

npm run build

npx cap sync

cd ios/App

pod install

cd ../..

 ```

- Build the app:
```shell 
  npm run build
 ```

- Run via capacitor
**iOS**
 ```shell
ionic capacitor run ios -l --external 
 ```
**Android**
 ```shell
ionic capacitor run android -l --external
 ```