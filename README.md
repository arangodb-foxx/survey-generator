# survey-generator

In order to test this App you need to have an ArangoDB running.
Now you have two options:

1. WebUI

* Open the web ui [default: https://localhost:8529/](https://localhost:8529/).
* Navigate to SERVICES on the left.
* Click on "Add Service"
* On the top tab bar select "GitHub".
* Fill out the form:
  - Repository: "arangodb-foxx/survey-generator"
  - Version: "master"
* Click INSTALL
* Fill out:
  - Mount point: your choice, e.g. "/survey"
  - Run Setup?: check
* Click Install
* Now you see this App deployed, click on it.


2. Foxx CLI

* Requires Node, install the FoxxCLI:
  - Using Yarn: `yarn global add foxx-cli`
  - Or using NPM: `npm install --global foxx-cli`
* Clone this repository to any path: <path/to/app> or download the zip file to <path/to/app>
* Now you can run: `foxx install "/survey" <path/to/app>` on either the repo or the zip file.
* Now you App is deployed under /survey.


If you are using default configuration of arangodb and installed this app under survey you can access it now at:
[default: https://localhost:8529/_db/_system/survey/index.html](https://localhost:8529/_db/_system/survey/index.html).
