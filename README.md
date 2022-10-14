# Detección de múltiples objetos utilizando un modelo pre-entrenado en TensorFlow.js

## Dificultad: Fácil

Nota: Esta demostración carga una clase de JavaScript fácil de usar hecha por el equipo de TensorFlow.js para hacer el trabajo duro por ti, por lo que no se necesita ningún conocimiento de Machine Learning para usarlo.

Si quieres aprender a cargar directamente un modelo guardado en TensorFlow.js, consulta nuestro tutorial sobre la carga de modelos TensorFlow.js.

Si quieres entrenar un sistema para reconocer tus propios objetos, usando tus propios datos, entonces consulta nuestros tutoriales sobre "aprendizaje de transferencia".

## ¿Qué puede hacer este demo?

Esta demostración muestra cómo podemos utilizar una solución de Machine Learning pre-entrenada para reconocer múltiples objetos (sí, ¡más de uno a la vez!) en cualquier imagen que deseemos presentarle. Y lo que es mejor, no sólo sabemos que la imagen contiene un objeto, sino que también podemos obtener las coordenadas del cuadro delimitador de cada objeto que encuentra, lo que le permite resaltar el objeto encontrado en la imagen. 

Para esta demostración estamos cargando un modelo utilizando la arquitectura ImageNet-SSD, para [reconocer 90 objetos comunes](https://github.com/tensorflow/tfjs-models/blob/master/coco-ssd/src/classes.ts) que ya ha sido enseñado a encontrar a partir del [conjunto de datos COCO](http://cocodataset.org/#home).

Si lo que quieres reconocer está en esa lista de cosas que conoce (por ejemplo un gato, un perro, etc.), esto puede serte útil tal cual en tus propios proyectos, o simplemente para experimentar con el Machine Learning en el navegador y familiarizarte con las posibilidades del aprendizaje automático. 

Si te sientes especialmente confiada, puedes consultar nuestra [documentación de GitHub](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd) que entra en mucho más detalle para personalizar varios parámetros para adaptar el rendimiento a tus necesidades.

## ¿Qué hay en los archivos?

### ← index.html

Simplemente tenemos algunas etiquetas de script en nuestro HTML para tomar la última versión de TensorFlow.js y la clase de modelo de Machine Learning que puede tomar los datos de la imagen como entrada y las predicciones de salida para lo que ve en esos datos de la imagen.

En este caso simplemente hacemos referencia a lo siguiente para cargar TensorFlow.js:

```HTML
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js" type="text/javascript"></script>
```

Sin embargo, si quieres cargar una versión concreta de TensorFlow.js puedes hacerlo así:

```HTML
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.4.0/dist/tf.min.js" type="text/javascript"></script>
```

Finalmente verás que cargamos la clase del modelo de aprendizaje automático que luego usaremos en script.js de esta manera:

```HTML
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd"></script>
```

### ← style.css

No hay nada que ver aquí. Sólo estilos para hacer que la demo se vea más bonita. Puedes usarlos o ignorarlos a tu gusto.

### ← script.js

Este archivo muestra el código de demostración que necesitas escribir en JavaScript para interactuar con la clase COCO-SSD que importamos en el HTML. Aquí es donde ocurre la magia. Podemos pasar datos a la clase y luego recuperar las predicciones sobre lo que piensa que vio en la imagen que luego podemos utilizar para tomar una decisión. El archivo está bien comentado, así que lee los comentarios para saber más. Se proporcionan demostraciones para las imágenes en el DOM y también para la clasificación del flujo de la cámara web en vivo.

---
