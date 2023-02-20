### Web dev docker starter

This is a simple web project made to learn docker compose. I started reading docker documentation to find out how to manage different project in the same docker, after that I followed the docker documentation page specific to angular. And I initially only built a container for the frontend, once it worked (I found some problems with node js versions) I continued with the same procedure but applied to the backend, after this i built docker compose for main image. To start the image run this command: ``` docker compose up -d ```. TO-DO: database implementation, connection between frontend, backend and db.

#### Technology

| Name | Technology |
| ----------- | ----------- |
| Frontend | Angular |
| Backend | NodeJS |
| Image | Docker |

#### Task List

- [x] Implement frontend
- [x] Implement backend
- [x] Setup docker
- [x] Implement DB (mysql)
- [x] Connetction between backend and database
- [ ] Connetction between backend and frontend
- [ ] Connetction between microservices

My website [here](https://filippobrigati.vercel.app/)