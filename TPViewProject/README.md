# Prueba Teleperformance
 Prueba Teleperformance


proyecto creado para prueba tecnica solicitada por la empresa TELEPERMFORMANCE.

## Instalacion

Aplicacion hecha en Angular10

```bash
npm install
ng serve -o
```

## Estructura
La aplicacion cuenta con un componente principal y un componente llamado documentacion ademas de la carpeta service en la cual se encuentran las funciones que consumen los endpoint correspondientes a la api

## Puntos solicitados
```python
-los campos tipo numerico solo aceptan numeros
-los campos tipo texto solo aceptan texto
-se valida el campo email con un email valido
-si el tipo de documento es diferente a cedula el campo razon social es obligatorio y los nombres y apellidos opcionales
-si el campo es igual a cedula el campo razon social no es obligatorio y los campos nombres y apellidos son obligatorios
-el manejo de errores devuelve un aviso con el codigo y el mensaje del error correspondiente a la respuesta de la api

-BASE DE DATOS el script correspondiente a la base de datos se encuentra en la raiz de los dos repositorios
```
## Uso
Una vez ejecutada la aplicacion en la url raiz se encontrara un formulario solicitando la identificacion, una vez digitada la identificacion se procede a consultar, en caso de que exista se abre el modal ya lleno con los datos y se pueden modificar, en caso de que no el programa pregunta si desea crear uno nuevo. una vez realizadas las acciones arroja un mensaje diciendo si fue exitoso o hubo error en la operacion.


