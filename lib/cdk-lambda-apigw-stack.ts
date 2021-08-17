import * as cdk from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import { PythonFunction } from '@aws-cdk/aws-lambda-python';

export class CdkLambdaApigwStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambda_function = new PythonFunction(this, "Main", {
      entry: "lambda",
      index: "main.py",
      handler: "lambda_handler",
      runtime: lambda.Runtime.PYTHON_3_8
    })
    
    const integration = new apigateway.LambdaIntegration(lambda_function)
    const api = new apigateway.RestApi(this, 'RestApi', {
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS
      }
    })
    
    const v1 = api.root.addResource('v1');
    const get_method = v1.addMethod('GET', integration, { apiKeyRequired: true })

    const plan = api.addUsagePlan('UsagePlan', {
      throttle: {
        rateLimit: 10,
        burstLimit: 2
      }
    })
    
    const key = api.addApiKey('ApiKey')
    plan.addApiKey(key)
    
    plan.addApiStage({
      stage: api.deploymentStage
    })
    
    new cdk.CfnOutput(this, "Url", { value: api.url })

  }
}
