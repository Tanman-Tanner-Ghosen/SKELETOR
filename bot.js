const Discord = require('discord.js');
const { prefix, token, nsfw} = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log("Logged In!");
    client.user.setActivity("For Help, Type "+prefix+"bothelp.");
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.on('message', async message => {
	if (message.isMemberMentioned(client.user) && !message.content.includes("@here") && !message.content.includes("@everyone")) { 
      message.reply("Do you need help? Use "+prefix+"bothelp for help, otherwise hello!");
   }
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

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
			if(nsfw==1)
			{
			const replies = ["Yes","No","Maybe","Ask Again",
							 "Yea","Nah","Possibly","Try again",
							 "Yep","Nope","They may","Repeat the question",
							  "Si","Nein","It could go either way","Say it again",
							  "Fuck yes","Fuck no","Fucking maybe","Say it again you fucker",
							  "Hell yeah","Hell no","Shit, maybe","Please say it again",
							  "Very likely","Very unlikely","It can go to possibly yes or no","Could you repeat that",
							  "Aye","Nay","Possibleth","Never fucking ask this question again you retarded fuck",
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
		if(nsfw==1){
		if (!args.length) {
			return message.channel.send(`Valid arguments: yoda, skeletor`);
		}
			if (args[0] === 'yoda')
			{
				const replies = [
				"Anakin Skywalker, whiny little bitch, he is. Stand him, I cannot.",
				"Run over people in my 2003 Honda Civic, I must.",
				"Paid my taxes since 2003, I have not. Die in a shootout with the IRS, I will.",
				"Put Goku in Smash, Sakurai has not. Goku, perfect for Smash, he is. Dragonball Fan, I am.",
				"Run over people playing Pokemon Go and blame it on the liberals, I must.",
				"Worship Ewan McGregor, I do. God-like Obi-wan, he is. Suck him off, I would.",
				"Overdosed on ketamine, I have. Medical assistance, I need. Dying, I am.",
				"Play League of Legends on my smurf, I will. Call someone the n-word, I definitely shall.",
				"Do or do not, there is no trying ketamine without addiction.",
				"Luke, deep into the Dagobah forest he went. Killed my neighbor dressed up as Darth Vader. Horrified, I was.",
				"Mortal enemy, Darth Jar Jar is. Powerful with the dark side of memes, he is.",
				"Food machine, broke it is. Understandable, that is.",
				"Rise of Skywalker, saw I did. My impersonator, shitty he was. Support women, I would not.",
				"If into the deep web you go, only dead bodies will you find.",
				"Saucy boy, you are. What, egg you are? Stab him, I did.",
				"Make American Great Again, I will. Wear orange makeup and a blond wig, I will.",
				"Mom, found my cumsock she did. Dead, I fucking am.",
				"Allah, angry at me for not successfully commiting a worthy jihad against the Jedi Temple, he is.",
				"Baby Yoda, fucking little punk he is. Call me a fucking boomer, he did.",
				"If a woman breathes, a thot she is. A queen, she will never be.",
				"Anakin Skywalker, afraid of losing his wife, he is? Boo fucking hoo, that is, lost my shins in Vietnam, I did.",
				"Obi-Wan, dumbass he is. Turned my Deathstick dealer to a good dude, he did. How the fuck will I get Deathsticks, I do not know.",
				"Deny Anakin Skywalker the rank of Master, I did. Very funny, his reaction was. Murdering the younglings, not so funny that was.",
				"Tanman Tanner, shitty at coding Discord bots he is. A clusterfuck source code, I do have.", // :)
				"Hah, Crush my cock with a rock, I must. Maximum pain, I must endure. Okay, here we go. *incomprehensible screaming*",
				"Deathsticks is the path to the Ketamine addiction. Deathsticks leads to Bantha bile. Bantha bile leads to Namana liquor. Namana liquor leads to Ketamine.",
				"Go, die in a shootout with police over my ketamine in my 2003 Honda Civic I will.",
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
			message.reply("Command has been disabled in config.json under 'nsfw'");
		}
	}
	else if(command === 'kick')
	{
		if(!message.member.roles.some(r=>["Admins", "Admin", "The Cool Kids", "Moderators","Mods","Mod","Moderator"].includes(r.name)) )
      return message.reply("You lack the role requirements.");
    
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
	  if(!message.member.roles.some(r=>["Admins", "Admin","Moderators","Mods","Mod","Moderator","Staff"].includes(r.name)) )
      return message.reply("You lack the role requirements.");
    
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
	else if(command === 'purge')
	{
	  if(!message.member.roles.some(r=>["Admins", "Admin","Moderators","Mods","Mod","Moderator","Staff"].includes(r.name)) )
      return message.reply("You lack the role requirements.");
    

    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 10)
      return message.reply("Provide a number between 2 and 10 for the number of messages to delete.");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
	}
	else if(command === 'ping')
	{
    const m = await message.channel.send("Fetching Ping... Wait please...");
    m.edit(`NYEEEEH! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
	}
	else if(command === 'bothelp')
	{
		if(nsfw==1)
		{
			var embedhelpmember = new Discord.RichEmbed()
			.setTitle("**SKELETOR**\n")
			.addField("Bot Help",`I am the SKELETOR Discord Bot, Version 1.666, 2019-2022 by "TANMAN TANNER" Ghosen.\nPrefix for the following commands is '`+prefix+"'.\n Commands: dice, rps, 8ball, funny, kick, ban, purge, ping, bothelp");
			message.channel.send(embedhelpmember);
		}
		else
		{
			var embedhelpmember = new Discord.RichEmbed()
			.setTitle("**SKELETOR**\n")
			.addField("Bot Help",`I am the SKELETOR Discord Bot, Version 1.666, 2019-2022 by "TANMAN TANNER" Ghosen.\nPrefix for the following commands is '`+prefix+"'.\n Commands: dice, rps, 8ball, kick, ban, purge, ping, bothelp");
			message.channel.send(embedhelpmember);
		}
	}
});

client.login(token);
