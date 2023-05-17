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
                sh 'echo "Pushing Docker Image to Docker Hub..."'
                withCredentials([usernamePassword(credentialsId: 'personal-docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "echo ${DOCKER_USERNAME}"
                    sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                    sh "docker push megancindric/pokesearch:latest"
                }
            }
        }

        stage("Deploy to EC2"){
            steps {
                sh 'echo "Deploying to EC2 instance..."'
            }
            // SSH into remote server
            // Shut down current running image
            // Pull new image that was pushed
            // Launch new image onto remote server
        }


    }
}