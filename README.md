# media-store
## Streaming data
https://dev.to/rpkr/different-ways-to-send-a-file-as-a-response-in-spring-boot-for-a-rest-api-43g7
https://medium.com/@souravdas08/download-large-files-over-rest-http-api-aa6a00a050cf
https://blog.devgenius.io/file-video-streaming-with-streamingresponsebody-spring-boot-maven-java-21-executor-3a824811bc9b
https://technicalsand.com/streaming-data-spring-boot-restful-web-service/


# media-store

https://www.ffmpeg.org/download.html
https://github.com/ytdl-org/youtube-dl?tab=readme-ov-file#installation

```bash
docker build -t registry/max/mediastore:0.0.1 .
```

```bash
docker run --rm -it --entrypoint /bin/sh registry/max/mediastore:0.0.1
```

## 
```bash
docker run -it -d \
  -v /home/maksym/WebstormProjects/mediastore/public/downloads:/downloads \
  -p 3000:3000 \
  -e AWS_ACCESS_KEY_ID='your-access-key' \
  -e AWS_SECRET_ACCESS_KEY='your-secret-key' \
  -e AWS_DEFAULT_REGION='your-region' \
  -e S3_BUCKET_NAME='your-s3-bucket-name' \
  registry/max/mediastore:0.0.1
```

### yt-dlp
```bash
yt-dlp -o - 'https://www.youtube.com/watch?t=4&v=P9pzm5b6FFY'
yt-dlp --concurrent-fragments 5 'https://www.youtube.com/watch?t=4&v=BaW_jenozKc'
yt-dlp -i --extract-audio --audio-quality 0 'https://www.youtube.com/watch?v=P9pzm5b6FFY'
yt-dlp -o - --extract-audio --audio-format mp3 --audio-quality 0 'https://www.youtube.com/watch?v=P9pzm5b6FFY' > output.mp3
yt-dlp --extract-audio --audio-format mp3 --audio-quality 0 'https://www.youtube.com/watch?v=P9pzm5b6FFY'
yt-dlp -o - BaW_jenozKc
yt-dlp -o - 'https://www.youtube.com/watch?t=4&v=P9pzm5b6FFY'

```


## Run
```bash
docker run -v ~/test:/root/test -it --rm --name yt-dlp.test --entrypoint sh jauderho/yt-dlp:latest
docker run -v ~/test:/root/test -it --rm --name yt-dlp.test --entrypoint sh jauderho/yt-dlp:latest
docker run --rm jauderho/yt-dlp:latest
docker run --rm jauderho/yt-dlp:latest yt-dlp -o - https://www.youtube.com/watch?v=dQw4w9WgXcQ
docker run --rm jauderho/yt-dlp:latest yt-dlp -f bestvideo+bestaudio --merge-output-format mkv https://www.youtube.com/watch?v=dQw4w9WgXcQ
docker run -v ~/test:/download jauderho/yt-dlp:latest yt-dlp -f bestvideo+bestaudio --merge-output-format mkv https://www.youtube.com/watch?v=dQw4w9WgXcQ
docker run -d jauderho/yt-dlp:latest sh
```

## Issues
1. Faced with DNS problem
   https://medium.com/@faithfulanere/solved-docker-build-could-not-resolve-archive-ubuntu-com-apt-get-fails-to-install-anything-9ea4dfdcdcf2
   `cat /etc/docker/daemon.json`
2. TZ problem
   https://askubuntu.com/questions/909277/avoiding-user-interaction-with-tzdata-when-installing-certbot-in-a-docker-contai


## Videos
https://www.youtube.com/watch?v=Q9jZ1gNJlAc
https://www.youtube.com/watch?v=TeyvBokziTY&list=PL184oVW5ERMC58u6lH4B2i55_B16hOQPm


##
https://blog.risingstack.com/how-to-debug-a-node-js-app-in-a-docker-container/
https://nodejs.org/en/learn/getting-started/debugging
```
--inspect=0.0.0.0:9229 ./bin/www
-w /app -v /home/maksym/WebstormProjects/mediastore:/app -p 0.0.0.0:3000:3000
```


## How to send unique id for a task?
1. Base64?
```json
{
   "url": "https://www.youtube.com/watch?v=z2RTPwINa6c",
   "target": "mp3"
}

```

## Elasticache
https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/elasticache_cluster

## References
https://www.youtube.com/watch?v=7xngnjfIlK4&t=56s
https://www.youtube.com/watch?v=SLB_c_ayRMo
https://www.youtube.com/watch?v=_MJfk7Vdt3I