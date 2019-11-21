node {
	def branchName="${BRANCH_NAME}"
	String jobName = "${JOB_NAME}"
    boolean ssr_enabled = "${SSR_ENABLED}"
    
	def buildParameters = loadPlugin url:"https://github.tools.sap/cx-commerce/cds-argonauts-pipeline-configuration.git", filename: "configuration/jenkinsfile-spartacus.groovy", credentialsId: 'github-tools-sap-rw', branch: 'feature/ARGO-5676'
	def pipeline = loadPlugin url:"https://github.tools.sap/cx-commerce/cds-argonauts-pipeline-configuration.git", filename: "pipelines/spartacus.groovy", credentialsId: 'github-tools-sap-rw', branch: 'feature/ARGO-5676'
	print('Generating Parameters.......')
	buildParameters.generateParameters()
	print('Parameters generated........')
	
	pipeline.execute(branchName, ssr_enabled)
}
