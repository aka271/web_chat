#!/bin/bash

# --- Find the Project's Root Directory ---
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR/../"

# --- Run the Application ---
mvn exec:java -Dexec.mainClass="com.web_chat.App"

