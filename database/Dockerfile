FROM postgres

COPY initdb.sql /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/initdb.sql

COPY initdb.sh /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/initdb.sh
