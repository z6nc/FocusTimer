import fs from 'fs/promises';
import { select, checkbox } from '@inquirer/prompts';
import chalk from "chalk";
import { exit } from "process";

const rutaHosts = 'C:\\Windows\\System32\\drivers\\etc\\hosts';

async function reglaBloqueo() {
    try {
        const apps = await checkbox({
            message: chalk.cyan.bold("🎯 ¿Qué distracciones deseas bloquear hoy?"),
            choices: [
                { name: chalk.blue("Facebook"), value: "127.0.0.1 facebook.com\n127.0.0.1 www.facebook.com\n" },
                { name: chalk.magenta("Instagram"), value: "127.0.0.1 instagram.com\n127.0.0.1 www.instagram.com\n" },
                { name: chalk.red("YouTube"), value: "127.0.0.1 youtube.com\n127.0.0.1 www.youtube.com\n" },
                { name: chalk.cyan("X (Twitter)"), value: "127.0.0.1 x.com\n127.0.0.1 www.x.com\n127.0.0.1 twitter.com\n127.0.0.1 www.twitter.com\n" },
                { name: chalk.white("TikTok"), value: "127.0.0.1 tiktok.com\n127.0.0.1 www.tiktok.com\n" },
                { name: chalk.green("ChatGPT"), value: "127.0.0.1 chat.openai.com\n127.0.0.1 chatgpt.com\n" },
                { name: chalk.magentaBright("Twitch"), value: "127.0.0.1 twitch.tv\n127.0.0.1 www.twitch.tv\n" },
                { name: chalk.greenBright("Kick"), value: "127.0.0.1 kick.com\n127.0.0.1 www.kick.com\n" },
                { name: chalk.hex('#FF4500')("Reddit"), value: "127.0.0.1 reddit.com\n127.0.0.1 www.reddit.com\n127.0.0.1 old.reddit.com\n" },
                { name: chalk.green("WhatsApp Web"), value: "127.0.0.1 web.whatsapp.com\n" },
                { name: chalk.blueBright("Telegram Web"), value: "127.0.0.1 web.telegram.org\n" },
                { name: chalk.hex('#5865F2')("Discord"), value: "127.0.0.1 discord.com\n127.0.0.1 www.discord.com\n127.0.0.1 discordapp.com\n" }
            ]
        });

        if (apps.length === 0) {
            console.log(chalk.yellow("\n⚠️ No seleccionaste ninguna aplicación. Saliendo de FOCUSTIMER..."));
            exit();
        }

        return apps;

    } catch (error) {
        console.log(chalk.bgRed.white.bold(`\n ❌ Error en selección: ${error.message} `));
        exit();
    }
}

async function tiempoBloqueo() {
    try {
        const tiempo = await select({
            message: chalk.cyan.bold("⏳ ¿Por cuánto tiempo quieres concentrarte?"),
            choices: [
                { name: "1 minuto (Prueba)", value: 60000 },
                { name: "5 minutos", value: 300000 },
                { name: "10 minutos", value: 600000 },
                { name: "25 minutos (Pomodoro)", value: 1500000 },
                { name: "1 hora", value: 3600000 },
                { name: chalk.red("❌ Salir"), value: "salir" }
            ]
        });

        if (tiempo === "salir") {
            console.log(chalk.green.bold("\n¡Hasta luego! Que tengas un día productivo. 🖖\n"));
            exit();
        }

        return tiempo;

    } catch (error) {
        console.log(chalk.bgRed.white.bold(`\n ❌ Error en selección de tiempo: ${error.message} `));
        exit();
    }
}

async function salir(contenidoBloqueado) {
    try {
        const data = await fs.readFile(rutaHosts, "utf8");
        // Reemplazamos exactamente lo que agregamos para dejar el archivo limpio
        const nuevoContenido = data.replace("\n" + contenidoBloqueado, "");
        await fs.writeFile(rutaHosts, nuevoContenido);

        console.log(chalk.bgGreen.black.bold("\n ✨ ¡Bloqueo finalizado! Redes desbloqueadas. ✨ \n"));
    } catch (error) {
        console.log(chalk.red.bold("\n❌ Error limpiando el archivo hosts:"), error.message);
    }
    process.exit();
}

async function bloqueadorApp() {
    console.clear(); // Limpiamos la consola para que se vea elegante
    console.log(chalk.bgBlue.white.bold(" ======================================= "));
    console.log(chalk.bgBlue.white.bold(" 🧘‍♂️ BIENVENIDO AL FOCUSTIMER  V1.0 🧘‍♂️ "));
    console.log(chalk.bgBlue.white.bold(" ======================================= \n"));

    try {
        const appsBloquear = await reglaBloqueo();
        const time = await tiempoBloqueo();

        const contenidoBloqueado = appsBloquear.join("");
        const contenidoActual = await fs.readFile(rutaHosts, 'utf8');

        if (contenidoActual.includes(contenidoBloqueado)) {
            console.log(chalk.yellow.bold(`\n⚠️ Las reglas seleccionadas ya estaban bloqueadas en tu equipo.`));
            return;
        }

        await fs.appendFile(rutaHosts, "\n" + contenidoBloqueado);

        console.log(chalk.green.bold(`\n✅ ¡Bloqueo  ACTIVADO!`));
        console.log(chalk.gray(`🔒 Se han bloqueado ${appsBloquear.length} plataforma(s).`));
        console.log(chalk.gray(`⏱️  El bloqueo se levantará automáticamente en ${time / 60000} minuto(s).`));
        console.log(chalk.cyan.bold(`\n(Presiona Ctrl + C si ocurre una emergencia y necesitas salir antes)`));

        setTimeout(async () => {
            await salir(contenidoBloqueado);
        }, time);

        process.on("SIGINT", async () => {
            console.log(chalk.bgYellow.black.bold("\n 🚨 Interrupción de emergencia detectada. Limpiando bloqueo... "));
            await salir(contenidoBloqueado);
        });

    } catch (error) {
        console.error(chalk.bgRed.white.bold("\n ❌ ERROR CRÍTICO DE PERMISOS ❌ "));
        console.error(chalk.red("Debes abrir la terminal, CMD o PowerShell como ADMINISTRADOR para usar este programa."));
        console.log(chalk.gray("Detalle técnico:", error.message));
    }
}

bloqueadorApp();