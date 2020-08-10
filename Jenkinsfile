pipeline {
  agent { docker { image 'node:latest' } }
  environment {
        HOME = '.'
    }
  stages {
    stage('Build') {
      steps {
        echo 'Building..'
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        echo 'Testing..'
        sh 'npm run test'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploying 1/2....'
      }
    }

  }
}