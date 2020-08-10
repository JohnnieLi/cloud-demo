import chalk from 'chalk';

const menus = {
main: `
${chalk.greenBright('johnnieliMessage [command] <options>')}
  ${chalk.blueBright('ls')} ................ show all messages
  ${chalk.blueBright('ps')} ........... show one message by id
  ${chalk.blueBright('create')}.............. create a new message 
  ${chalk.blueBright('update')} ............ update the existing message by id
  ${chalk.blueBright('rm')} ............ delete a message by id
  ${chalk.blueBright('help')} ............... show help menu for a command
`,

ls: `
${chalk.greenBright('johnnieliMessage ls <options>')}
  --page, -p ..... set the page number (optional).
  --size, -s ........ set the page size (optional).
`,

ps: `
${chalk.greenBright('johnnieliMessage ps <options>')}
johnnieliMessage ps <ID> 
  OR
  --id, -i ..... the id of the message.
`,

create: `
  ${chalk.greenBright('johnnieliMessage create <options>')}
  --body, -b ....... add the message content as the body.
`,

update: `
  ${chalk.greenBright('johnnieliMessage update <options>')}
  johnnieliMessage update <ID> 
  OR
  --id, -i ..... the id of the message.

  --body, -b ....... update the message content as the body (required).
`,

rm: `
  ${chalk.greenBright('johnnieliMessage rm <options>')}
  johnnieliMessage rm <ID> 
  OR
  --id, -i ..... the id of the message.
`
}

export async function help(args) {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]
  console.log(menus[subCmd] || menus.main)
}