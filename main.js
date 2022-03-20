/*
 8   8                                      8""""8   8"""88 ""8""         / /    8""""                          8""""8                                  
8   8  eeeee e    e eeeee  eeeee e    e    8    8   8    8   8          / /     8     eeeee  eeeee eeeee eeeee 8    8   eeeee  eeee e   e  eeee eeeee  
8eee8e 8   8 8    8 8   8  8  88 8    8    8eeee8ee 8    8   8e        / /      8eeee 8   8  8  88 8   "   8   8eeee8ee 8   8  8    8   8  8    8   8  
88   8 8eee8 8eeee8 8eee8e 8   8 eeeeee    88     8 8    8   88       / /       88    8eee8e 8   8 8eeee   8e  88     8 8eee8e 8eee 8eee8e 8eee 8eee8e 
88   8 88  8   88   88   8 8   8 88   8    88     8 8    8   88      / /        88    88   8 8   8    88   88  88     8 88   8 88   88   8 88   88   8 
88   8 88  8   88   88   8 8eee8 88   8    88eeeee8 8eeee8   88     / /         88    88   8 8eee8 8ee88   88  88eeeee8 88   8 88ee 88   8 88ee 88   8         

Licence :
2022
By FrostBreker For Kayrox
Name: Kayrox’ Bot
V: 1.3.0
*/
const { Client, Collection } = require('discord.js');
require('discord-reply');
require('dotenv').config();
const { readdirSync } = require("fs");
const TOKEN = process.env.TOKEN;

const app = express();
const port = process.env.PORT;

//Create client
const client = new Client();
//Add discord buttons
require("discord-buttons")(client)
//Add fucntions to client
require("./utils/functions")(client);
//Load events
require(`./utils/handlers/Event`)(client)
//add Mongoose
client.mongoose = require("./utils/mongoose");
//Add all commands in collection
["commands", "invites"].forEach(x => client[x] = new Collection());

//Load all commands
const loadCommands = (dir = "./commands/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for (const file of commands) {
            const getFileName = require(`${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName);
            console.log(`Dossier Chargeée [🗂️] : ${getFileName.help.category}`)
            console.log(`Commande chargée [🛢️] : ${getFileName.help.name}`, "\n_______________________________________")
        };
    });
};

loadCommands();
//Connect to DB
client.mongoose.init(client.timestampParser());

//Process for error
process.on("exit", code => { console.log(`Le processus s'est arrêté avec le code: ${code}!`); });
process.on("uncaughtException", (err, origin) => { console.log(`uncaughtException: ${err}`, `Origine: ${origin}`); });
process.on("unhandledRejection", (reason, promise) => { console.log(`UNHANDLED_REJECTION: ${reason}\n--------\n`, promise); });
process.on("warning", (...args) => { console.log(...args); });

//Login
client.login(TOKEN);

app.listen(port, () => {
    console.log(`${client.timestampParser()} => Express server is connected on port: ${port}`)
});