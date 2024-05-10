import RequestBoletoSummaryFilterDTO from '@/model/RequestBoletoSummaryFilterDTO'
import { api } from './api'
import UserDTO from '@/model/UserDTO'

export default class DataPanelService {

  public async getData() {

    const data: RequestBoletoSummaryFilterDTO = new RequestBoletoSummaryFilterDTO(new Date(), new Date())
    console.log("🚀 ~ DataPanelService ~ getData ~ data:", data)

    const response = await api.post(`/boleto/summary`, data)

    console.log("🚀 ~ DataPanelService ~ getData ~ response:", response)
    
    if (response.status === 200) {

      return response
    } else {
      throw new Error(`Erro: ${response.status}`)
    }
  }

}
