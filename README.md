# In this project we present the use of Spring Boot JPA, Spring Web and Spring Dev Tools for the boat reservation system application deployment.

1. Commands for opening the port in the virtual machine
> sudo firewall-cmd --permanent --zone=public --add-service=http (responde -> success)
or
> sudo firewall-cmd --permanent --zone=public --add-port=80/tcp (responde -> success)
> sudo firewall-cmd --reload (response -> success)

2. Repository cloning is performed in the virtual machine.
> git clone https://github.com/jonathanusa/reto3.git

3. We compile the code to verify that everything is correct and we wait for a **BUILD SUCCESS**
> cd <directory>
> mvn clean package -DskipTests

4. Command to run the application on the server
> cd target
> sudo java -jar -Dspring.profiles.active=<properties profile p.e. pro> <filename>.jar
> sudo java -jar -Dspring.profiles.active=pro reto3-0.0.1-SNAPSHOT.jar