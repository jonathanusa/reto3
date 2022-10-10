# In this project we present the use of Spring Boot JPA, Spring Web and Spring Dev Tools for the boat reservation system application deployment.

We follow the respective steps as listed below:

1. Creation of entities for the ORM with the boat and category tables.
2. Creation of Interfaces and repositories for CRUD implementation with boat and category tables.
3. Coding of Controllers to expose the services of **Boat** and **Category**.

Up to this part the following endpoints were successfully tested with Postman: 
* /Boat/all
* /Boat/save
* /Category/all
* /Category/save

4. Commands for opening the port in the virtual machine
> sudo firewall-cmd --permanent --zone=public --add-service=http (responde -> success)
or
> sudo firewall-cmd --permanent --zone=public --add-port=80/tcp (responde -> success)
> sudo firewall-cmd --reload (response -> success)

5. Repository cloning is performed in the virtual machine.
> git clone https://github.com/jonathanusa/reto3.git

6. We compile the code to verify that everything is correct and we wait for a **BUILD SUCCESS**
> mvn clean package -DskipTests

7. Command to run the application on the server
> sudo java -jar -Dspring.profiles.active=<properties profile p.e. prod> <filename>.jar
> sudo java -jar -Dspring.profiles.active=prod reto3.jar

