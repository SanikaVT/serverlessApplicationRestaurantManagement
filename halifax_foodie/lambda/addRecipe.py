import json
import boto3
import random
import re
def lambda_handler(event, context):
    if (event):
        print(event)
        r1 = random.randint(10, 100000)
        db = boto3.resource('dynamodb')
        data= event
        content = data['filecontent']
        filename=data['filename']
        s3 = boto3.resource('s3')
        filepath='/tmp/' +filename
        file = open(filepath, "w") 
        file.write(content) 
        file.close()
        bucket = s3.Bucket('ownrecipes')
        bucket.upload_file(filepath, filepath)
        return {
            'statusCode': 200,
            'headers': {
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                        },
            'body': json.dumps('Hello from Lambda!')
        }
