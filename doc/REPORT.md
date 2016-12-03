#### Bot Name: DockrRockr

Team Members: <br/>
Krunal Gala - kgala <br/>
Jigar Sharda - jsharda<br/>
Shrey Sanghavi - ssangha<br/>
Rahul Shah - rshah5<br/>
Samrudhi Sharma - ssharm17<br/>

The problem your bot solved
---

The main purpose of DockrRockr is to expedite the deployment process. The configuration he needs to provide are the credentials of the database and dockerhub and reset everything is handled by the bot. Any changes that the user does to the code, will be detected by the bot and the user will have an option to deploy it on AWS.<br/>

A user wants to easily deploy an application which can be accessed by a public URL. The user faces a myriad of problems which are stated below: 

1. The developer has to make a lot of configurations to deploy an application.
2. The commands are repetitive which can be easily automated.
3. The user has to constantly check the build and deploy status 
4. Docker has a learning curve.
5. Changes made to the application should be automatically picked up, and integrated into the build process.

Primary features and screenshots
---

#### Primary Features
1. Dockerizes an existing application.
2. Slack bot created which uses chat-ops to communicate with developer.
3. Deploys the docker image.
4. Picks up the changes made to the application, and rebuilds image, and deployment process.

#### Screenshots
## Creating a dockerfile
![image](https://media.github.ncsu.edu/user/4007/files/b6c87934-b968-11e6-9bc0-f0c84273c823)

## Sample Form
![image](https://media.github.ncsu.edu/user/4007/files/b87388dc-b968-11e6-9376-7c2099b8188c)

## Bot asks to redeploy on code change.
![image](https://media.github.ncsu.edu/user/4007/files/b3f2dcea-b968-11e6-82a0-0bdf76bd1ce2)

## What happens when things go wrong
![image](https://media.github.ncsu.edu/user/4007/files/b14a2fac-b968-11e6-9853-80fea92ad796)

Screencast
---
[![Screencast](https://i1.ytimg.com/vi/0pQsqXLqczQ/default.jpg)](https://youtu.be/0pQsqXLqczQ)

### Your reflection on the development process and project

Development Process
---
1. <br/>
2. <br/>
3. <br/>

Project Development Challenges
---
1. <br/>
2. <br/>
3. <br/>

Limitations and Future work
---

Features that can be added:

1. Storing credentials of the user, so that he must not enter the credentials for another repo that has to be dockerized. <br/>
2. Providing cloud providers as a stub, rather than providing AWS as the only option. <br/>
3. Only rebuilding the changes of the commits rather than the whole image.
