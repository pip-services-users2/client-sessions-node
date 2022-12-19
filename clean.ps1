#!/usr/bin/env pwsh

# Get component data and set necessary variables
$component = Get-Content -Path "component.json" | ConvertFrom-Json
$buildImage = "$($component.registry)/$($component.name):$($component.version)-$($component.build)-build"
$testImage = "$($component.registry)/$($component.name):$($component.version)-$($component.build)-test"

# Clean up build directories
if (Test-Path -Path "$PSScriptRoot/obj") {
    Remove-Item -Recurse -Force "$PSScriptRoot/obj"
}
if (Test-Path -Path "$PSScriptRoot/node_modules") {
    Remove-Item -Recurse -Force "$PSScriptRoot/node_modules"
}

# Remove docker images
docker rmi $buildImage --force
docker rmi $testImage --force
docker image prune --force

# Remove existed containers
$exitedContainers = docker ps -a | Select-String -Pattern "Exit"
foreach($c in $exitedContainers) { docker rm $c.ToString().Split(" ")[0] }
