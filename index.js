const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const bot = new discord.Client();
bot.commands = new discord.Collection();

const activities_list = [
    "Met jouw schoolrooster", 
    "Jouw absenties bijhouden", 
    "!help voor help"
    ]; // creates an arraylist containing phrases you want your bot to switch through.

bot.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        bot.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
    console.log(`${bot.user.username} is online.`);
});

// Geef een gebruiker een rol nadat hij/zij is gejoind / Welkomsbericht

bot.on("guildMemberAdd", member => {

   var role = member.guild.roles.find("name", "Student");

   if (!role) return;

   member.addRole(role);

}); 

bot.on("message", async message => {

   //Als bot bericht stuurt, stuur dan terug
   if (message.author.bot) return;

   if (message.channel.type == "dm") return;

   var prefix = botConfig.prefix;

   var messageArray = message.content.split(" ");

   var command = messageArray[0];

   var arguments = messageArray.slice(1);

   var commands = bot.commands.get(command.slice(prefix.length));

   if (commands) commands.run(bot, message, arguments);

   if (command === `${prefix}help`) {

    return message.channel.send("Op dit moment zijn er nog geen commando's.");

   }

   if (command === `${prefix}sike`) {

    return message.channel.send("Ok.."); 

   }
   
   if (command === `${prefix}hey`) {

    return message.channel.send("Ok.."); 

   }

});


bot.login(botConfig.token);