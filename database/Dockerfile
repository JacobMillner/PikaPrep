FROM postgres

RUN mkdir -p -v /docker-entrypoint-initdb.d/

COPY initdb.sql /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/initdb.sql

RUN mkdir -p -v /docker-entrypoint-initdb.d/

COPY initdb.sh /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/initdb.sh

RUN mkdir -p -v /docker-entrypoint-initdb.d/