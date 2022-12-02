# References
# https://firebase.google.com/docs/firestore/manage-data/add-data#python

import base64
import json
from google.cloud import firestore
from datetime import datetime

def hello_pubsub(event, context):
  """Triggered from a message on a Cloud Pub/Sub topic.
  Args:
  event (dict): Event payload.
  context (google.cloud.functions.Context): Metadata for the event.
  """

  pubsub_message = base64.b64decode(event['data']).decode('utf-8')
  message = json.loads(pubsub_message)
  print(message)
  username = message["sentBy"]
  receiver = message["sentTo"]
  text = message["text"]

  db = firestore.Client()
  doc_messages = db.collection(u'messages').document(username)
  doc_messages.set({
    u'createdAt' : datetime.now(),
    u'sentBy': username,
    u'sentTo': receiver,
    u'text': text
  })
  doc_users = db.collection(u'users').document(username)
  doc_users.set({
    u'hasComplaint' : True
  },merge = True)