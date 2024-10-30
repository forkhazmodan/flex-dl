## TODO:
### Infra
- [x] Setup local environment, run node remote vid Docker
- [ ] CI/CD Github -> Amazon
- [ ] Terraform
- [ ] Logging system
- [ ] Rework README.md 

### Important
- [ ] Instead of UUID use hash(yt-id + target-format)
to prevent extra downloading if such a job is already running. 
- [ ] Make able to download mp3 from youtube
- [ ] Delete temp file
- [ ] Rework the way how Task id is generated. Move login to backend

### Backlog
- [ ] Search info about a video before making an attempt to download.
- [x] Send progress requests
- [ ] Conversion to other popular formats
- [ ] Redesign Vew, React etc.. 
- [ ] Improve caching CDN
- [ ] Add redis to store intermediate results of currently running jobs. 


### Add diagram
Task 
    - download video
        - update status event
    - convert video into target format
        - update status event
    - upload video
        - update status event
        - save link into redis
    - delete video