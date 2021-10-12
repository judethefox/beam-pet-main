FROM beamaustralia/php:8.0.3

COPY --chown=www-data:www-data . .

RUN composer install --prefer-dist

RUN composer dump-autoload --optimize

RUN cp /etc/nginx/php-api.conf /etc/nginx/nginx.conf

