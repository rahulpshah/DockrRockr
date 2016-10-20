# Improvement to Design Document

Team Members: 

Krunal Gala - kgala

Jigar Sharda - jsharda

Shrey Sanghavi - ssangha

Rahul Shah - rshah5

Samrudhi Sharma - ssharm17

## Brief Description of Bot<br/>

The main purpose of the bot is to expedite the deployment process. <br/>

1. The configuration the user needs to provide are the credentials and dockerhub and rest everything is handled by the bot.<br/>
2. Any changes that the user does to the code, will be detected by the bot and the user will have an option to deploy it on AWS<br/>

Types of applications supported:<br/>
Rails App with PostgreSQL or MySQL database: https://semaphoreci.com/community/tutorials/dockerizing-a-ruby-on-rails-application <br/>

## Action 1: Define additional use cases beyond simple deployment. <br/>
## Action 2: Relate to ChatOps

### Use Cases:
##### 1. Creating the Dockerfile + ChatOps
A. The bots chats with the user to gather the requirements needed to build the Dockerfile. <br/>
B. The bot uses this information to create a generic dockerfile which it will use to store it on DockerHub. <br/>

##### 2. Notifying the user when the Docker image is ready
Once the user pushes new ode to the Git repository, it will trigger the creation of the image on DockerHub. <br/>
The user  receives a notification on Slack once the image is ready.<br/>

##### 3. Deploy the Docker Image on AWS.
Ask the user whether he wants to deploy the latest docker image, if yes, deploy it on AWS. <br/>


## Action 3: You don't need DockerHub, you can use your own Docker registry.<br/>

##### DockerHub vs Own Registry
From the website of Docker Registry, <br/>
*Users looking for a zero maintenance, ready-to-go solution are encouraged to head-over to the Docker Hub, which provides a free-to-use, hosted Registry, plus additional features (organization accounts, automated builds, and more).* <br/>
Since we are doing continuous deployment, I think it would be better if we use DockerHub. 


