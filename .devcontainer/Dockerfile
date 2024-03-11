FROM node:20

RUN npm install @angular/cli typescript -g

WORKDIR /time2blocks-ngx

EXPOSE 4200

COPY ./.gitconfig /root/.gitconfig
COPY ./.ssh /root/.ssh
RUN chmod 600 -R /root/.ssh
RUN ssh-add -D && ssh-add /root/.ssh/id_ed25519 || true

ENV LANG C.UTF-8
ENV TZ America/Sao_Paulo

# The run the start script
CMD [ "/bin/bash" ]
