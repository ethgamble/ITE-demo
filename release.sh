#!/bin/bash

SERVER2="ubuntu@54.255.218.51"
echo  "Push To AWS Server ${SERVER2} Start"
scp -r dist/*  ${SERVER2}:/home/ubuntu/3ti
echo  "Push To AWS Server ${SERVER2} Done"
