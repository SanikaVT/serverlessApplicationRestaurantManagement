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
        review = data['ratings']
        username=data['username']
        foodId=data['foodId']
        ratingTable = db.Table("ratings")
        if(len(review)!=0):
             resposne = ratingTable.put_item(
                Item={
                  'id':str(r1),    
                  'userName' :username,
                  'review':review,
                  'foodId':foodId
                })
        return {
            'statusCode': 200,
            'body': json.dumps('Hello from Lambda!')
        }
