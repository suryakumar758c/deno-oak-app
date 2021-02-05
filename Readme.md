## Installation:

## Ubuntu:

1. curl -fsSL https://deno.land/x/install/install.sh | sh

Then manually run,

export DENO_INSTALL="/home/dektop-sn-04/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"

## Windows (PowerShell):

iwr https://deno.land/x/install/install.ps1 -useb | iex

## Execute:

deno run --allow-net --allow-read server/main.ts

deno run --allow-net --allow-env --allow-write --allow-read --allow-plugin --unstable server/main.ts

denon run --allow-net --allow-env --allow-write --allow-read --allow-plugin --unstable main.ts

denon run --allow-net --allow-env --allow-write --allow-read --allow-plugin --unstable --inspect=<127.0.0.1:3000> main.ts

==================================================================================================================

## Packages used:

- Oak - deno http framework - https://deno.land/x/oak
- oak cors - cors middleware for deno - https://deno.land/x/cors
- dotenv - environment variable loader - https://deno.land/x/dotenv
- denodb - orm for deno - https://deno.land/x/denodb
- colors - console decorator - https://deno.land/std@0.85.0/fmt/colors.ts
- logger - logger for deno - https://deno.land/std@0.85.0/log
- oak_upload_middleware - middleware to handle multipart/form-data - https://deno.land/x/oak_upload_middleware
- denon - will watch files and reload app like nodemon - https://deno.land/x/denon

## others

To run deno app with docker - https://hub.docker.com/r/hayd/alpine-deno/
