import json
import boto3
import random
import re
def lambda_handler(event, context):
    if (event):
        print(event)
        r1 = random.randint(10, 100000)
        db = boto3.resource('dynamodb')
        review= event['currentIntent']['slots']['rating']
        username=event['currentIntent']['slots']['user_id']
       
        ratingTable = db.Table("ratings")
        if(len(review)!=0):
             resposne = ratingTable.put_item(
                Item={
                  'id':str(r1),    
                  'userName' :username,
                  'review':review
                })
       
        return {"dialogAction":{"type":"Close","fulfillmentState": "Fulfilled",
        "message": { "contentType": "PlainText", "content": "Rating has been added. Thanks!."}}}
