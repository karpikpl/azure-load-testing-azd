# About

Azure Load Testing a Container App using [Azure Developer CLI (azd)](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/).

## Deployment

Deploy using `azd up`.

## Details

Sample deploys a node.js API and Load Testing resource that runs Jmeter script against it.

Jmeter script uses multiple pairs of username/passwords to get tokens and push load on the API.

## Jmeter

![Jmeter](/assets/jmeter.png)

Jmeter uses user defined variables to configure HTTP calls e.g. `${__P(url, localhost)}` for url.
See [Use JMeter user properties with Azure Load Testing](https://learn.microsoft.com/en-us/azure/load-testing/how-to-configure-user-properties?tabs=portal) for more details.

CSV file `random_users.csv` with dummy username and passwords is first used to get API tokens, which are temporarily saved to `tokens.csv` file during test exection. There's exactly 1 call to the `\token` endpoint for each username/password pair during setup.

More on working with CSV files - see [Read data from a CSV file in JMeter with Azure Load Testing](https://learn.microsoft.com/en-us/azure/load-testing/how-to-read-csv-data?tabs=portal).

Once tokens are ready, User Thread Group is executed that sends traffic to 2 API endpoints on the container App.
Each request uses sequentially obtained bearer token from `tokens.csv` file.

Thanks to Azure Load Testing features, initial CSV file is split between all the engine instances, hence each engine uses unique users.

## Azure Container App

Container App scales with http scaler to 10 instances during the load test.

![ACA Scaling](/assets/aca.png)