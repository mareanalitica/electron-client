import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faPlay, faSearch, faSpinner, faSync } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';
import { AxiosClient } from '../service/axiosClient';


function ExportPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchList, setSearchList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // Exemplo de uso do cliente Axios
    const apiBaseUrl = 'http://localhost:4200';
    const axiosClient = new AxiosClient(apiBaseUrl);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleReload = () => {
        window.location.reload()
    };
    const handleExecute = async () => {
        try {
            setIsLoading(true);
            await axiosClient.post('/api/execute').then(() => {
                window.location.reload()
            })
        } catch (error) {
            console.log("error", error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // Fazer a solicitação GET para a API
        axiosClient.get('/api/search')
            .then((response) => {
                if (Array.isArray(response.data)) {
                    const formattedData = response.data.map((item) => ({
                        id: item.id,
                        status: item.status,
                        date: new Date(item.date).toLocaleDateString(),
                        total: item.total,
                    }));
                    setSearchList(formattedData)
                }
            })
            .catch((error) => {
                console.error('Erro ao carregar dados:', error);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-900">
            <Head>
                <title>Minerar & Exportar Dados</title>
            </Head>

            <header className="shadow bg-gray-900 p-4">
                <div className="container mt-5 mx-auto flex justify-evenly items-center">
                    <img className="w-24 h-24" src="/images/logo.png" alt="Logo" />
                    <h1 className="text-2xl">⚡ Exportar dados ⚡</h1>
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden p-2 bg-gray-800 text-white rounded-full"
                    >
                        <FontAwesomeIcon icon={faHamburger} />
                    </button>
                </div>
            </header>

            <main className="container mx-auto p-4">
                <Table data={searchList} />

                <div className="fixed top-4 right-4 space-x-2">
                    {/* <button
                        onClick={() => {
                            handleReload()
                        }}
                        className="p-2 bg-gray-800 text-white rounded-full"
                    >
                        Atualizar
                        <FontAwesomeIcon className="ml-2 mr-2" icon={faSync} />
                    </button> */}
                    <button
                        onClick={() => { handleExecute() }}
                        className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-full"
                    >
                        {isLoading ? 'Carregando...' : 'Executar'}
                        {isLoading && <FontAwesomeIcon className="ml-2 mr-2" icon={faSpinner} spin />}
                        {!isLoading && <FontAwesomeIcon className="ml-2 mr-2" icon={faPlay} />}
                    </button>
                </div>

                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </main>
        </div>
    );
}

export default ExportPage;
