pipeline {
    agent any
    
    environment {
        REGISTRY = "localhost:5000"
        IMAGE_NAME = "taskflow-app"
        VERSION = "v${env.BUILD_ID}"
    }

    stages {
        stage('Checkout Git') {
            steps {
                echo 'Récupération du code source...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installation des modules Node.js...'
                sh 'npm ci'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Exécution des tests unitaires...'
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Construction de l\'image Docker...'
                sh "docker build -t ${REGISTRY}/${IMAGE_NAME}:${VERSION} ."
                sh "docker tag ${REGISTRY}/${IMAGE_NAME}:${VERSION} ${REGISTRY}/${IMAGE_NAME}:latest"
            }
        }
        
        stage('Push to Registry') {
            steps {
                echo 'Envoi de l\'image vers le registre local...'
                sh "docker push ${REGISTRY}/${IMAGE_NAME}:${VERSION} || echo 'Image buildée localement.'"
            }
        }
    }
    
    post {
        always {
            echo 'Nettoyage de l\'espace de travail...'
            cleanWs()
        }
    }
}
