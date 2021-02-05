Installation:

Ubuntu:

1. curl -fsSL https://deno.land/x/install/install.sh | sh

Then manually run,

export DENO_INSTALL="/home/dektop-sn-04/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"

Windows (PowerShell):

iwr https://deno.land/x/install/install.ps1 -useb | iex

Execute:

deno run --allow-net --allow-read server/main.ts

deno run --allow-net --allow-env --allow-write --allow-read --allow-plugin --unstable server/main.ts

denon run --allow-net --allow-env --allow-write --allow-read --allow-plugin --unstable main.ts

denon run --allow-net --allow-env --allow-write --allow-read --allow-plugin --unstable --inspect=<127.0.0.1:3000> main.ts
