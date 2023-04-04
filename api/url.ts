export const getBaseURL = (): string => {
  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'local':
      return 'https://metaverse-demo.com'
    case 'dev':
      return 'https://dev1-metaverse.com'
    case 'qa':
      return 'https://metaverse-demo.com'
    case 'prod':
      return 'https://app.tryspace.com'
    default:
      console.log('No ENV set')
      return 'https://metaverse-demo.com'
  }
}


export const getClientUrl = (): string => {
  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'local':
      return `http://localhost:3000`
    case 'qa':
      return 'https://qa.tryspace.com'
    case 'prod':
      return 'https://tryspace.com'
    default:
      console.log('No ENV set')
      return 'https://qa.tryspace.com'
  }
}


export function getImmersURL() {
  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'local':
      return 'https://localhost:8081'
    case 'dev':
      return 'https://accounts.dev1-metaverse.com'
    case 'qa':
      return 'https://accounts.metaverse-demo.com'
    case 'prod':
      return 'https://accounts.tryspace.com'
    default:
      console.log('No ENV set')
      return 'https://accounts.dev1-metaverse.com'
  }
}