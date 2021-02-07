#!/bin/bash

# UQU - Computer Science -  Artificial Neural Networks - Lab 1
# Student: MHD Maher Azkoul

# This script run the script on a docker container
# Docker should be installed on the system in order for this script to work
# 
# This script recieves an argument that determine the programming language and the script
# for now it supports two options [python, javascript]
# the defaul option is python
# 
# usage: SCRIPT_NAME [PROGRAMMING_LANGUAGE]
# where PROGRAMMING_LANGUAGE = python | javascript

if [[ ${1} = '--help' ]]
	then
        echo "This script run the script on a docker container"
        echo "usage: ${0} [PROGRAMMING_LANGUAGE]"
        echo "where PROGRAMMING_LANGUAGE = python | javascript"
        echo "the defaul option is python"
        exit 0
    fi

if [[ ${1} = 'javascript' ]]
    then
        echo "running using nodejs"
        for i in {1..5}
        do
            echo "run ${i}:"
            docker run -it --rm --name ann-lab-01-nodejs -v "$PWD":/usr/src/myapp -w /usr/src/myapp node node script.js
            echo "=========="
        done
        exit 0
    else
        echo "running using python"
        for i in {1..5}
        do
            echo "run ${i}:"
            docker run -it --rm --name ann-lab-01-python -v "$PWD":/usr/src/myapp -w /usr/src/myapp python:3 python script.py
            echo "=========="
        done
        exit 0
fi