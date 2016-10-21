## Bot

#### Bot Name: DockrRockr

Team Members: <br/>
Krunal Gala - kgala <br/>
Jigar Sharda - jsharda<br/>
Shrey Sanghavi - ssangha<br/>
Rahul Shah - rshah5<br/>
Samrudhi Sharma - ssharm17<br/>

### Use Cases

2. Notifying the user when the Docker image is ready
Once the user pushes new ode to the Git repository, it will trigger the creation of the image on DockerHub.
The user  receives a notification on Slack once the image is ready.

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
```
Use Case 2 : Notifying the user when the Docker image is ready
1 Preconditions
   Docker file is in user's repo, new code pushed by user.
2 Main Flow
  User push some code, docker image is uploaded on DockerHub[S1].
  Using a webhook slack bot gets repsonse, notifies the user[S2]
```
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

### Mocking Service Component


### Bot Implementation

In implementing your bot, you will have to primary tasks:

* **Bot Platform**: Implement hooks into platform. You should be able to have a fully operational bot within your platform (Slack) that can response to basic commands.


* **Bot Integration**: Implement basic conversation/interaction with bot. You need to support the ability to fully have a conversation with an bot as defined by your use cases.

### Selenium Testing

[Selenium Testing Module](https://github.ncsu.edu/jsharda/DockrRockr/tree/master/Selenium)

### Task Tracking

[Time Tracking Worksheet](WORKSHEET.md)

### Screencast

[![Screencast](https://i1.ytimg.com/vi/AJkJPcYPFfs/default.jpg)](https://youtu.be/AJkJPcYPFfs)


### Extra Credit
![travis_build](https://media.github.ncsu.edu/user/4148/files/fd76a934-9729-11e6-83c0-2fc7935c526c)
[Sauce Labs](https://github.ncsu.edu/jsharda/DockrRockr/tree/saucelabs)

