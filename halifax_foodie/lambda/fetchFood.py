import boto3
import json
def lambda_handler(event, context):
    if (event):
        dyndb = boto3.resource('dynamodb')
        fTable = dyndb.Table("Food")
        listFood = []
        foodtablelist = fTable.scan()        
        foditems = foodtablelist['Items']
        return returnFromDynamo(foditems,listFood)
        
def returnFromDynamo(foditems,listFood):
    for fitem in foditems:
            id = fitem['foodId']
            cost=fitem['price']
            food = {
                "foodName": fitem['name'],
                "foodId":str(id),
                "price":str(cost),
                "ingredient":fitem['ingredient']
            }
            
            listFood.append(food)
                
    result = [{'food':listFood}]
    return {
            'statusCode':200 ,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
            'body':json.dumps(result)
            }