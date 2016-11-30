## Milestone - Deploy

#### Bot Name: DockrRockr

Team Members: <br/>
Krunal Gala - kgala <br/>
Jigar Sharda - jsharda<br/>
Shrey Sanghavi - ssangha<br/>
Rahul Shah - rshah5<br/>
Samrudhi Sharma - ssharm17<br/>

### Screencast

### Steps for Deployment 
1. pip install boto
2. pip install ansible
3. export all aws credentials and ansible host checking = false
4. Create security group in EC2 and set it to allow all incoming and outgoing traffic
5. Replace the key pair in the ansible script with your keypair found in IAM management and also replace the location of the private key inside ansible script
6. run the deployment command with the slack token and the port where you want the DockrRocker app to be deployed
7. Once this is done, wait for the ansible script to run

### Acceptance Testing Instructions - TA

### Task Tracking

[Time Tracking Worksheet](WORKSHEET.md)



