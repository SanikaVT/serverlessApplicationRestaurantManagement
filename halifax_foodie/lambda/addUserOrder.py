import json
import boto3
import random
def lambda_handler(event, context):
   
    if (event):
        r1 = random.randint(10, 100000)
        db = boto3.resource('dynamodb')
        data=event
        foodName =data['foodName']
        foodId = data['foodId']
        userName = data['userName']
        price = data['price']
        ingredient = data['ingredient']
        
        orderTable = db.Table("userOrder")
        if(len(data)!=0):
             resposne = orderTable.put_item(
                Item={
                  'name' :foodName,
                  'foodId':foodId,
                  'orderId': str(r1),
                  'userName':userName,
                  'Price':price,
                  'ingredient':ingredient,
                  'orderStatus':"Preparing"
                })
        
        print(resposne)
        return {
            'statusCode': 200,
            'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                    },
            'body': json.dumps('Hello from Lambda!')
        }
