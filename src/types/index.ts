export interface FetchOptions {
    method: string
    headers: {
        [x: string]: any
    }
    body?: string
    agent?: any
    [x: string]: any
}

export interface AppAuthTicket {
    access_token: string
    token_type: string
    expires_in: number
    expires_at: number
    refresh_token: string | null
}

export interface UserAuthTicket {
    accessToken: string;
    accessTokenExpiration: string;
    refreshToken: string;
    refreshTokenExpiration: string;
    userId?: string | null;
    jwtAccessToken?: string;
}

export interface AuthTicketCache {
    getAuthTicket: () => Promise<AppAuthTicket | undefined>
    setAuthTicket: (kiboAuthTicket: AppAuthTicket) => void
}

export interface APIAuthenticationFetcher {
    authenticate: () => Promise<AppAuthTicket>
    getAccessToken: () => Promise<string>
    refreshTicket: (kiboAuthTicket: AppAuthTicket) => void
}
export interface KiboApolloApiConfig {
    accessTokenUrl?: string;
    authHost: string;
    clientId: string;
    sharedSecret: string;
    apiHost: string;
}
export interface AuthHooks {
    onTicketRead: () => UserAuthTicket
    onTicketChange: (auth: UserAuthTicket) => void
    onTicketRemove: () => void
}
export interface KiboApolloClientConfig {
    api: KiboApolloApiConfig;
    clientAuthHooks?: AuthHooks
}
