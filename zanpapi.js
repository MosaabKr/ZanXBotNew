//zanpapi version 1.0.2
//Made By Socratides

const discord = require('discord.js');
const roblox = require('roblox-js');
const client = new discord.Client();
const prefix = '!';
var groupId = 3728461;
var codeWords = ['cat', 'dog', 'sun', 'rain', 'snow', 'alcazar', 'dight', 'night', 'morning', 'eyewater', 'flaws', 'physics', 'chemistry', 'history', 'martlet', 'nagware', 'coffee', 'tea', 'red', 'blue', 'green', 'orange', 'pink'];
const filter = m => m.content.includes('Done' || 'done');
var ausPer = '490255925802696715';
var adm = '490482121970810880';

client.on('ready', () => {
    client.user.setActivity('!verify');
    console.log('Ready');
});

client.on('message', (message) => {
    var args = message.content.split(/[ ]+/);

    if (isCommand('Verify', message)){
        var username = args[1];
        message.delete(2000)
        if (username){
            var rand1 = codeWords[Math.floor(Math.random() * codeWords.length)];
            var rand2 = codeWords[Math.floor(Math.random() * codeWords.length)];
            var rand3 = codeWords[Math.floor(Math.random() * codeWords.length)];
            var codeGiven = rand1 + ' ' + rand2 + ' ' + rand3
            roblox.getIdFromUsername(username)
            .then(function(id){
                console.log(id)
                message.author.send({
                    embed:{
                        color: 0x0088E2,
                        title: 'Verification Proccess',
                        fields: [{
                            name: 'READ THE INSTRUCTIONS **CAREFULLY**',
                            value: `Hello, ${username}
                            Please verify yourself by putting this code in your profile's **status**
                            **__When you're done, react with__** 👌
                            code: **${codeGiven}**`
                        }] 
                    }
                }).then(function(ch){
                    ch.react('👌')
                    const reactionFilt = (reaction) => reaction.emoji.name === '👌'
                    const collector = ch.createReactionCollector(reactionFilt, {time: 300000})
                    collector.on('collect', () => verNow())
                    function verNow(){
                        roblox.getStatus(id).then(function(status){
                            if(status.includes(codeGiven)){
                                console.log('success')
                                collector.stop()
                                message.author.send({
                                    embed: {
                                        color: 0x00FF00,
                                        title: 'Verification Proccess',
                                        fields:[{
                                            name: 'Success!',
                                            value: 'You are now verified!\
                                            Welcome!'
                                        }]
                                    }
                                })
                                message.member.setNickname(`[OR-1] ${username}`)
                                message.member.addRole(ausPer);
                                message.member.removeRole(adm);
                            }
                        }).catch(function(err){
                            message.author.send({
                                embed: {
                                    color: 0xFF0000,
                                    title: 'Verification Proccess',
                                    fields:[{
                                        name: 'Failure!',
                                        value: `Something went wrong\nPlease try again! ${err}`
                                    }]
                                }
                            })
                        })
                    }
                    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
                }).catch(function(){
                    message.author.send({
                        embed:{
                            color: 0xFF0000,
                            title: 'Verification Proccess',
                            fields:[{
                                name: 'ERROR!',
                                value: 'You tookk '
                            }]
                        }
                    })
                })
                

            })
            .catch(function(err){
                message.author.send({
                    embed:{
                        color: 0xFF0000,
                        title: 'Verification Proccess',
                        fields:[{
                            name: 'By SocraUnit',
                            value: `**ERROR** - The username ${username} does not exist!
                            Try again!`
                        }]
                    }
                })
            })

        };
    };
});

client.on('message', (message) => {
    if (isCommand('Update', message)){
        text = message.member.nickname
        nubName = text.substring(7, text.length)
        roblox.getIdFromUsername(nubName)
        .then(function(id){
            roblox.getRankInGroup(groupId, id)
            .then(function(rank){
                if (rank === 13) {
                    message.member.setNickname(`[OR-2] ${nubName}`);
                }
                else if(rank === 14) {
                    message.member.setNickname(`[OR-3] ${nubName}`)
                } else if(rank === 15) {
                    message.member.setNickname(`[OR-4] ${nubName}`)
                } else if(rank === 16) {
                    message.member.setNickname(`[OR-5] ${nubName}`)
                } else if(rank === 17) {
                    message.member.setNickname(`[ALLY] ${nubName}`)
                } else if(rank === 18) {
                    message.member.setNickname(`[OR-6] ${nubName}`)
                } else if(rank === 19) {
                    message.member.setNickname(`[OF-1] ${nubName}`)
                } else if(rank === 20) {
                    message.member.setNickname(`[OF-2] ${nubName}`)
                } else if(rank === 21) {
                    message.member.setNickname(`[OF-3] ${nubName}`)
                } else if(rank === 23) {
                    message.member.setNickname(`[OF-4] ${nubName}`)
                } else if(rank === 24) {
                    message.member.setNickname(`[OF-5] ${nubName}`)
                } else if(rank === 25) {
                    message.member.setNickname(`[OF-6] ${nubName}`)
                } else if(rank === 26) {
                    message.member.setNickname(`[OF-7] ${nubName}`)
                } else if(rank === 27) {
                    message.member.setNickname(`[OF-8] ${nubName}`)
                } else if(rank === 28) {
                    message.member.setNickname(`[OF-9] ${nubName}`)
                } else if(rank === 29) {
                    message.member.setNickname(`[FM]  ${nubName}`)
                } else if(rank === 30) {
                    message.member.setNickname(`[DEV]  ${nubName}`)
                } else if(rank === 255) {
                    message.member.setNickname(`[CIC]   ${nubName}`)
                }
            })
        })
    }
});

function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
};

client.login(process.env.BOT_TOKEN);
