import json
import boto3
def lambda_handler(event, context):
    if (event):
        print(event)
        body= event
        fileCont = body['filecontent']
        fname=body['filename']
        s3 = boto3.resource('s3')
        fpath='/tmp/' +fname
        file = open(fpath, "w") 
        file.write(fileCont) 
        file.close()
        bucket = s3.Bucket('ownrecipes')
        bucket.upload_file(fpath, fpath)
        response= 'success'
        return {
            'statusCode': 200,
            'headers': {
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                        },
            'body': json.dumps(response)
        }
