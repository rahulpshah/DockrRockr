# Improvement to Design Document

Team Members: 

Krunal Gala - kgala

Jigar Sharda - jsharda

Shrey Sanghavi - ssangha

Rahul Shah - rshah5

Samrudhi Sharma - ssharm17

## Brief Description of Bot<br/>
The main purpose of the bot is to expedite the deployment process. 
The configuration the user needs to provide are the credentials and dockerhub and rest everything is handled by the bot.<br/>
Any changes that the user does to the code, will be detected by the bot and the user will have an option to deploy it on AWS<br/>
Types of applications supported:<br/>
Rails App with PostgreSQL or MySQL database: https://semaphoreci.com/community/tutorials/dockerizing-a-ruby-on-rails-application <br/>

## Activity 1: Use Cases: <br/>
1. Creating the Dockerfile + ChatOps
The bots chats with the user to gather the requirements needed to build the Dockerfile.
The bot uses this information to create a generic dockerfile which it will use to store it on DockerHub.

2. Continuous Deployment of RoR application
Once the user pushes new ode to the Git repository, it will trigger the creation of the image on DockerHub.
3. Notifying the user when the Docker image is ready
The user  receives a notification on Slack once the image is ready.


## Activity 2: DockerHub vs Own Registry <br/>

From the website of Docker Registry,
Users looking for a zero maintenance, ready-to-go solution are encouraged to head-over to the Docker Hub, which provides a free-to-use, hosted Registry, plus additional features (organization accounts, automated builds, and more).
Since we are doing continuous deployment, I think it would be better if we use DockerHub. 


