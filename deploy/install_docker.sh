# Perform these 2 commands on your instance to install docker on it
# Please make sure to exit and login before running the DockrRockr commands
# Here username is the user who wishes to deploy the app
curl -sSL https://get.docker.com/ | sh
sudo usermod -aG docker <username>
