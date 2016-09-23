## **CSC 510 Software Engineering: Design Document**

Team Members:

1. Krunal Gala - kgala

2. Jigar Sharda - jsharda

3. Shrey Sanghavi - ssangha

4. Rahul Shah - rshah5

5. Samrudhi Sharma - ssharm17

## **Problem Statement**

*What is the problem? *

A user wants to easily deploy an application which can be accessed by a public URL. The user faces a myriad of problems which are stated below: 

1. The developer has to make a lot of configurations to deploy an application.

2. The commands are repetitive which can be easily automated.

3. The user has to constantly check the build and deploy status 

*Why is it a problem?*

The main reason this bot is beneficial as it alleviates the developers from the burden of doing the deployment operations of the applications.

## **   Bot Description**

*What does your bot do? *The main purpose of the bot is to expedite the deployment process. The configuration he needs to provide are the credentials of the database and dockerhub and reset everything is handled by the bot. 

*Why bot is good solution?*A bot is a good solution to this problem as the tasks are repetitive and can be automated.

*Does your bot have a conversation with users (e.g. hubot), or does it just response to events (e.g., coveralls bot on github)?*

DockrRockr Bot sends a notification to the user on slack whenever an event occurs on Docker Hub (i.e. a new docker image is generated for the new code that the user pushed on github). Then it starts a conversation with the user whether he wants to deploy the new docker image to the existing EC2 instance. Based on the user response, the bot deploys the new image and provides the user with the link to the deployed content

### **Design Sketches**

* *Create a wireframe mockup of your bot in action.*

![image alt text](image_0.png)

![image alt text](image_1.png)



* *Create a storyboard that illustrates the primary task that a user undergoes with bot.*

![image alt text](image_2.png)

## **Architecture Design**

* *Create a diagram that illustrates the components of your bot, the platform it is embedded in, third party services it may use, data storage it may require, etc.*

![image alt text](image_3.png)

* *Describe the architecture components in text. This should be a few paragraphs*

    * The user provides the DockrRockr with AWS, Docker credentials,docker file and it picks the docker image from docker hub for the user’s repository and deploys it on the production server and notifies user when something changes in docker hub.

    * The user works on his local environment and pushes the code on github. This code is synchronized with Docker Hub in order to build the new docker image for latest changes. Whenever a new image is built, docker rockers notifies the user about this new build. If the user asks the bot to deploy this, bot asks user for credentials for first time and stores them in a database for future authentication. So once it authorizes and gets user permission, DockrRockr asks docker hub for the latest build and in return gets the newly build docker image. This image is now deployed to production server and when it is running, DockrRockr notifies the user about it.

* *Describe any constraints or guidelines that should be established in building software for your architecture (e.g., a bot cannot send data from one user to another user)*

    * The user has to have to an account on docker hub and on the production server.

    * The user has to push the docker file in git repo in order to build docker images automatically on docker hub.

### **Design Patterns**

The main patterns identifies for this application are listed as below:

1. Facade Pattern

	All bots follow the facade pattern. The bots encapsulates the common repetitive tasks by the use of more generic command which defines the purpose of the task.

2. Observer Pattern

	The bot follows the Observer pattern by observing the build status at DockerHub. It notifies the user when the build status changes. The user will notified by DockrRockr that the build status changed

