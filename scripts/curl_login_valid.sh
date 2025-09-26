#!/bin/bash
curl -X POST \
  -d "username=newUser" \
  -d "password=password" \
  http://localhost:7070/api/login