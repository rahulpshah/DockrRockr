## Milestone - Deploy

#### Bot Name: DockrRockr

#### Team Members: <br/>
Krunal Gala - kgala <br/>
Jigar Sharda - jsharda<br/>
Shrey Sanghavi - ssangha<br/>
Rahul Shah - rshah5<br/>
Samrudhi Sharma - ssharm17<br/>

### Screencast

[![Screencast](https://i1.ytimg.com/vi/GRadbE_9ZZs/default.jpg)](https://youtu.be/GRadbE_9ZZs)

### Deployment Scripts

1. [install_docker.sh](https://github.ncsu.edu/jsharda/DockrRockr/blob/master/deploy/install_docker.sh)
2. [install_redis.sh](https://github.ncsu.edu/jsharda/DockrRockr/blob/master/deploy/install_redis.sh)
3. [script.sh](https://github.ncsu.edu/jsharda/DockrRockr/blob/master/deploy/script.sh)
4. [setup.sh](https://github.ncsu.edu/jsharda/DockrRockr/blob/master/deploy/setup.sh)

### Ansible Playbooks

1. [deploy.yml](https://github.ncsu.edu/jsharda/DockrRockr/blob/master/deploy/deploy.yml)
2. [setup.yml](https://github.ncsu.edu/jsharda/DockrRockr/blob/master/deploy/setup.yml)
3. [setup_ami.yml](https://github.ncsu.edu/jsharda/DockrRockr/blob/master/deploy/setup_ami.yml)

### Steps for Deployment 
1. pip install boto
2. pip install ansible
3. export all aws credentials and ansible host checking = false
4. Create security group in EC2 and set it to allow all incoming and outgoing traffic
5. Replace the key pair in the ansible script with your keypair found in IAM management and also replace the location of the private key inside ansible script
6. run the deployment command with the slack token and the port where you want the DockrRocker app to be deployed
7. Once this is done, wait for the ansible script to run

### Acceptance Testing Instructions - TA

**** Note: Testing should be done on the General channel. <br/>
**** Note: The bot can be accessed with the signature @dockr_rockr


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
##### Acceptance Test Instructions for Use Case 1

1. Clone this repository. Cd into it DockrRockr/deploy. 
2. Run the command: ansible-playbook -i inventory deploy.yml --extra-vars="SLACK_TOKEN=INSERTTOKENHERE PORT=8081"
3. A new EC2 instance will be provisioned, this change can be seen the AWS console. This step may take some time.
4. One the instance is up and provisioned, go to the General channel (#general) and invoke the bot using the command @dockr_rockr hello.
5. A meesage will be displayed as: Hi, username! What can I do for you today? You can start by asking me to create a docker file.
6. The next command will be: @dockr_rockr create a docker
7. A link for a form will be displayed to enter the relevant values.

##### Use Case #2 Definition
```
Use Case 2 : Notifying the user when the Docker image is ready
1 Preconditions
   Docker file is in user's repo, new code pushed by user.
2 Main Flow
  User push some code, docker image is uploaded on DockerHub[S1].
  Using a web-hook slack bot gets response, notifies the user[S2]
```
##### Acceptance Test Instructions for Use Case 2

1. Once the form values are filled. 
2. The bot responds with the message: Here is your docker file!
3. Next message is: File Uploaded
4. Next message is: File Pushed on your Git Repository!
5. Next message is: Your image is being created. I will ping when its done.
6. Next message is: Docker image is ready. Do you want to deploy it?

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
##### Acceptance Test Instructions for Use Case 3

1. Next user command is: @dockr_rockr Yes deploy
2. A message is displayed with the link of the deployed app.
3. Now when code in the repository is changed. A message can be seen on the slack channel: Your image is being created. I will ping you when its done. 
4. Next message is: Docker image is ready. Do you want to deploy it?
5. The response should be: @dockr_rockr Yes deploy
6. The changes will be reflected again on the link.

### Task Tracking

[Time Tracking Worksheet](WORKSHEET.md)



