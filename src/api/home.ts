import http from '@/utils/http'
import type { Response } from '@/types/api'

export const getSystemSettings = () => {
    return http.get<any,Response>('/api/index')
}
