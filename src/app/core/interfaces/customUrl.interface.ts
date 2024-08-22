export interface CustomUrlResponse {
  id: string,
  longUrl: string,
  customUrl: string,
  customBody: string
}

export interface CustomUrlRequest {
  longUrl: string,
  customBody?: string,
  userId: string,
}

export interface CustomUrlPage {
  content: CustomUrlResponse[],
  totalElements: number,
  totalPages: number,
}
