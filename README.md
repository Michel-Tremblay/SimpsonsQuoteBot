![Node.js CI](https://github.com/Michel-Tremblay/SimpsonsQuoteBot/workflows/Node.js%20CI/badge.svg)

# Homer  

## How Homer works

### General

**Keyword:** ```!homer <mode> <query>```

Homer implements the [Frinkiac API](https://www.npmjs.com/package/frinkiac) to search for relevent matches to your ```<query>```.  

In general, it's best to use a portion of the query as Homer uses ```Match.Subtitle.Caption.indexOf(query)``` to test for a match.

## Modes

More modes to come!

### -h Help

This will send you a DM with basic usage info

### -m Meme generator (Beta)

This mode will attempt to generate a link to a relavent image with a caption matching your ```query```.  

May return multiple results depending on how specific your ```query``` is.  

