import de.hybris.platform.acceleratorpipeline.spartacuspipeline.steps.BuildSteps

pipeline {
    node('swarm') {
        triggers {
            pollSCM('H/5 * * * *')
        }
        stage('e2e tests') {
            new BuildSteps().execute()
        }
        stage('notify') {
            currentBuild.result = currentBuild.result ?: 'SUCCESS'
            githubNotification(currentBuild.result)
            if (currentBuild.result != 'SUCCESS'){
                slackSend channel:"#ec-accx-ci" , message: ":nuclear-bomb: Build on branch ${env.BRANCH_NAME} failed. ${env.BUILD_URL}", color: "bad"
            }
        }
    }
}
