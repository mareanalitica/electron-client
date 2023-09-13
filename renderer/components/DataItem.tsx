import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faList } from '@fortawesome/free-solid-svg-icons';

function DataItem({ id, dataPesquisa }) {
    return (
        <div className="bg-white text-gray-700 rounded p-4">
            <div className="mb-2">
                ID: {id}
            </div>
            <div className="mb-2">
                Data da Pesquisa: {new Date(dataPesquisa).toLocaleDateString()}
            </div>
            <div className="flex space-x-2">
                <button className="bg-green-500 text-white px-2 py-1 rounded">
                    <FontAwesomeIcon icon={faPlay} className='mr-1' />
                    Executar
                </button>
                <button className="bg-blue-500 text-white px-2 py-1 rounded">
                    <FontAwesomeIcon icon={faList} className='mr-1' />
                    Resultados
                </button>
            </div>
        </div>
    );
}

export default DataItem;
