import json
import math
import boto3

dynamodb = boto3.resource('dynamodb')

def generateCipher(key,plainText):
    cipher = ""
    k_indx = 0
    plainText_len = float(len(plainText))
    plainText_lst = list(plainText)
    key_lst = sorted(list(key))
    col = len(key)    
    row = int(math.ceil(plainText_len / col))
    fill_null = int((row * col) - plainText_len)
    plainText_lst.extend('_' * fill_null)
    matrix = [plainText_lst[i: i + col]
            for i in range(0, len(plainText_lst), col)]
    for _ in range(col):
        curr_idx = key.index(key_lst[k_indx])
        cipher += ''.join([row[curr_idx]
                        for row in matrix])
        k_indx += 1
    return cipher


def lambda_handler(event, context):
    table = dynamodb.Table('userDetails')
    data = event
    cipher = generateCipher(data['key'],data['plainText'])
    table.put_item(Item=
    {
        'userID': data['userName'],
        'userName': data['userName'],
        'email': data['email'],
        'role': data['role'],
        'userkey': data['key'],
        'plainText': data['plainText'],
        'cipher': cipher
        
    })
    return {
        'statusCode': 200,
        'body':cipher,
    }