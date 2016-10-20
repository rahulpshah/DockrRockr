## Bot

Bot Name: DockrRockr

Team Members: 

Krunal Gala - kgala

Jigar Sharda - jsharda

Shrey Sanghavi - ssangha

Rahul Shah - rshah5

Samrudhi Sharma - ssharm17

### Use Cases

1. Creating the Dockerfile + ChatOps
The bots chats with the user to gather the requirements needed to build the Dockerfile.
The bot uses this information to create a generic dockerfile which it will use to store it on DockerHub.

2. Notifying the user when the Docker image is ready
Once the user pushes new ode to the Git repository, it will trigger the creation of the image on DockerHub.
The user  receives a notification on Slack once the image is ready.

3. Deploy the Docker Image on AWS.
Ask the user whether he wants to deploy the latest docker image, if yes, deploy it on AWS.


This is an example use case:
```
Use Case: Create a meeting
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

### Mocking Service Component


### Bot Implementation

In implementing your bot, you will have to primary tasks:

* **Bot Platform**: Implement hooks into platform. You should be able to have a fully operational bot within your platform (Slack) that can response to basic commands.


* **Bot Integration**: Implement basic conversation/interaction with bot. You need to support the ability to fully have a conversation with an bot as defined by your use cases.

### Selenium Testing


### Task Tracking

### Screencast

Create a screencast of your bot performing your three use cases.
Demonstrate your selenium tests being executed.

