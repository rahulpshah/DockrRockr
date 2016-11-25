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
2. It is assumed, that the repository exists with the code, but is not deployed yet.<br/>
3. The user will use the bot DockrRockr to deploy the bot. DockrRockr will then create a Docker file and upload it to this repository.<br/>
4. It will keep track for any commits made on this repository thereafter and create an image on AWS instance.<br/>
5. Once the image is ready, it will prompt the user and then deploy the image and provide the user with the link.<br/>
6. Any changes that are made, will start a rebuild the image, and the changes will be reflected on AWS.<br/>

##### Use Case #1 Implementation (20%)

##### Use Case #1 Definition
```
Use Case 1 : Creating the Dockerfile + ChatOps
1 Preconditions
   User must have a Slack account.
   User must have a GitHub account.
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
6. The bot responds with "Please fill this form to create a dockerfile, `http://DOCKERSERVER:8081/`. <br/>
7. There is a form available at `http://DOCKERSERVER:8081/`, the user fills details there. <br/>
8. When the dockerfile is created it is pushed onto the repository and git hook is created. <br/>

##### Use Case #2 Implementation (20%)

##### Use Case #2 Definition
```
Use Case 2 : Notifying the user when the Docker image is ready
1 Preconditions
   Docker file is in user's repo, new code pushed by user.
2 Main Flow
  User push some code, docker image is uploaded on DockerHub[S1].
  Using a web-hook slack bot gets response, notifies the user[S2]
```

##### Workflow as per Screencast:<br/>
1. The dockerfile is created and placed in the user repository. <br/>
2. Notifications are received indicating the file is uploaded, and it is put in the Git Repository. <br/>
3. Changes made to the repository, from changing the README.md, to deleting the index.php will be reflected. <br/>

##### Use Case #3 Implementation (20%)

##### Use Case #3 Definition
```
Use Case 3 : Deploy the Docker Image on AWS Instance.

Ask the user whether he wants to deploy the latest docker image, if yes, deploy it on AWS.

1 Preconditions
   User must have AWS instance set up.
2 Main Flow
   User will request deployment of the latest docker image [S1]. Bot deploys image and posts link [S2].
3 Subflows
  [S1] User writes command 'deploy'.
  [S2] Bot will return link. 
  The message looks like: "Your image is deployed at http://amazonaws.com/mock-url"
```

##### Workflow as per Screencast:<br/>
1. The messages displayed to the user are 'File Uploaded', 'Your image is being created. I will ping you when it's done.', 'Docker image is ready do you want to deploy?'.<br/>
2. The user enters 'yes deploy'.<br/>
3. The message that will be displayed is 'Your image is deployed at http://`USER_HOST`'<br/>
4. Now any changes to made to the repository, it will recreate the image and ask the user if it should deploy the image again. <br/>

### Task Tracking

[Time Tracking Worksheet](WORKSHEET.md)
