# StortVerkefni2

## Folder Structure
We split the scss and the javascript files into two separate folders, style and js. 

## Git Ignore
On top of the common ignores like node_modules and .DS_Store we ignore all build files and output from both babel and scss.

## Build
Clone the project from github and run the build command with npm.
```sh
npm run build
```

## Developement
To run in development mode - live reload and automatic compilation of both scss and js, run the dev command.
```sh
npm run dev
```

## Myndbond
To check out the video part just start the project with the npm run dev and browse to localhost:3000/myndband.html?id=2. Note that the port number can change.