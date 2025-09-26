#!/bin/bash

# --- Find the Project's Root Directory ---
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR/../"

# --- Run the Build ---
echo "==> Starting Maven build in: $(pwd)"
mvn clean install

# --- Check for Success ---
if [ $? -ne 0 ]; then
  echo "==> Maven build failed. Aborting." >&2
  exit 1
fi

echo "==> Build successful."
