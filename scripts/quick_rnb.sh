#!/bin/bash

# --- Find the Project's Root Directory ---
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR/../"

# --- Run the Build ---
echo "==> Running build in: $(pwd)"
mvn clean install

# --- Check for Success ---
if [ $? -eq 0 ]; then
  echo "==> Build successful. Running application..."
  mvn exec:java -Dexec.mainClass="com.web_chat.App"
else
  # Write the error message to standard error (>&2)
  echo "==> Maven build failed. Aborting." >&2
  exit 1
fi