import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CdkLambdaApigw from '../lib/cdk-lambda-apigw-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CdkLambdaApigw.CdkLambdaApigwStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
