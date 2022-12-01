import json
import math
import boto3
from boto3.dynamodb.conditions import Attr

dynamodb = boto3.resource('dynamodb')
    
def lambda_handler(event, context):
    ev=event
    username = ev['username']
    cipher =  ev['cipher']
    table = dynamodb.Table('userDetails')
    message = ""
    data =  table.scan(
        FilterExpression=Attr('userID').eq(username)
        )
    userData = data['Items']
    print(data)
    for item in userData:
        if item['userID']== username:
            if item['cipher'] == cipher:
                message = 'User Verified'
            else:
                message = 'User Not Verified'
   
    response = [{'message':message}]
    return {
        'statusCode':200 ,
        'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
        'body':json.dumps(response)
    }