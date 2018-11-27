FROM php:7.2-apache

# Set document root
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Enable Apache rewrite module
RUN a2enmod rewrite expires

# Update package list
RUN apt-get update

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install git
RUN apt-get install -y git

#zip unzip required for composer
RUN apt-get install zip unzip

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql