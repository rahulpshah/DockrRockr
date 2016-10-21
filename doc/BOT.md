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
   User must have google calendar api tokens in system.
2 Main Flow
   User will request meeting and provide list of attendees [S1]. Bot will provide  possible meeting times and user confirms [S2]. Bot creates meeting and posts link [S3].
3 Subflows
  [S1] User provides /meeting command with @username,@username list.
  [S2] Bot will return list of meeting times. User will confirm time.
  [S3] Bot will create meeting and post link to google calendar event.
4 Alternative Flows
  [E1] No team members are available.
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

Create a screencast of your bot performing your three use cases.
Demonstrate your selenium tests being executed.

### Extra Credit
[Sauce Labs](https://github.ncsu.edu/jsharda/DockrRockr/tree/saucelabs)

