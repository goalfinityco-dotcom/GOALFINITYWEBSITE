# Build the React (craco) app, then serve the static build with nginx.
FROM node:20-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json yarn.lock* ./
RUN yarn install --network-timeout 600000
COPY . .
ARG REACT_APP_BACKEND_URL=""
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
# CRA treats warnings as errors when CI=true; keep the build tolerant of lint warnings.
ENV CI=false
RUN yarn build

FROM nginx:1.27.5-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
