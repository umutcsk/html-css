pipeline {
    agent any
    parameters {
        gitParameter branchFilter: 'origin/(.*)', defaultValue: 'main', name: 'BRANCH', type: 'PT_BRANCH'
    }

    environment {
        DOCKER_IMAGE = "umutcskn681/html-web-app"
        DOCKER_TAG = "v1.0"
        DOCKER_CREDENTIALS = "dockerhub"
        SONARQUBE_CREDENTIALS = "jenkins-sonar"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: "${params.BRANCH}", url: 'https://github.com/jenkinsci/git-parameter-plugin.git'
            }
        }

        stage('Run SonarQube Analysis') {
            when {
                branch "${params.BRANCH}"
            }
            environment {
                scannerHome = tool 'jenkins-sonar'
            }
            steps {
                withSonarQubeEnv(credentialsId: 'jenkins-sonar', installationName: 'jenkins-sonar') {
                    sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=umut -Dsonar.projectName=umut"
                }
            }
        }

        stage('Pull Docker Image') {
            when {
                branch "${params.BRANCH}"
            }
            steps {
                script {
                    echo "Pulling Docker image from Docker Hub..."
                    sh "docker pull ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }

        stage('Build Docker Image') {
            when {
                branch "${params.BRANCH}"
            }
            steps {
                script {
                    echo "Building new Docker image..."
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Push Docker Image') {
            when {
                branch "${params.BRANCH}"
            }
            steps {
                script {
                    echo "Pushing Docker image to Docker Hub..."
                    withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                        sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            when {
                branch "${params.BRANCH}"
            }
            steps {
                script {
                    echo "Applying Kubernetes deployment and service..."
                    sh "kubectl apply -f deployment.yaml"
                    sh "kubectl apply -f service.yaml"
                }
            }
        }
    }
}
