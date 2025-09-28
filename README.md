# @swizzyweb/swizzy-frontend-template-web-service

Sample react and tailwind based swizzy frontend web service. The sample app has a react based frontend
and a swizzy web service backend. A sample implementation of an api can be found in the
routers/Api directory.

## Documentation:

https://swizzyweb.github.io/swerve-frontend-web-service/

## Web service

The Swizzy web service logic can be found in the src directory.

## React

The react code is in the react directory.

## Running

## Install

```npm
npm install
```

## Build and run immediately

```npm
npm run dev
```

## Only build

```npm
npm run build
```

## Running server after build

```npm
npm run server
```

## With swerve

After build you can just run `swerve` in the root directory.

# Running full stack

```
npm install @swizzyweb/swerve-web-service @swizzyweb/swerve-frontend-web-service
swerve @swizzyweb/swerve-web-service @swizzyweb/swerve-frontend-web-service
```

## Service config

web-service-config.json

```
{
  "port": 3005,
  "services": {
    "Frontend": {
      "servicePath": "../swerve-frontend-web-service/"
    },
    "Backend": {
      "servicePath": "../swerve-web-service/"
    }
  }
}

```

```
swerve --config web-service-config.json
```
