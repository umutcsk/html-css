pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "umutcskn681/html-web-app"
        DOCKER_TAG = "v1.0"
        DOCKER_CREDENTIALS = "dockerhub"
        SONARQUBE_CREDENTIALS = "jenkins-sonar"
        PATH = "/opt/sonar-scanner/bin:$PATH" // SonarQube Scanner yolu burada ekleniyor
    }

    stages {
        stage('Run SonarQube Analysis') {
            steps {
                script {
                    // SonarQube analizini başlat
                    echo "Running SonarQube analysis..."
                    withSonarQubeEnv(credentialsId: 'jenkins-sonar', installationName: 'jenkins-sonar') {
                        sh """
                            echo "Starting SonarQube Scanner"
                            sonar-scanner -Dsonar.projectKey=umut2 -Dsonar.projectName=umut2 -Dsonar.sources=.
                        """
                    }
                }
            }
        }

        stage('Wait for SonarQube Analysis') {
            steps {
                script {
                    // SonarQube analizinin tamamlanmasını bekle
                    echo "Waiting for SonarQube analysis results..."
                    timeout(time: 1, unit: 'HOURS') {
                        waitForQualityGate abortPipeline: true
                    }
                }
            }
        }

        stage('Pull Docker Image') {
            steps {
                script {
                    echo "Pulling Docker image from Docker Hub..."
                    sh "docker pull ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building new Docker image..."
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Push Docker Image') {
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
            steps {
                script {
                    echo "Applying Kubernetes deployment and service..."
                    sh "kubectl apply -f deployment.yaml"
                    sh "kubectl apply -f service.yaml"
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Pipeline succeeded.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
