const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} = require('@discordjs/voice')
const { SlashCommandBuilder } = require('discord.js')
const ytdl = require('ytdl-core')
const YouTube = require('youtube-sr').default

module.exports = {
  data: new SlashCommandBuilder()
    .setName('music')
    .setDescription('Plays the song that you enter.')
    .addStringOption((option) =>
      option
        .setName('song')
        .setDescription('Enter the song to play')
        .setRequired(true)
    ),
  async execute(interaction) {
    const song = interaction.options.getString('song')
    const channel = interaction.member.voice.channel
    if (!channel) {
      return interaction.reply('You need to join a voice channel first!')
    }

    // Defer the reply
    await interaction.deferReply()

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    })

    // Search for the song on YouTube
    const results = await YouTube.search(song, { limit: 1 })
    if (results.length === 0) {
      return interaction.editReply('No results found for that song.')
    }

    const stream = ytdl(results[0].url, { filter: 'audioonly' })
    const resource = createAudioResource(stream)
    const player = createAudioPlayer()

    player.play(resource)
    connection.subscribe(player)

    // Edit the deferred reply
    await interaction.editReply(`Playing ${song}`)
  },
}
