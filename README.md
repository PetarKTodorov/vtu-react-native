# Quizzez Application

## Description
This application is a university project built with react native. The application represents a game in which after registration you can play.
As user you can create games with your friend's names and play with them. The game will choose random question and participant
to answer the question.


## Requirements

|  Name         | version       | Details  |
| ------------- |:-------------:| ------------------------------------: |
| Node          | 14.15.0       | Check .nvmrc file  					|
| Xcode         | 12.5.1        | Or above 					            |

## Optional tools

|  Name         |  Description                  | Installation                  |
| ------------- | ----------------------------- | ----------------------------- |
| NVM           | Multiple nodejs versions      | https://github.com/nvm-sh/nvm |


## How to build
#### If you have nvm
```shell
nvm use
yarn install
```

#### If you doesnt have nvm
*Be sure your node version is **v14.15.0**, may work on older versions, but is was tested on **v14.15.0**

```shell
yarn install
```

*On ios be sure you install pods in ios folder with ```cd ios && pod install```


## How to start
1. For android type: ```yarn run android```
1. For ios type: ```yarn run ios```

## Database Architector
* Users
    - id
    - email
    - password

* Games
    - id
    - name
    - participants
    - userid

* Questions
    - id
    - title


## Screens
* Login
* Register
* My Games
* Create Game
* Play Game