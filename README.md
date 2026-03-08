# FocusTimer

FocusTimer es una herramienta de productividad creada con **Node.js** que bloquea temporalmente sitios web distractores durante tus sesiones de trabajo.

La idea es simple: si no puedes acceder a la distracción, puedes concentrarte mejor.

---
<img width="792" height="455" alt="b4" src="https://github.com/user-attachments/assets/36b85dbb-ded2-499e-bd58-ce9604fddeb3" />

## Características

* Bloquea sitios como Facebook, YouTube, Instagram, Twitter o WhatsApp Web.
* Selección interactiva de sitios a bloquear.
* Temporizador estilo Pomodoro.
* Restauración automática del acceso al terminar el tiempo.
* Modifica el archivo `hosts` de Windows de forma temporal y segura.

---

## Cómo funciona

1. **Menú interactivo**
   Usando `@inquirer/prompts`, el usuario selecciona qué sitios desea bloquear y por cuánto tiempo.

2. **Bloqueo a nivel de sistema**
   El script escribe reglas en el archivo `hosts` de Windows para impedir el acceso a los dominios seleccionados.

3. **Restauración automática**
   Al finalizar el temporizador, FocusTimer elimina las reglas de bloqueo y restaura el acceso normal a los sitios.

---

## Requisitos

* Node.js 18 o superior
* Windows
* Permisos de administrador (necesarios para modificar el archivo `hosts`)

---
## Uso

Ejecuta el script:

```bash
node index.js
```

Luego:

1. Selecciona los sitios que deseas bloquear.
2. Elige la duración del bloqueo.
3. FocusTimer bloqueará automáticamente los sitios seleccionados.

Cuando el temporizador termine, el acceso será restaurado.

---

## Tecnologías utilizadas

* Node.js
* @inquirer/prompts
* fs (File System)

---

## Advertencia

FocusTimer modifica temporalmente el archivo `hosts` del sistema. Asegúrate de ejecutar el script con permisos adecuados.

---

## Licencia

Este proyecto está bajo la licencia MIT.
