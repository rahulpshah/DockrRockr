#### Bot Name: DockrRockr

Team Members: <br/>
Krunal Gala - kgala <br/>
Jigar Sharda - jsharda<br/>
Shrey Sanghavi - ssangha<br/>
Rahul Shah - rshah5<br/>
Samrudhi Sharma - ssharm17<br/>

### Service 

### Screencast

[![Screencast](https://i1.ytimg.com/vi/5PQthJ2bWsg/default.jpg)](https://youtu.be/5PQthJ2bWsg)

##### Overview 
1. User has an application that he wishes to deploy, and create a Docker Image for.<br/>
2. It is assumed, that the repo exists with the code, but is not deployed yet.<br/>
3. The user will use the bot DockrRockr to deploy the bot. DockrRockr will then create a Docker file and upload it to this repo.<br/>
4. It will keep tracking for any commits made on this repo thereafter and create an image on AWS.<br/>
5. Once the image is ready it will prompt the user and then deploy the image and provide the user with te link.<br/>
6. Any changes that are made, will start a process of creation of a new image, and the changes will be reflected on AWS.<br/>

##### Use Case #1 Implementation (20%)

##### Use Case #1 Definition
```
Use Case 1 : Creating the Dockerfile + ChatOps
1 Preconditions
   User must have a Slack account.
   User must have a GitHub account.
   User must have a DockerHub account.
   User must have an AWS account, and token.
2 Main Flow
   User will invoke bot using command 'hello' [S1]. Bot will return a response[S2]. User gives a command of creating a docker file [S3]. User completes form to fill in user details[S4].
3 Subflows
  [S1] User writes command as 'hello'
  [S2] Bot will return a response with the user's username. 
  [S3] User writes the command, 'Create a Docker'.
  [S4] Bot responds with "Please fill this form to create a dockerfile, http://localhost:8081/"
```
##### Workflow as per Screencast: <br/> 
1. User opens the general channel of SE_DockrRockr. In the #general channnel, the word 'commands' is written to see the list of commands the bot responds to. <br/>
2. The bot displays the commands as: 'hello', 'create a docker', 'yes deploy'. <br/>
3. User enters the keyword as 'hello'. <br/>
4. The bot responds with the user's username and a greeting. It prompts the next command. <br/>
5. The user enters 'create a docker'. <br/>
6. The bot responds with "Please fill this form to create a dockerfile, http://localhost:8081/".
7. There is a form available at http://localhost:8081/, the user fills details there. <br/>
8. The dockerfile is created and places in the user repository. <br/>
9. The webhook has been created too. <br/>

##### Use Case #2 Implementation (20%)

##### Use Case #2 Definition
```
Use Case 2 : Notifying the user when the Docker image is ready
1 Preconditions
   Docker file is in user's repo, new code pushed by user.
2 Main Flow
  User push some code, docker image is uploaded on DockerHub[S1].
  Using a webhook slack bot gets repsonse, notifies the user[S2]
```

##### Workflow as per Screencast:<br/>
1. <br/>
2. <br/>
3. <br/>
4. <br/>
5. <br/>

##### Use Case #3 Implementation (20%)

##### Use Case #3 Definition
```
Use Case 3 : Deploy the Docker Image on AWS.

Ask the user whether he wants to deploy the latest docker image, if yes, deploy it on AWS.

1 Preconditions
   User must have AWS access.
2 Main Flow
   User will request deployment of the lastest docker image [S1]. Bot deploys image and posts link [S2].
3 Subflows
  [S1] User writes command 'deploy'.
  [S2] Bot will return link. 
  The message looks like: "Your app has been deployed at http://amazonaws.com/mock-url"
```

##### Workflow as per Screencast:<br/>
1. <br/>
2. <br/>
3. <br/>
4. <br/>
5. <br/>

Assumptions:<br/>
One repo for each ip address of a team. 

### Task Tracking

[Time Tracking Worksheet](WORKSHEET.md)
