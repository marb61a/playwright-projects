// This file holds global types which will be used across the framework
// It saves defining the types across multiple places

export type PageId = string
export type PagesConfig = Record<PageId, Record<string, string>>
export type HostsConfig = Record<string, string>

export type GlobalConfig = {
    hostsConfig: HostsConfig,
    pagesConfig: PagesConfig
}
