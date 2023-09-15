import React from 'react';
import { AxiosClient } from '../service/axiosClient';

function Table({ data }) {
    const apiBaseUrl = 'http://localhost:4200';
    const axiosClient = new AxiosClient(apiBaseUrl);

    const downloadCsv = async (id: string) => {
        try {
            const response = await axiosClient.get(`/api/export/${id}`, { responseType: 'blob' });

            // Cria um objeto Blob a partir da resposta
            // const blob = new Blob([response.data], { type: 'text/csv' });
            const blob = response.data as Blob;

            // Cria uma URL temporária para o Blob
            const url = window.URL.createObjectURL(blob);

            // Cria um link para iniciar o download do arquivo
            const link = document.createElement('a');
            link.href = url;
            link.download = 'exported_data.csv'; // Nome do arquivo
            document.body.appendChild(link);
            link.click();

            // Libera a URL temporária e remove o link
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erro ao exportar pesquisa:', error);
        }
    };

    const handleExport = async (id: string) => {
        await axiosClient.get(`/api/export/${id}`);
    }
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-900">
                <tr className="text-white">
                    <th className="px-6 py-3 text-left">ID</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Data</th>
                    <th className="px-6 py-3 text-left">Total</th>
                    <th className="px-6 py-3"></th>
                </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-200">
                {data.map((item) => (
                    <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.total}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {item.status === "sucess" && (
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => downloadCsv(item.id)}
                                >
                                    Exportar
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
