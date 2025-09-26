#!/bin/bash
# This script sends a POST request to register a new user
curl -X POST \
  -d "username=newUser" \
  -d "password=password" \
  -d "email=user@example.com" \
  http://localhost:7070/api/register