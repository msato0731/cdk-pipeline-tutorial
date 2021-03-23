import { CdkpipelinesDemoStage } from "./cdkpipelines-demo-stage"
import * as codepipeline from "@aws-cdk/aws-codepipeline"
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions"
import { Construct, SecretValue, Stack, StackProps } from "@aws-cdk/core"
import { CdkPipeline, SimpleSynthAction } from "@aws-cdk/pipelines"
// import { pipeline } from "stream"

export class CdkpipelinesDemoPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const sourceArtifact = new codepipeline.Artifact()
    const cloudAssemblyArtifact = new codepipeline.Artifact()

    const pipeline = new CdkPipeline(this, "Pipeline", {
      pipelineName: "MyservicePipeline",
      cloudAssemblyArtifact,
      sourceAction: new codepipeline_actions.GitHubSourceAction({
        actionName: "Github",
        output: sourceArtifact,
        oauthToken: SecretValue.secretsManager("github-token"),
        owner: 'msato0731',
        repo: 'cdk-pipeline-tutorial'
      }),
      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
        buildCommand: 'npm run build'
      })
    // This is where we add the application stages
    })
    pipeline.addApplicationStage(new CdkpipelinesDemoStage(this, "PreProd", {
      env: { account: "ACCOUNT1", region: "us-east-2" }
    }))
  }
}
