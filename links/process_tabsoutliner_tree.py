#!/usr/bin/env python3

import json
import csv
from urllib.parse import urlparse
import sys

if len(sys.argv) != 2:
    print("Usage: {} /path/to/original.json".format(sys.argv[0]))
    sys.exit(1)

# Load the original JSON file
with open(sys.argv[1], 'r') as f:
    data = json.load(f)

def extract_data_from_node(node):
    if not isinstance(node, dict):
        return []

    url = node.get("url", "")
    title = node.get("title", "")

    # Filter out unwanted URLs
    if not url or url.startswith("chrome-extension:") or url.startswith("data:"):
        return []

    return [{
        "title": title,
        "url": url
    }]

# Recursively extract data from JSON structure
def recursive_extract(node):
    extracted = []

    if isinstance(node, dict):
        extracted.extend(extract_data_from_node(node))
        for value in node.values():
            extracted.extend(recursive_extract(value))
    elif isinstance(node, list):
        for item in node:
            extracted.extend(recursive_extract(item))

    return extracted

# Extract data
extracted_data = recursive_extract(data)

# Write to CSV, ensuring no empty lines
with open("filtered_output.csv", "w", newline="") as csvfile:
    fieldnames = ["title", "url"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for row in extracted_data:
        if any(row.values()):  # Ensure the row has some content
            writer.writerow(row)

print("CSV file has been generated as filtered_output.csv")

