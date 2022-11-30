import boto3
import json
from boto3.dynamodb.conditions import Attr
def lambda_handler(event, context):
    if (event):
        db = boto3.resource('dynamodb')
        foodTable = db.Table("Food")
        foodDataList = []
        idlist = []
        food = foodTable.scan()
        
        foodData = food['Items']
        for fooditem in foodData:
            fid = fooditem['foodId']
            fprice=fooditem['price']
            FoodData = {
                "foodName": fooditem['name'],
                "foodId":str(fid),
                "price":str(fprice),
                "ingredient":fooditem['ingredient']
            }
            foodDataList.append(FoodData)
                
        response = [{'food':foodDataList}]
        return {
            'statusCode':200 ,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
            'body':json.dumps(response)
            }