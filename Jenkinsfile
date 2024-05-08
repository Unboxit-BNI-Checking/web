pipeline {
    agent any

    environment {
        docker_login_password = credentials('b6d657b1-feea-4ff0-91f6-f71c9602f0cc')
    }

    stages {
        stage('Delete the old container') {
            steps {
                echo 'Deleting old container'
                sh 'docker rm -f unboxit-web'
            }
        }

        stage('Delete unused images') {
            steps {
                echo 'Deleting unused images'
                sh 'docker image prune -a -f'
            }
        }

        stage('Login docker using unboxit account') {
            steps {
                echo 'Pulling the image'
                sh "docker login ghcr.io -u jonathanrichard13 -p '${docker_login_password.toString()}'"
            }
        }

        stage('Pull the latest image') {
            steps {
                echo 'Pulling the image'
                sh 'docker pull ghcr.io/unboxit-bni-checking/web:latest'
            }
        }

        stage('Run the container on port 1201') {
            steps {
                echo 'Running the container'
                sh 'docker run -d --restart unless-stopped --name unboxit-web -p 1201:4200 ghcr.io/unboxit-bni-checking/web:latest'
            }
        }

        stage('Check wether the container is running or not') {
            steps {
                echo 'Checking the container'
                sh 'docker ps'
            }
        }
    }
}