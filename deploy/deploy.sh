pip install boto
pip install ansible
# Prerequisites for running this code
# Ansible installed on the this machine
# npm, node, python installed
# ENV TOKENS - AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_KEY_PATH

# Install all the package dependencies
npm install

# Script to spin up ec2 instance
node aws.js rahul /Users/Rahul/Downloads/rahul.pem

# This will create an invntory file which will be used by ansible to perform the configuration mgmt.
# The inventory will contain the ip address of ec2 instance, the user of the instance and private key for the following instance
# This playbook deploys our code with all the dependencies
ansible-playbook -i inventory setup_ami.yml
