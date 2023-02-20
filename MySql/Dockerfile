FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=root

EXPOSE 3306

COPY ./database.sql ./docker-entrypoint-initdb.d/


# docker build -t mysql_db .
# docker images
# docker run mysql_db
# docker container ls
# docker exec -it "container_id" /bin/bash