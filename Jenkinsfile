node {
	def branchName="${BRANCH_NAME}"
	String jobName = "${JOB_NAME}"
	def serviceName = jobName.substring(0, jobName.indexOf("/"))
	print('serviceName:' + serviceName)
	def buildParameters = loadPlugin url:"https://github.tools.sap/cx-commerce/cds-argonauts-pipeline-configuration.git", filename: "configuration/jenkinsfile.groovy", credentialsId: 'github-tools-sap-rw', branch: 'master'
	def pipeline = loadPlugin url:"https://github.tools.sap/cx-commerce/cds-argonauts-pipeline-configuration.git", filename: "pipelines/spartacus.groovy", credentialsId: 'github-tools-sap-rw', branch: 'feature/ARGO-5676'
	print('Generating Parameters.......')
	buildParameters.generateParameters()
	print('Parameters generated........')
	
	pipeline.execute(branchName, "spartacus", true)
}
