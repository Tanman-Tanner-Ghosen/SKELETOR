const Discord = require('discord.js');
const Enmap = require("enmap");

const {token} = require('./config.json');
const client = new Discord.Client();

let guildSize = client.guilds.size;
client.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});
const defaultSettings = {
  prefix: "~",
  nsfw: 1,
}
client.on('ready', () => {
    console.log("Logged In!");
	client.user.setActivity(`${client.guilds.cache.size} Discord Servers. Ping me or use bothelp for help.`, { type: 'LISTENING' });
	
});

client.on("guildCreate", function(guild){
	client.user.setActivity(`${client.guilds.cache.size} Discord Servers. Ping me or use bothelp for help.`, { type: 'LISTENING' });
});

client.on("guildDelete", function(guild){
	client.user.setActivity(`${client.guilds.cache.size} Discord Servers. Ping me or use bothelp for help.`, { type: 'LISTENING' });
	client.settings.delete(guild.id);
});

client.on('message', async message => {
	  const guildConf = client.settings.ensure(message.guild.id, defaultSettings);
	if (message.mentions.has(client.user) && !message.content.includes("@here") && !message.content.includes("@everyone")) { 
      message.reply("Do you need help? Use "+guildConf.prefix+"bothelp for help, otherwise hello!");
   }
	if(!message.guild || message.author.bot) return;

  // We can use ensure() to actually grab the default value for settings,
  // if the key doesn't already exist. 

  // Now we can use the values! 
  // We stop processing if the message does not start with our prefix for this guild.
  if(message.content.indexOf(guildConf.prefix) !== 0) return;

  //Then we use the config prefix to get our arguments and command:
  const args = message.content.split(/\s+/g);
  const command = args.shift().slice(guildConf.prefix.length).toLowerCase();

	if (command === 'rps') 
	{
		if (!args.length) {
			return message.channel.send(`Valid arguments: rock, paper, scissors`);
		}
		var computerChoice = Math.random();
        if (computerChoice < 0.34) 
		{
            computerChoice = "rock";
        } 
		else if(computerChoice <= 0.67) 
		{
            computerChoice = "paper";
        } 
		else 
		{
            computerChoice = "scissors";
        }
		 var compare = function(choice1,choice2) 
		 {
            if (choice1 === choice2)
			{
                return ("You chose "+choice1+", I chose "+choice2+". It's a tie!");
            }
            if (choice1 === "rock") 
			{
                if (choice2 === "scissors")
				{
                    // rock wins
                    return "You chose rock, I chose scissors. You win!";
                } 
				else
				{
                    // paper wins
                    return "You chose rock, I chose paper. You lose!";
                }
            }
            if (choice1 === "paper") 
			{
                if (choice2 === "rock") 
				{
                    // paper wins
                    return "You chose paper, I chose rock. You win!";
                } 
				else 
				{
                    // scissors wins
                    return "You chose paper, I chose scissors. You lose!";
                }
            }
            if (choice1 === "scissors")
			{
                if (choice2 === "rock")
				{
                    // rock wins
                    return "You chose scissors, I chose rock. You lose!";
                } 
				else 
				{
                    // scissors wins
                    return "You chose scissors, I chose paper. You win!";
                }
            }
			else
			{
				return "Please use either 'rock', 'paper', or 'scissors'.";
			}
        };
        // Run the compare function
        var results = compare(args[0],computerChoice);
		message.channel.send(results);
	}
	else if (command === 'dice') {
		var randomdice=Math.round(Math.random()*5);
		var botrandomdice=Math.round(Math.random()*5);
		if(botrandomdice > randomdice)
		{
        message.reply(" you rolled a "+(randomdice+1)+", I rolled a "+(botrandomdice+1)+". I win.");
		}
		else if(botrandomdice < randomdice)
		{
        message.reply(" you rolled a "+(randomdice+1)+", I rolled a "+(botrandomdice+1)+". You win.");
		}
		else if(botrandomdice == randomdice)
		{
        message.reply(" you rolled a "+(randomdice+1)+", I rolled a "+(botrandomdice+1)+". We tied.");
		}
	}
	else if (command === "8ball")
	{
		if (!args.length) 
		{
			return message.channel.send(`You have to say something to get an 8-ball answer.`);
		}
		else
		{
			if(guildConf.nsfw==1)
			{
			const replies = ["Yes","No","Maybe","Ask Again",
							 "Yea","Nah","Possibly","Try again",
							 "Yep","Nope","They may","Repeat the question",
							  "Si","Nein","It could go either way","Say it again",
							  "Fuck yes","Fuck no","Fucking maybe","Say it again you fucker",
							  "Hell yeah","Hell no","Shit, maybe","Please say it again",
							  "Very likely","Very unlikely","It can go to possibly yes or no","Could you repeat that",
							  "Aye","Nay","Possibleth","Never fucking ask this question again",
							  "Ja","Negatory","I really can't say off the top of my head","Can you ask me another question"];
				message.replytext = Math.floor((Math.random() * replies.length) + 0);
			return message.reply(replies[message.replytext]+".");
			}
			else
			{
				const replies = ["Yes","No","Maybe","Ask Again",
							 "Yea","Nah","Possibly","Try again",
							 "Yep","Nope","They may","Repeat the question",
							  "Si","Nein","It could go either way","Say it again",
							  "Ja","Negatory","I really can't say off the top of my head","Can you ask me another question"];
				message.replytext = Math.floor((Math.random() * replies.length) + 0);
			return message.reply(replies[message.replytext]+".");
			}
		}
	}
	else if (command === "funny") 
	{
		if(guildConf.nsfw==1){
		if (!args.length) {
			return message.channel.send(`Valid arguments: yoda, skeletor`);
		}
			if (args[0] === 'yoda')
			{
				const replies = [
				"Anakin Skywalker, whiny little bitch, he is. Stand him, I cannot.",
				"Paid my taxes since 2003, I have not. Die in a shootout with the IRS, I will.",
				"Put Goku in Smash, Sakurai has not. Goku, perfect for Smash, he is. Dragonball Fan, I am.",
				"Worship Ewan McGregor, I do. God-like Obi-wan, he is.",
				"Do or do not, there is no trying ketamine without addiction.",
				"Luke, deep into the Dagobah forest he went. Killed my neighbor dressed up as Darth Vader. Horrified, I was.",
				"Mortal enemy, Darth Jar Jar is. Powerful with the dark side of memes, he is.",
				"Food machine, broke it is. Understandable, that is.",
				"Saucy boy, you are. What, egg you are? Stab him, I did.",
				"Baby Yoda, fucking little punk he is. Call me a fucking boomer, he did.",
				"Obi-Wan, dumbass he is. Turned my Deathstick dealer to a good dude, he did. How the fuck will I get Deathsticks, I do not know.",
				"Deny Anakin Skywalker the rank of Master, I did. Very funny, his reaction was. Murdering the younglings, not so funny that was.",
				"Deathsticks is the path to the Ketamine addiction. Deathsticks leads to Bantha bile. Bantha bile leads to Namana liquor. Namana liquor leads to Ketamine.",
				"Backflip I do, responsible for war crimes I am.",
				"Hee hee hoo hoo little creature I am. Oooooo huuhuhuhu."
				];
			message.replytext = Math.floor((Math.random() * replies.length) + 0);
				message.replytext = Math.floor((Math.random() * replies.length) + 0);
			return message.reply(replies[message.replytext]);
			}
			else if(args[0] === 'skeletor')
			{
				const replies = [
				"THE PIZZA, HE-MAN, EAT IT!",
				"I shall slam you into the pavement Shaquille O'Neil!",
				"I will smoke as much ganja as I want, because I am a rad dude.",
				"This goes right up your ass, NYEEEEEEEEEH!",
				"I am not nice. NYEEEEEEEEEH!"
				];
			message.replytext = Math.floor((Math.random() * replies.length) + 0);
				message.replytext = Math.floor((Math.random() * replies.length) + 0);
			return message.reply(replies[message.replytext]);
			}
			/*else if(args[0] === 'placeholder')
			{
				const replies = [
				""
				];
			message.replytext = Math.floor((Math.random() * replies.length) + 0);
				message.replytext = Math.floor((Math.random() * replies.length) + 0);
			return message.reply(replies[message.replytext]);
			}*/
		}
		else
		{
			message.reply("Command has been disabled. Admins can reenable this command, via "+guildConf.prefix+"config nsfw 1");
		}
	}
	else if(command === 'kick')
	{
	  if (!message.member.hasPermission(['ADMINISTRATOR'])){
      return message.reply("You lack the role requirements.");
	  }
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("You must provide a valid member.");
    if(!member.kickable) 
      return message.reply("Unable to kick member. Said member may have a higher role than me.");
    
    let reason = args.slice(1).join(' ');
     if(!reason) reason = "No Reason Given";
    
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
	}
	else if(command === 'ban')
	{
	  if (!message.member.hasPermission(['ADMINISTRATOR'])){
      return message.reply("You lack the role requirements.");
	  }
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("You must provide a valid member.");
    if(!member.bannable) 
      return message.reply("Unable to ban member. Said member may have a higher role than me.");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No Reason Given";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
	}
	else if(command === 'ping')
	{
    const m = await message.channel.send("Fetching Ping... Wait please...");
    m.edit(`NYEEEEH! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms.`);
	}
	else if(command === "config") {
    // Command is admin only, let's grab the admin value: 

    // Then we'll exit if the user is not admin
	  if (!message.member.hasPermission(['ADMINISTRATOR'])){
      return message.reply("You lack the role requirements.");
	  }
		if (!args.length) {
			return message.channel.send(`Valid arguments: prefix, nsfw`);
		}
    // Let's get our key and value from the arguments. 
    // This is array destructuring, by the way. 
    const [prop, ...value] = args;
    // Example: 
    // prop: "prefix"
    // value: ["+"]
    // (yes it's an array, we join it further down!)

    // We can check that the key exists to avoid having multiple useless, 
    // unused keys in the config:
    if(!client.settings.has(message.guild.id, prop)) {
      return message.reply("This key is not in the configuration.");
    }

    // Now we can finally change the value. Here we only have strings for values 
    // so we won't bother trying to make sure it's the right type and such. 
    client.settings.set(message.guild.id, value.join(" "), prop);

    // We can confirm everything's done to the client.
    message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
  }
  else if (command==="server")
  {
	  message.reply(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
  }
	else if(command === 'bothelp')
	{
		if(guildConf.nsfw==1)
		{
			var embedhelpmember = new Discord.MessageEmbed()
			.setTitle("**SKELETOR**\n")
			.addField("Bot Help",`I am the SKELETOR Discord Bot, Version 2, 2019-2022 by "TANMAN TANNER" Ghosen.\nPrefix for the following commands is '`+guildConf.prefix+"'.\n Commands: dice, rps, 8ball, funny, kick, ban, ping, bothelp, config");
			message.channel.send(embedhelpmember);
		}
		else
		{
			var embedhelpmember = new Discord.MessageEmbed()
			.setTitle("**SKELETOR**\n")
			.addField("Bot Help",`I am the SKELETOR Discord Bot, Version 2, 2019-2022 by "TANMAN TANNER" Ghosen.\nPrefix for the following commands is '`+guildConf.prefix+"'.\n Commands: dice, rps, 8ball, kick, ban, ping, bothelp, config");
			message.channel.send(embedhelpmember);
		}
	}
});

client.login(token);
