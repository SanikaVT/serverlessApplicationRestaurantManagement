import json
import boto3
import random
import re
def lambda_handler(event, context):
    if (event):
        print(event)
        r1 = random.randint(10, 100000)
        db = boto3.resource('dynamodb')
        owner_id= event['currentIntent']['slots']['res_id']
        recipe_name=event['currentIntent']['slots']['recipe_name']
        recipe_desc= event['currentIntent']['slots']['recipe_desc']
        price=event['currentIntent']['slots']['price']
        
        if owner_id!='-1':
            ratingTable = db.Table("Food")
            if(len(recipe_name)!=0):
                 resposne = ratingTable.put_item(
                    Item={
                      'foodId':str(r1),    
                      'name' :recipe_name,
                      'ingredient':recipe_desc,
                      'price': price
                    })
            
            return {"dialogAction":{"type":"Close","fulfillmentState": "Fulfilled","message": { "contentType": "PlainText", "content": "Recipe added. Thanks!"}}}
            return {
                'statusCode': 200,
                'headers': {
                            'Access-Control-Allow-Headers': 'Content-Type',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                            },
                'body': json.dumps('Hello from Lambda!')
            }
        else:
            return {"dialogAction":{"type":"Close","fulfillmentState": "Failed","message": { "contentType": "PlainText", "content": "Restaurant not found."}}}