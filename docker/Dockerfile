FROM php:8.0.15-apache



# Prepare fake SSL certificate
RUN apt-get update
RUN apt-get install -y ssl-cert

RUN a2enmod ssl
RUN a2enmod rewrite
RUN a2ensite default-ssl.conf

#COPY renkuBack /var/www/html/renkuBack
COPY . .
RUN rm -f .htaccess .gitignore Dockerfile README.md && rm -rf logs/ .git/
#termina instalacion phalcon


RUN service apache2 restart

# Work directory
WORKDIR /var/www/html
RUN cd /var/www/html
RUN touch /var/www/html/index.php
RUN echo '<h1> It works </h1>' > index.php 
RUN cd




EXPOSE 80
EXPOSE 443

