import AddressDTO from '@/model/AddressDTO'
import { api } from './api'

export default class CEPService {
  public async getCEPData(zipCode: string) {
    const url = `https://brasilapi.com.br/api/cep/v1/${zipCode}`
    const response = await api.get(url)

    if (response.status === 200) {
      if (response.data.erro) {
        throw new Error('CEP não encontrado')
      }

      console.log('getCEP', response.data)
      return response.data
    } else {
      throw new Error(`Erro: ${response.status}`)
    }
  }
}
