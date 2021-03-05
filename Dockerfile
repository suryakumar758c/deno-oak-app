FROM hayd/alpine-deno:1.5.2

WORKDIR /app 

USER deno

COPY . .

EXPOSE 3000

RUN deno cache main.ts

CMD ["run","--allow-net","--allow-env","--allow-write","--allow-read","--allow-plugin","--unstable","--watch","main.ts","-c","tsconfig.json"]