# Azure Movies API

> My first Azure REST API

## Contents

- [Built with](#built-with)
- [Installation](#installation)
- [Deploy to Azure App Services](#deploy-to-azure-app-services)
- [API Reference](#api-reference)

## Built with

- [Azure SQL Database](https://azure.microsoft.com/services/sql-database/)
- [TypeScript 3.3.1](https://github.com/microsoft/TypeScript)
- [Express 4.17.1](https://github.com/expressjs/express)
- [Express validator 6.4.0](https://github.com/express-validator/express-validator)
- [CORS 2.8.5](https://github.com/expressjs/cors)
- [Connect slashes 1.4.0](https://github.com/avinoamr/connect-slashes)

## Installation

1. Clone the repo

```sh
git clone https://github.com/dreadnallen/azure-movies-api.git
```

2. Install NPM packages

```sh
npm install
```

3. Run in development mode

```sh
npm run dev
```

## Deploy to Azure App Services

1. Install [Azure Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)

2. Go to Azure Extension / App Service and click &#xFF0B; sign to Create New Web App... Choose name and platform (Windows)

3. Open your new App Service tree structure by clicking &rsaquo; and got to Deployments / Connect to a GitHub Repository...

   - Choose organization (Your username on GitHub)
   - Choose repository (Must be public?)
     _TODO: Insert solution to this question! There might be an answer in [this Microsoft tutorial](https://docs.microsoft.com/sv-se/azure/javascript/tutorial-vscode-azure-app-service-node-01?tabs=bash). For now &ndash; let's jump over to Azure Portal instead:_

4. Go to [Azure Portal](https://portal.azure.com/) and click "App Services" to find your new App Service:

   - Click _Deployment Center_ under _Deployment_, choose _GitHub_ under _Continous Deployment_ and click _Authorize_
   - Log in to your GitHub account and click _Continue_
   - Click _App Service Build Service_ and click _Continue_
   - Choose organization (your GitHub profile name), Repository and master branch
   - Click _Countinue_ and _Finish_. Automatic deployment is now activated.

5. Change your `package.json` setting to:

```json
"scripts": {
    "start":"node build/server.js",
    "postinstall": "tsc",
     ...
  }
```

6. Make sure typescript and @types/... are all in your `package.json` dependencies (`npm install ... --save`)

7. Install the kuduscript tool globally ([source](http://codereform.com/blog/post/nodejs-azure-web-app-continuous-delivery-via-github-and-some-kudu-magic/))

```sh
npm install kuduscript -g
```

8. After installing Kuduscript, open a CMD window on your application’s root and type the following command to generate files `.deployment` and `deploy.cmd` in your application root directory (mind the dot: `.`):

```
kuduscript -y --node --sitePath .
```

9. Look for these lines in `deploy.cmd`

```cmd
:: 3. Install npm packages
IF EXIST "%DEPLOYMENT_TARGET%\package.json" (
  pushd "%DEPLOYMENT_TARGET%"
  call :ExecuteCmd !NPM_CMD! install --production
  IF !ERRORLEVEL! NEQ 0 goto error
  popd
)
```

and add the following directly after them: ([source](http://codefoster.com/tscazure/))

```cmd
:: 4. Compile TypeScript
echo Transpiling TypeScript in %DEPLOYMENT_TARGET%...call :ExecuteCmd node %DEPLOYMENT_TARGET%\node_modules\typescript\bin\tsc -p "%DEPLOYMENT_TARGET%"
```

10. Make the following changes to `web.config` in order to point Node to your `outDir` directory setting in `tsconfig.json`:

```xml
...
<handlers>
  <add name="iisnode" path="build/server.js" verb="*" modules="iisnode"/>
</handlers>
...
<rule name="DynamicContent">
  <conditions>
    <add input="{{REQUEST_FILENAME}}" matchType="IsFile" negate="True"/>
  </conditions>
  <action type="Rewrite" url="build/server.js"/>
</rule>
```

11. Make the following change to `web.config` in order to make your Node app catch any http errors (`404` and `500` e.g.): ([source](https://stackoverflow.com/questions/19555187/node-js-on-azure-websites-404-error))

```xml
...
<httpErrors existingResponse="PassThrough"/>
...
```

## API Reference

### Genres

#### <font color="green">GET</font> /v1/genres/{genre-id}

| Path Parameters |                                      |                                    |
| --------------- | ------------------------------------ | ---------------------------------- |
| genre-id        | <font color="darkred">integer</font> | <font color="grey">optional</font> |

**Example response**

```json
{
  "id": { id },
  "name": "{name}",
  "created-at": "{timestamp}",
  "updated-at": null,
  "_links": [
    {
      "self": {
        "href": "http://azure-movies-api.azurewebsites.net/api/v1/genres/{id}"
      }
    }
  ]
}
```

#### <font color="orange">POST</font> /v1/genres

| Body Parameters |                                  |                                        |
| --------------- | -------------------------------- | -------------------------------------- |
| genre-id        | <font color="teal">string</font> | <font color="darkblue">required</font> |

**Example request**

```json
{
  "name": "{name}"
}
```

**Example response**

```json
{
  "id": { id },
  "name": "{name}"
}
```

#### <font color="blue">PUT</font> /v1/genres/{genre-id}

| Path Parameters |                                      |                                        |
| --------------- | ------------------------------------ | -------------------------------------- |
| genre-id        | <font color="darkred">integer</font> | <font color="darkblue">required</font> |

**Example request**

```json
{
  "name": "{name}"
}
```

**Example response**

```json
{
  "id": { id },
  "name": "{name}",
  "created-at": "{timestamp}",
  "updated-at": "{timestamp}"
}
```

#### <font color="red">DELETE</font> /v1/genres/{genre-id}

| Path Parameters |                                      |                                        |
| --------------- | ------------------------------------ | -------------------------------------- |
| genre-id        | <font color="darkred">integer</font> | <font color="darkblue">required</font> |

**Example response**

```json
{
  "id": { id }
}
```

## Contact

email: <christofer.laurin@gmail.com>
linkedin: <https://www.linkedin.com/in/laurin/>
