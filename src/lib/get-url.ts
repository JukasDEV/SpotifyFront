export function getUrl(path?: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    //.... mexer aqui caso de bug na redirecionaçao do site
    const normalizedPath = path && !path.startsWith('/') ? `/${path}` : path || ''
    return `${baseUrl}${normalizedPath}`
}