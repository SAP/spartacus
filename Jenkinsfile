import de.hybris.platform.acceleratorpipeline.spartacuspipeline.steps.BuildSteps

node('swarm') {
    properties([
        pipelineTriggers([pollSCM('H/5 * * * *')])
    ])
    try {
        stage('e2e tests') {
            new BuildSteps().execute()
        }
    }
    catch (e) {
        echo "Caught exception in pipeline: ${e}"
        currentBuild.result = 'FAILURE'
    }
    finally {
        stage('notify') {
            currentBuild.result = currentBuild.result ?: 'SUCCESS'
                githubNotification(currentBuild.result)
                if (currentBuild.result != 'SUCCESS'){
                    slackSend channel:"#ec-accx-ci" , message: ":nuclear-bomb: Build on branch ${env.BRANCH_NAME} failed. ${env.BUILD_URL}", color: "bad"
                }
        }
    }
}

