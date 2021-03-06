const MAIN_HELP_PAGE = `
Greetings, friend. Do you wish to look as happy as me? Well, you've got the power inside you right now. Use it, by issuing one command to \`!homer <mode> <query>\`, any text channel in this server. Don't delay. Eternal happiness is only a command away!

**Usage:** \`!homer <mode> <query>\`

where \`<mode>\` is one of:
    
    \`-m\`

\`!homer -m <query>\` Search for meme with caption relevant to the given query

\`!homer -h\` To get this message again!

This message will be updated when new features are released so check back soon!

:doughnut: :beers:
`;

const help = () => MAIN_HELP_PAGE;
module.exports = {
  help,
  responsePage: MAIN_HELP_PAGE,
};
