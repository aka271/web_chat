#!/bin/bash
# This script sends a POST request to log in a user
curl -X POST \
  -d "username=newUser" \
  -d "password=wrongpassword" \
  http://localhost:7070/api/login