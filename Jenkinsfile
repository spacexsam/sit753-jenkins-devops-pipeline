pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
    IMAGE_NAME = "sit753-devops-app"
    CONTAINER_NAME = "sit753-app"
    APP_PORT = "3000"
    PATH = "/usr/local/bin:/opt/homebrew/bin:/Applications/Docker.app/Contents/Resources/bin:$PATH"
}
    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building Docker image...'
                sh 'npm install'
                sh 'docker build -t $IMAGE_NAME:$BUILD_NUMBER .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running Jest tests...'
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running basic code quality check...'
                sh 'npm audit || true'
            }
        }

        stage('Security') {
            steps {
                echo 'Running Trivy security scan...'
                sh '/opt/homebrew/bin/trivy image $IMAGE_NAME:$BUILD_NUMBER || true'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Docker container...'
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                docker run -d -p $APP_PORT:3000 --name $CONTAINER_NAME $IMAGE_NAME:$BUILD_NUMBER
                '''
            }
        }

        stage('Release') {
            steps {
                echo 'Creating release tag...'
                sh 'docker tag $IMAGE_NAME:$BUILD_NUMBER $IMAGE_NAME:release-$BUILD_NUMBER'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Monitoring application health...'
                sh 'sleep 5'
                sh 'curl -f http://localhost:$APP_PORT/health'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed.'
        }
    }
}