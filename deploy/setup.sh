export SLACK_TOKEN=$1

# remote instance is AMI
ansible-playbook -i inventory setup_ami.yml
# remote instance is centos
ansible-playbook -i inventory setup.yml

