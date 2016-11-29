npm install
node aws.js

export SLACK_TOKEN=$1

# remote instance is AMI
ansible-playbook -i inventory setup_ami.yml
# remote instance is Centos
ansible-playbook -i inventory setup.yml

# Based heavily on the Ansible documentation on EC2:
# http://docs.ansible.com/ec2_module.html
