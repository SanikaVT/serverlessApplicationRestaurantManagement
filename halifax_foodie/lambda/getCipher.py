import json
import math
import boto3
from boto3.dynamodb.conditions import Attr

dynamodb = boto3.resource('dynamodb')

def decryptionCipher(cipher,key):
    plainText = ""
    k_indx = 0
    plainText_index = 0
    plainText_len = float(len(cipher))
    plainText_lst = list(cipher)
    col = len(key)    
    row = int(math.ceil(plainText_len / col))
    key_list = sorted(list(key))
    dec_cipher = []
    for _ in range(row):
        dec_cipher += [[None] * col]
    for _ in range(col):
        curr_idx = key.index(key_list[k_indx])
        for j in range(row):
            dec_cipher[j][curr_idx] = plainText_lst[plainText_index]
            plainText_index += 1
        k_indx += 1
    try:
        plainText = ''.join(sum(dec_cipher, []))
    except TypeError:
        raise TypeError("This program cannot",
                        "handle repeating words.")
    null_count = plainText.count('_')
    if null_count > 0:
        return plainText[: -null_count]
    print(plainText)
    return plainText
    
def lambda_handler(event, context):
    # ev = json.loads(event['body'])
    ev=event
    username = ev['username']
    cipher =  ev['cipher']
    table = dynamodb.Table('userDetails')
    message = ""
    data =  table.scan(
        FilterExpression=Attr('userID').eq(username)
        )
    userData = data['Items']
    print(data)
    for item in userData:
        if item['userID']== username:
            generatedPlainText = decryptionCipher(cipher,item['userkey'])
            print(item['plainText'])
            print(generatedPlainText)
            if item['plainText'] == generatedPlainText:
                message = 'Verification successful'
            else:
                message = 'User not verified'    
    response = [{'message':message}]
    return {
        'statusCode':200 ,
        'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
        'body':json.dumps(response)
    }