FROM node:22

RUN npm install @angular/cli typescript -g

WORKDIR /time2blocks-ngx

EXPOSE 4200

# Keyboard & Timezone
ENV LANG=C.UTF-8
ENV LANGUAGE=C.UTF-8
ENV LC_ALL=C.UTF-8
ENV TZ=America/Sao_Paulo
ENV DEBUG_COLORS=true
ENV FORCE_COLOR=true
ENV NG_CLI_COMPLETION=false

# The run the start script
CMD [ "/bin/bash" ]
