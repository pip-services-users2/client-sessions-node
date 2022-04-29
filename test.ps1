#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data and set necessary variables
$component = Get-Content -Path "component.json" | ConvertFrom-Json
$testImage="$($component.registry)/$($component.name):$($component.version)-$($component.build)-test"

# Set environment variables
$env:IMAGE = $testImage

try {
    # Workaround to remove dangling images
    docker-compose -f ./docker/docker-compose.test.yml down

    docker-compose -f ./docker/docker-compose.test.yml up --build --abort-on-container-exit --exit-code-from test
} finally {
    # Workaround to remove dangling images
    docker-compose -f ./docker/docker-compose.test.yml down
}
