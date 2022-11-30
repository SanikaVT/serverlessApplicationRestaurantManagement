import json
import boto3

def lambda_handler(event, context):
    dynamo_db = boto3.resource('dynamodb')
    table = dynamo_db.Table('ratings')

    users_feedback_polarity = []
    result = table.scan()
    
    if result['Count'] == 0:
        response = {"status": True,"message": "No user feedback available","data": None}
    else:
        comprehend = boto3.client("comprehend")
        for i in range(result['Count']):            
            result_dict = {}
            feedback = result['Items'][i]['review']
            response = comprehend.detect_sentiment(Text = feedback, LanguageCode = "en")
            polarity = response['Sentiment']            
            result_dict['Feedback'] = feedback
            result_dict['Polarity'] = polarity
            users_feedback_polarity.append(result_dict)
        
        response = {"status": True,"message": "Polarity of feedback","data": users_feedback_polarity}
    return response