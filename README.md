# Azure Movies API

> My first Azure REST API

## Contents

- [Built with](#built-with)
- [Installation](#installation)
- [Deploy to Azure App Services](#deploy-to-azure-app-services)
- [API Reference](#api-reference)
- [Contact](#contact)

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

~~3. Open your new App Service tree structure by clicking &rsaquo; and got to Deployments / Connect to a GitHub Repository...

- Choose organization (Your username on GitHub)
- Choose repository (Must be public?)
  _TODO: Insert solution to this question! There might be an answer in [this Microsoft tutorial](https://docs.microsoft.com/sv-se/azure/javascript/tutorial-vscode-azure-app-service-node-01?tabs=bash). For now &ndash; let's jump over to Azure Portal instead:_~~

4. Go to [Azure Portal](https://portal.azure.com/) and click "App Services" to find your new App Service:

   - Click _Deployment Center_ under _Deployment_, choose _GitHub_ under _Continous Deployment_ and click _Authorize_
   - Log in to your GitHub account and click _Continue_
   - Click _App Service Build Service_ and click _Continue_
   - Choose organization (your GitHub profile name), Repository and master branch
   - Click _Countinue_ and _Finish_. Automatic deployment is now activated.

5. Change your `package.json` setting to:

```json
...
"scripts": {
    "start":"node build/server.js",
    "postinstall": "tsc"
  }
...
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

#### List genres

```endpoint
GET /v1/genres
```

##### Example request

```curl
$ curl --location --request GET 'https://azure-movies-api.azurewebsites.net/api/v1/genres'
```

##### Example response

```http
200 - OK
```

```json
[
  {
    "id": 1,
    "name": "{name}",
    "created-at": "{timestamp}",
    "updated-at": "{timestamp}",
    "_links": [
      {
        "self": {
          "href": "https://azure-movies-api.azurewebsites.net/api/v1/genres/1"
        }
      }
    ]
  },
  {
    "id": 2,
    "name": "{name}",
    "created-at": "{timestamp}",
    "updated-at": "{timestamp}",
    "_links": [
      {
        "self": {
          "href": "https://azure-movies-api.azurewebsites.net/api/v1/genres/2"
        }
      }
    ]
  }
]
```

#### Retrieve genre

```endpoint
GET /v1/genres/{genre-id}
```

##### Example request

```curl
$ curl --location --request GET 'https://azure-movies-api.azurewebsites.net/api/v1/genres'/{genre-id}
```

###### Path parameters

| property | type    |          |
| -------- | ------- | -------- |
| genre-id | integer | requried |

##### Example response

```http
200 - OK
```

```json
{
  "id": 1,
  "name": "{name}",
  "created-at": "{timestamp}",
  "updated-at": "{timestamp}",
  "_links": [
    {
      "self": {
        "href": "https://azure-movies-api.azurewebsites.net/api/v1/genres/1"
      }
    }
  ]
}
```

#### Create genre

```endpoint
POST /v1/genres
```

##### Example request

```curl
$ curl --location --request POST 'https://azure-movies-api.azurewebsites.net/api/v1/genres' \
--data-raw '{
    "name": "{name}"
}'
```

###### Request body

```json
{
  "name": "{name}"
}
```

###### Body parameters

| property | type   |          |
| -------- | ------ | -------- |
| name     | string | required |

##### Example response

```http
201 - Created
```

```json
{
  "id": 1,
  "name": "{name}"
}
```

#### Update genre

```endpoint
PUT /v1/genres/{genre-id}
```

##### Example request

```curl
$ curl --location --request PUT 'https://azure-movies-api.azurewebsites.net/api/v1/genres/{genre-id}' \
--data-raw '{
    "name": "{name}"
}'
```

###### Path parameters

| property | type    |          |
| -------- | ------- | -------- |
| genre-id | integer | required |

###### Request body

```json
{
  "name": "{name}"
}
```

###### Body parameters

| property | type   |          |
| -------- | ------ | -------- |
| name     | string | required |

##### Example response

```http
200 - OK
```

```json
{
  "id": 1,
  "name": "{name}",
  "created-at": "{timestamp}",
  "updated-at": "{timestamp}"
}
```

#### Delete genre

```endpoint
DELETE /v1/genres/{genre-id}
```

##### Example request

```curl
$ curl --location --request DELETE 'https://azure-movies-api.azurewebsites.net/api/v1/genres/{genre-id}
```

###### Path parameters

| property | type    |          |
| -------- | ------- | -------- |
| genre-id | integer | required |

##### Example response

```http
200 - OK
```

```json
{
  "id": 1
}
```

### Movies

#### List movies

```endpoint
GET /v1/movies
```

##### Example request

```curl
$ curl --location --request GET 'https://azure-movies-api.azurewebsites.net/api/v1/movies'
```

##### Example response

```http
200 - OK
```

```json
[
  {
    "id": 1,
    "name": "{name}",
    "description": "{description}",
    "image-url": "{image-url}",
    "production-year": 2020,
    "created-at": "{timestamp}",
    "updated-at": "{timestamp}",
    "movie-genre": [
      {
        "id": 5,
        "name": "{genre-name}",
        "_links": [
          {
            "self": {
              "href": "https://azure-movies-api.azurewebsites.net/api/v1/genres/5"
            }
          }
        ]
      },
      {
        "id": 6,
        "name": "{genre-name}",
        "_links": [
          {
            "self": {
              "href": "https://azure-movies-api.azurewebsites.net/api/v1/genres/6"
            }
          }
        ]
      }
    ],
    "_links": [
      {
        "self": {
          "href": "https://azure-movies-api.azurewebsites.net/api/v1/movies/1"
        }
      }
    ]
  },
  {
    "id": 2,
    "name": "{name}",
    "description": "{description}",
    "image-url": "{image-url}",
    "production-year": 2020,
    "created-at": "{timestamp}",
    "updated-at": "{timestamp}",
    "movie-genre": [
      {
        "id": 8,
        "name": "{genre-name}",
        "_links": [
          {
            "self": {
              "href": "https://azure-movies-api.azurewebsites.net/api/v1/genres/8"
            }
          }
        ]
      }
    ],
    "_links": [
      {
        "self": {
          "href": "https://azure-movies-api.azurewebsites.net/api/v1/movies/2"
        }
      }
    ]
  }
]
```

#### Retrieve movie

```endpoint
GET /v1/movies/{movie-id}
```

##### Example request

```curl
$ curl --location --request GET 'https://azure-movies-api.azurewebsites.net/api/v1/movies/76'
```

###### Path parameters

| property | type    |          |
| -------- | ------- | -------- |
| movie-id | integer | required |

##### Example response

```http
200 - OK
```

```json
{
  "id": 1,
  "name": "{name}",
  "description": "{description}",
  "image-url": "{image-url}",
  "production-year": 2020,
  "created-at": "{timestamp}",
  "updated-at": "{timestamp}",
  "movie-genre": [
    {
      "id": 5,
      "name": "{genre-name}",
      "_links": [
        {
          "self": {
            "href": "https://azure-movies-api.azurewebsites.net/api/v1/genres/5"
          }
        }
      ]
    },
    {
      "id": 6,
      "name": "{genre-name}",
      "_links": [
        {
          "self": {
            "href": "https://azure-movies-api.azurewebsites.net/api/v1/genres/6"
          }
        }
      ]
    }
  ],
  "_links": [
    {
      "self": {
        "href": "https://azure-movies-api.azurewebsites.net/api/v1/movies/1"
      }
    }
  ]
}
```

#### Create movie

```endpoint
POST /v1/movies
```

##### Example request

```curl
$ curl --location --request POST 'https://azure-movies-api.azurewebsites.net/api/v1/movies/' \
--data-raw '{
    "name": "{name}",
    "description": "{description}",
    "production-year": 2020,
    "image-url": "http://example.com",
    "movie-genre": [
        {
            "id": 5
        },
        {
            "id": 6
        },
        {
            "id": 7
        }
    ]
}'
```

###### Request body

```json
{
  "name": "{name}",
  "description": "{name}",
  "production-year": 2020,
  "image-url": "http://example.com",
  "movie-genre": [
    {
      "id": 5
    },
    {
      "id": 6
    },
    {
      "id": 7
    }
  ]
}
```

###### Body parameters

| property        | type                |          |
| --------------- | ------------------- | -------- |
| name            | string              | required |
| description     | string              | required |
| production-year | integer             | required |
| image-url       | string              | required |
| movie-genre     | (list of genre-ids) | optional |

##### Example response

```http
201 - Created
```

```json
{
  "id": 1,
  "name": "{name}",
  "description": "{description}",
  "image-url": "http://example.com",
  "production-year": 2020,
  "movie-genre": [
    {
      "id": 5,
      "name": "{name}"
    },
    {
      "id": 6,
      "name": "{name}"
    },
    {
      "id": 7,
      "name": "{name}"
    }
  ],
  "_links": [
    {
      "self": {
        "href": "https://azure-movies-api.azurewebsites.net/api/v1/movies/1"
      }
    }
  ]
}
```

#### Update movie

```endpoint
PUT /v1/movies/{movie-id}
```

##### Example request

```curl
$ curl --location --request PUT 'https://azure-movies-api.azurewebsites.net/api/v1/movies/1' \
--data-raw '{
	"id":463,
    "name": "{name}",
    "description": "{description}",
    "production-year": 2020,
    "image-url": "http://example.com",
    "movie-genre": [
        {
            "id": 7
        },
        {
            "id": 8
        }
    ]
}'
```

###### Request body

```json
{
  "id": 463,
  "name": "{name}",
  "description": "{description}",
  "production-year": 2020,
  "image-url": "http://example.com",
  "movie-genre": [
    {
      "id": 7
    },
    {
      "id": 8
    }
  ]
}
```

###### Body parameters

| property        | type                |          |
| --------------- | ------------------- | -------- |
| id              | integer             | required |
| name            | string              | required |
| description     | string              | required |
| production-year | integer             | required |
| image-url       | string              | required |
| movie-genre     | (list of genre-ids) | optional |

##### Example response

```http
200 - OK
```

```json
{
  "id": 1,
  "name": "{name}",
  "description": "{description}",
  "image-url": "http://example.com",
  "production-year": 2020,
  "created-at": "{timestamp}",
  "updated-at": "{timestamp}",
  "movie-genre": [
    {
      "id": 7,
      "name": "{name}"
    },
    {
      "id": 8,
      "name": "{name}"
    }
  ],
  "_links": [
    {
      "self": {
        "href": "https://azure-movies-api.azurewebsites.net/api/v1/movies/1"
      }
    }
  ]
}
```

#### Delete movie

```endpoint
DELETE /v1/movies/{movie-id}
```

##### Example request

```curl
$ curl --location --request DELETE 'https://azure-movies-api.azurewebsites.net/api/v1/movies/1'
```

###### Path parameters

| property | type    |          |
| -------- | ------- | -------- |
| movie-id | integer | required |

##### Example response

```http
200 - OK
```

```json
{
  "id": 1
}
```

### Actors

#### List actors

```endpoint
GET /v1/actors
```

##### Example request

```curl
$ curl --location --request GET 'https://azure-movies-api.azurewebsites.net/api/v1/actors'
```

##### Example response

```http
200 - OK
```

```json
[
  {
    "id": 6,
    "first-name": "{first-name}",
    "last-name": "{last-name}",
    "created-at": "{timestamp}",
    "updated-at": "{timestamp}",
    "_links": [
      {
        "self": {
          "href": "https://azure-movies-api.azurewebsites.net/api/v1/actors/6"
        }
      },
      {
        "roles": {
          "href": "https://azure-movies-api.azurewebsites.net/api/v1/actors/6/roles"
        }
      }
    ]
  },
  {
    "id": 7,
    "first-name": "{first-name}",
    "last-name": "{last-name}",
    "created-at": "{timestamp}",
    "updated-at": "{timestamp}",
    "_links": [
      {
        "self": {
          "href": "https://azure-movies-api.azurewebsites.net/api/v1/actors/7"
        }
      },
      {
        "roles": {
          "href": "https://azure-movies-api.azurewebsites.net/api/v1/actors/7/roles"
        }
      }
    ]
  }
]
```

#### Retrieve actor

```endpoint
GET /v1/actors/{actor-id}
```

##### Example request

```curl
$ curl --location --request GET 'https://azure-movies-api.azurewebsites.net/api/v1/actors/6'
```

###### Path parameters

| property | type    |          |
| -------- | ------- | -------- |
| actor-id | integer | required |

##### Example response

```http
200 - OK
```

```json
{
  "id": 6,
  "first-name": "{first-name}",
  "last-name": "{last-name}",
  "created-at": "{timestamp}",
  "updated-at": "{timestamp}",
  "_links": [
    {
      "self": {
        "href": "https://azure-movies-api.azurewebsites.net/api/v1/actors/6"
      }
    },
    {
      "roles": {
        "href": "https://azure-movies-api.azurewebsites.net/api/v1/actors/6/roles"
      }
    }
  ]
}
```

#### Create actor

```endpoint
POST /v1/actors
```

##### Example request

```curl
$ curl --location --request POST 'https://azure-movies-api.azurewebsites.net/api/v1/actors' \
--data-raw '{
    "first-name": "{first-name}",
    "last-name": "{last-name}"
}'
```

###### Request body

```json
{
  "first-name": "{first-name}",
  "last-name": "{last-name}"
}
```

###### Body parameters

| property   | type   |          |
| ---------- | ------ | -------- |
| first-name | string | required |
| last-name  | string | optional |

##### Example response

```http
201 - Created
```

```json
{
  "id": 1,
  "first-name": "{first-name}",
  "last-name": "{last-name}",
  "created-at": "{timestamp}",
  "_links": [
    {
      "self": {
        "href": "https://azure-movies-api.azurewebsites.net/api/v1/actors/1"
      }
    }
  ]
}
```

#### Update actor

```endpoint
PUT /v1/actors/{actor-id}
```

##### Example request

```curl
$ curl --location --request PUT 'https://azure-movies-api.azurewebsites.net/api/v1/actors/15' \
--data-raw '{
    "first-name": "{first-name}",
    "last-name": "{last-name}"
}'
```

###### Path parameters

| property | type    |          |
| -------- | ------- | -------- |
| actor-id | integer | required |

###### Request body

```json
{
  "first-name": "{first-name}",
  "last-name": "{last-name}"
}
```

###### Body parameters

| property   | type   |          |
| ---------- | ------ | -------- |
| first-name | string | required |
| last-name  | string | optional |

##### Example response

```http
200 - OK
```

```json
{
  "id": 15,
  "first-name": "{first-name}",
  "last-name": "{last-name}",
  "created-at": "{timestamp}",
  "updated-at": "{timestamp}",
  "_links": [
    {
      "self": {
        "href": "https://azure-movies-api.azurewebsites.net/api/v1/actors/15"
      }
    }
  ]
}
```

#### Delete actor

```endpoint
DELETE /v1/actors/{actor-id}
```

##### Example request

```curl
$ curl --location --request DELETE 'https://azure-movies-api.azurewebsites.net/api/v1/actors/15'
```

###### Path parameters

| property | type    |          |
| -------- | ------- | -------- |
| actor-id | integer | required |

##### Example response

```http
200 - OK
```

```json
{
  "id": 15
}
```

### Roles

#### List actor roles

```endpoint
GET /v1/actors/{actor-id}/roles
```

##### Example request

```curl
curl --location --request GET 'https://azure-movies-api.azurewebsites.net/api/v1/actors/6/roles'
```

###### Path parameters

| property | type    |          |
| -------- | ------- | -------- |
| actor-id | integer | required |

###### Example response

```http
200 - OK
```

```json
[
  {
    "id": 10,
    "name": "{name}",
    "movie-id": 76,
    "actor-id": 6,
    "_links": [
      {
        "movie": {
          "href": "https://azure-movies-api.azurewebsites.net/api/v1/movies/76"
        }
      },
      {
        "actor": {
          "href": "https://azure-movies-api.azurewebsites.net/api/v1/actors/6"
        }
      }
    ]
  }
]
```

#### List actor roles for a particular movie

```endpoint
GET /v1/actors/{actor-id}/roles/{movie-id}
```

##### Example request

```curl
$ curl --location --request GET 'http://azure-movies-api.azurewebsites.net/api/v1/actors/6/roles/76'
```

###### Path parameters

| property | type    |          |
| -------- | ------- | -------- |
| actor-id | integer | required |
| movie-id | integer | required |

###### Example response

```http
200 - OK
```

```json
[
  {
    "id": 10,
    "name": "{name}",
    "movie-id": 76,
    "actor-id": 6,
    "_links": [
      {
        "movie": {
          "href": "https://azure-movies-api.azurewebsites.net/api/v1/movies/76"
        }
      },
      {
        "actor": {
          "href": "https://azure-movies-api.azurewebsites.net/api/v1/actors/6"
        }
      }
    ]
  }
]
```

#### Create role

```endpoint
POST /v1/actors/{actor-id}/roles/{movie-id}
```

##### Example request

```curl
$ curl --location --request POST 'https://azure-movies-api.azurewebsites.net/api/v1/actors/16/roles/77' \
--data-raw '{
    "name": "{name}"
}'
```

###### Path parameters

| property | type    |          |
| -------- | ------- | -------- |
| actor-id | integer | required |
| movie-id | integer | required |

###### Request body

```json
{
  "name": "{name}"
}
```

###### Body parameters

| property | type   |          |
| -------- | ------ | -------- |
| name     | string | required |

##### Example response

```http
201 - Created
```

```json
{
  "id": 26,
  "name": "{name}",
  "movie-id": 77,
  "actor-id": 16,
  "_links": [
    {
      "movie": {
        "href": "https://azure-movies-api.azurewebsites.net/api/v1/movies/77"
      }
    },
    {
      "actor": {
        "href": "https://azure-movies-api.azurewebsites.net/api/v1/actors/16"
      }
    }
  ]
}
```

#### Delete role

```endpoint
DELETE /v1/actors/{actor-id}/roles/{movie-id}/{role-id}
```

##### Example request

```curl
$ curl --location --request DELETE 'https://azure-movies-api.azurewebsites.net/api/v1/actors/16/roles/77/26'
```

###### Path parameters

| property | type    |          |
| -------- | ------- | -------- |
| actor-id | integer | required |
| movie-id | integer | required |
| role-id  | integer | required |

##### Example response

```http
200 - OK
```

```json
{
  "movie-id": 77,
  "actor-id": 16,
  "_links": [
    {
      "movie": {
        "href": "https://azure-movies-api.azurewebsites.net/api/v1/movies/77"
      }
    },
    {
      "actor": {
        "href": "https://azure-movies-api.azurewebsites.net/api/v1/actors/16"
      }
    }
  ]
}
```

## Contact

email: <christofer.laurin@gmail.com>
linkedin: <https://www.linkedin.com/in/laurin/>
