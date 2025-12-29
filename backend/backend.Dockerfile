FROM eclipse-temurin:17-jdk AS build
ENV HOME=/usr/app
RUN mkdir -p $HOME
WORKDIR $HOME
COPY . $HOME
RUN ./mvnw -f $HOME/pom.xml clean package -DskipTests

FROM eclipse-temurin:17-jdk
ARG JAR_FILE=/usr/app/target/*.jar
COPY --from=build $JAR_FILE /app/backend.jar

ENTRYPOINT ["java","-jar","-Dspring.datasource.password=${SPRING_DATASOURCE_PASSWORD}","-Dserver.ssl.key-store-password=${SERVER_SSL_KEY_STORE_PASSWORD}","-Dazure.storage.connection.string=${AZURE_STORAGE_CONNECTION_STRING}","/app/backend.jar"]