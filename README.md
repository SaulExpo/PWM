# **QueTeParece | Reseñas de Películas y Series**

## **Integrantes del grupo:**
- Eduardo Arbelo Rua-Figueroa
- Pedro Pablo Díaz López
- Saúl Expósito Morales

## **Índice del contenido:**
1. [Descripción del proyecto](#1-descripción-del-proyecto)
2. [Estructura del código del proyecto](#2-estructura-del-código-del-proyecto)
3. [Firebase](#3-firebase)
4. [Enlace a Figma y Trello](#4-enlace-a-figma-y-trello)

## **1. Descripción del proyecto:**
Se trata de una web para realizar reseñas sobre películas y series.

- El usuario tendrá que **crear una cuenta o iniciar sesión** para poder escribir su propia reseña.
- Se podrá **puntuar** la película/serie con un valor del **0 al 10**.
- Será posible ver la información de cada película o serie, como los **actores** o la **sinopsis**.
- También se dispondrá de una **página de notificaciones**, donde el usuario recibirá avisos por diversos motivos, como:
  - El fin de una suscripción.
  - Anuncios.
  - Nuevas películas añadidas a la página.

## **2. Estructura del código del proyecto:**
Dentro de la carpeta "Angular", se dispone de una carpeta "public", donde se pueden encontrar varias imágenes utilizadas en la página web (logo, puntuación e icono predeterminado).

Por otro lado, el proyecto se separa en cuatro carpetas principales dentro de "src/app". Tenemos una carpeta para los componentes, otra para las distintas páginas, otra para el CRUD de las reseñas (se utiliza en la página de "edit-reviews") y una última con la configuración de Firebase.

El principal cambio de este sprint ha sido añadir una página de edición de reseñas en el perfil del usuario.

## **3. Firebase:**
(Se explica de manera más detallada y con fotos en el PWP)
El Firebase se estructura de la siguiente manera. Tenemos una colección de usuarios, cada usuario tiene un nombre y una lista de películas favoritas. Dentro de un determinado usuario se dispone también de una colección de reseñas, la cual nos sirve para poder editarlas desde la página de perfil del usuario.  
Por otro lado, contamos con una colección de películas y otra de actores, los cuales asociamos a cada película mediante un campo dentro del mismo.


## **4. Enlace a Figma y trello: ** 
  Figma:  https://www.figma.com/design/gZepAvdOCUaMvHwEjv47WY/Untitled?node-id=0-1&p=f&t=pDwaq0Kn6KtJJqpT-0  
  Trello: https://trello.com/invite/b/67a25485f23d1e78facb3157/ATTIab92a058a5d9efb6e68dc7a98afe507f747097C1/pwm
