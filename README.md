# NodeJsKeepAliveBackend
Backend REST API used to poll CyberPower UPS daemon for stats. 
Goal of project is to create a RESTful backend for the CyberPower Personal series of UPS that do not come with a web server side for bettery state collection. 
#  
This backend is currently being used in a polling situation where an AWS Lambda function gathers the UPS state every minute and will send and email when power lose detection has resulted.
## 
This project is in it's very early stages and will have many bugs and missing features. 

## Dependencies
- CyberPower PowerPanel daemon installed on host being queried via SSH.
- SSH access to system running CyberPower Panel.

## Usage
- Requires the use of .env.prod variables which include:
    - PORT=3939
        - API Port Number
    - DOMAIN-localhost
        - Domain acces ip or name space
    - PRIV_KEY_PATH=../.ssh/id_rsa
        - Path to private ssh key
    - HOST=external.host.local
        - DNS or IP entry of remote system running CyberPower Panel daemon
    - USERNAME=root
        - ssh user with access to CyberPower Panel daemon
- Start app via:
``` bash
npm run prod 
``` 

## Endpoints
Get UPS State via /alive endpoint: ``` localhost:3939/api/v1/alive```
- Possible return result of ```Normal``` or ```Power Failure```
    - Refer to CyberPower [documention](https://www.cyberpowersystems.com/product/software/power-panel-personal/powerpanel-for-linux/) for more info on possible returned values.

Get UPS Stats via /runtime /capacity endpoints: ``` localhost:3939/api/v1/runtime ``` or ``` /capacity ```
- ``` /runtime ``` endpoint - Runtime left on Battery Power at a given time
    - Possible return results of value between 0 and match run time at load in minutes
    - Will return formated and raw value of resulting time left
- ``` /capacity ``` end point - Capacity left on the battery at a given time
    - Possible return results of value between 0 and 100 %