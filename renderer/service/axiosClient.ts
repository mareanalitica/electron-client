import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class AxiosClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
        });

        // Configurações globais, se necessário
        this.axiosInstance.defaults.headers.common['auth_token'] = 'abc123';
    }

    // Função para fazer uma solicitação GET
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.get<T>(url, config);
    }
    // Função para fazer uma solicitação DELETE
    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.delete<T>(url, config);
    }

    // Função para fazer uma solicitação POST
    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.post<T>(url, data, config);
    }
}