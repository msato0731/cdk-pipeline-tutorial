import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda"

export async function handler(evnet: APIGatewayProxyResult, context: Context): Promise<APIGatewayProxyResult> {
  return {
    body: 'Hello from a Lambda Function',
    statusCode: 200
  }
}