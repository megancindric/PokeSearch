pipeline {

    agent any

    stages {

        stage("Build"){
            steps {

                script {
                    def nodejsTool = tool name: 'node-20-tool', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodejsTool}/bin:${env.PATH}"
                }

                sh "echo 'Building the Application...'"
                sh 'npm install'
                sh 'npm run-script build'
            }
        }

        stage("Docker"){
            steps {
                sh "echo 'Dockerizing the Application...'"
            }
        }


    }
}