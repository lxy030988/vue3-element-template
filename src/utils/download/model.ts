interface TParamData {
  [key: string]: any
}

export interface TParamDownload {
  url: string
  fileName: string
  data: TParamData
  [key: string]: any
}

export enum DownloadingFileType {
  WORD,
  EXCEL,
  ZIP
}

export interface TDownloadingFileItem {
  id: string
  name: string
  type: DownloadingFileType
}

export type TDownloadingFile = Record<string, TDownloadingFileItem>
