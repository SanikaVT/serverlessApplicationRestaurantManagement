import json
import boto3

def lambda_handler(event, context):
    dynmo = boto3.resource('dynamodb')
    rateTable = dynmo.Table('ratings')

    polarityCheck = []
    rateTable = rateTable.scan()
    
    if rateTable['Count'] == 0:
        resultResponse = {"status": True,"message": "No user feedback available","data": None}
    else:
        resultResponse = checkPolarity(rateTable,polarityCheck)
    return resultResponse

def checkPolarity(rateTable,polarityCheck):
    comprehend = boto3.client("comprehend")
    for i in range(rateTable['Count']):            
        dictRes = {}
        review = rateTable['Items'][i]['review']
        resultResponse = comprehend.detect_sentiment(Text = review, LanguageCode = "en")
        polarCheck = resultResponse['Sentiment']            
        dictRes['Feedback'] = review
        dictRes['Polarity'] = polarCheck
        polarityCheck.append(dictRes)
        
    resultResponse = {"status": True,"message": "Polarity","data": polarityCheck}
    