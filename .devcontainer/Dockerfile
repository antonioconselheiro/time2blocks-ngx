FROM node:20

RUN npm install @angular/cli typescript -g

WORKDIR /time2blocks-ngx

EXPOSE 4200

COPY ./.gitconfig /root/.gitconfig
COPY ./.ssh /root/.ssh
RUN chmod 600 -R /root/.ssh
RUN ssh-add -D && ssh-add /root/.ssh/id_ed25519 || true

# Keyboard & Timezone
ENV LANG=C.UTF-8
ENV LANGUAGE=C.UTF-8
ENV LC_ALL=C.UTF-8
ENV TZ=America/Sao_Paulo
ENV DEBUG_COLORS=true
ENV FORCE_COLOR=true

# The run the start script
CMD [ "/bin/bash" ]
