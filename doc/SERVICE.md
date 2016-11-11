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

Assumptions:<br/>
One repo for each ip address of a team. 

### Task Tracking

[Time Tracking Worksheet](WORKSHEET.md)
