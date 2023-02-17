require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
]})

const { Configuration , OpenAIApi } = require('openai');
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

client.on('messageCreate', async function(message){
    try {
        if(message.author.bot) return;
        if (message.content.startsWith('start, ')) {
            const question = message.content.slice(7)
        const gptResponse = await openai.createCompletion({
            model: 'text-davinci-003',
      prompt: `//Human readable\nQ: ${question}\nA:`,
      stop: '\n',
      temperature: 0.25,
      max_tokens: 1024,
      frequency_penalty: 1
            })
        message.reply(`${gptResponse.data.choices[0].text}`);
        return;
    }
    } catch(err){
        console.log(err)
    }
});

client.login(process.env.DISCORD_TOKEN);
console.log("Start is now online on Discord")