pipeline {
    agent any

    environment {
        REGISTRY = 'ghcr.io/etudiant11-hub'
        IMAGE_NAME = 'taskflow-saas'
    }

    stages {
        stage('Clonage & Initialisation') {
            steps {
                echo '=== CLONAGE DU DEPOT ==='
                checkout scm
            }
        }

        stage('Installation des Dépendances') {
            steps {
                echo '=== INSTALLATION NPM ==='
                sh 'npm install'
            }
        }

        stage('Validation & Tests (DEV/TEST)') {
            steps {
                echo '=== LANCEMENT DES TESTS AVEC CONFIG TEST ==='
                // On injecte le fichier test.env pour les tests
                sh 'export $(cat config/test.env | xargs) && npm test'
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                echo '=== CONFIGURATION DU BUILD DOCKER ==='
                // Simulation du build de l'image tagguée avec le numéro de build Jenkins
                echo "Building image: ${env.REGISTRY}/${env.IMAGE_NAME}:${env.BUILD_NUMBER}"
            }
        }

        stage('Déploiement en Staging (TEST)') {
            steps {
                echo '=== DEPLOIEMENT SUR LE SERVEUR DE TEST ==='
                sh 'export $(cat config/test.env | xargs) && echo "TaskFlow lancé sur le port $PORT en mode $NODE_ENV"'
            }
        }

        stage('Approbation Manuelle pour la PROD') {
            steps {
                checkpoint 'Passage en Production'
                input message: "Valider le déploiement de la version #${env.BUILD_NUMBER} en Production ?", ok: "Déployer !"
            }
        }

        stage('Déploiement en Production') {
            steps {
                echo '=== DEPLOIEMENT SUR LE CLUSTER DE PROD ==='
                sh 'export $(cat config/prod.env | xargs) && echo "TaskFlow LIVE sur le port $PORT en mode $NODE_ENV"'
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline terminé avec succès pour le build #${env.BUILD_NUMBER} !"
        }
        failure {
            echo "❌ Le build #${env.BUILD_NUMBER} a échoué. Vérifiez les logs."
        }
    }
}