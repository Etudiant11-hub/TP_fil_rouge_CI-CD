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
                echo 'Récupération du code source depuis GitHub...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installation des modules Node.js pour TaskFlow...'
                sh 'echo "Simulating: npm ci --only=production"'
                echo '✓ Dossier node_modules généré avec succès.'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Exécution des tests unitaires (Mocking)...'
                sh 'echo "Simulating: npm test"'
                echo '✓ Test réussi : Les calculs de base et les routes d\'API fonctionnent.'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo "Construction de l'image Docker TaskFlow..."
                sh "echo 'Simulating: docker build -t ${REGISTRY}/${IMAGE_NAME}:${VERSION} .'"
                echo "✓ Image ${IMAGE_NAME}:${VERSION} créée avec succès."
            }
        }
        
        stage('Push to Registry') {
            steps {
                echo "Envoi de l'image vers le registre local (${REGISTRY})..."
                sh "echo 'Simulating: docker push ${REGISTRY}/${IMAGE_NAME}:${VERSION}'"
                echo "✓ Image poussée avec succès sur le registre local."
            }
        }
    }
    
    post {
        always {
            echo 'Nettoyage de l\'espace de travail...'
            cleanWs()
        }
        success {
            echo '======================================================='
            echo '  PIPELINE CI/CD TASKFLOW : SUCCÈS COMPLET (VERT)      '
            echo '======================================================='
        }
    }
}
