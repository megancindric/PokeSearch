pipeline {

    agent any

    environment {
        def nodejsTool = tool name: 'node-20-tool', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        def dockerTool = tool name: 'docker-latest-tool', type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool'
        path = "${nodejsTool}/bin:${dockerTool}/bin:${env.PATH}"
    }

    stages {

        stage("Install Dependencies"){
            steps {
                sh 'npm install'
            }
        }

        stage("Create Production Build"){
            steps {
                sh 'npm run-script build'
            }
        }

        stage("Build Docker Image"){
            steps {
                sh '''
                    docker images
                    docker build -t megancindric/pokesearch:latest .
                    docker images
                '''
            }
        }
        stage("Push Docker Image"){
            steps {
                sh 'Pushing to Docker Hub...'
                // Access Personal Docker Credentials
                // Use them to log in to docker through login CLI command

                // docker login username password
                // push image
            }
        }

        stage("Deploy to EC2"){
            steps {
                sh 'Deploying to EC2 instance...'
            }
            // SSH into remote server
            // Shut down current running image
            // Pull new image that was pushed
            // Launch new image onto remote server
        }


    }
}