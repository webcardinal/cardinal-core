type Identity = {
  name: string
  email: string
  avatar: string
}
type Theme = string
type Version = string
type Page = {
  name: string
  path?: string
  src?: string
  indexed?: boolean
  children?: Array<Page>
}

export default {
  identity: {
    name: 'Cardinal',
    email: 'privatesky@axiologic.net',
    avatar: '__TODO__'
  } as Identity,
  version: '1.0.0' as Version,
  theme: 'default' as Theme,
  pages: [
    {
      name: 'Homepage',
      path: '/',
      src: 'index.html'
    }
  ] as Array<Page>
}
