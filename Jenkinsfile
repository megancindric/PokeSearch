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
                sh """
                    docker images
                    docker build -t megancindric/pokesearch:$BUILD_NUMBER .
                    docker images
                """
            }
        }
        stage("Push Docker Image"){
            steps {
                sh 'echo "Pushing Docker Image to Docker Hub..."'
                withCredentials([usernamePassword(credentialsId: 'personal-docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh """
                        echo ${DOCKER_USERNAME}
                        docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}
                        docker push megancindric/pokesearch:$BUILD_NUMBER
                    """
                }
            }
        }

        stage("Deploy New Image to EC2"){
            steps {
                sh 'echo "Deploying to EC2 instance..."'

                sshagent(['poke-search-ubuntu-kp-ssh-credentials']) {
                    script {
                        def containerDoesExist = sh(returnStdout: true, script: "ssh -o StrictHostKeyChecking=no ubuntu@18.234.103.198 \"docker ps -aqf 'name=poke-search-hosted'\"").trim()
                        if (containerDoesExist){
                            sh "ssh -o StrictHostKeyChecking=no ubuntu@18.234.103.198 \"docker stop poke-search-hosted && docker rm poke-search-hosted\""
                        }
                        else {
                            echo "No container found matching poke-search-hosted"
                        }
                    }
                    sh """
                        SSH_COMMAND="ssh -o StrictHostKeyChecking=no ubuntu@18.234.103.198"
                        \$SSH_COMMAND "docker pull megancindric/pokesearch:$BUILD_NUMBER"
                        \$SSH_COMMAND "docker run -d -p 80:80 --name poke-search-hosted megancindric/pokesearch:$BUILD_NUMBER"
                    """
                }
            }
        }
    }
}