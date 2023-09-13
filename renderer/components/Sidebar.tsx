import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faDatabase, faHome, faRemove, faSearch, faTools } from '@fortawesome/free-solid-svg-icons';
import { AxiosClient } from '../service/axiosClient';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    closed: {
      x: '-100%',
    },
  };
  const apiBaseUrl = 'http://localhost:4200';
  const axiosClient = new AxiosClient(apiBaseUrl);
  const handleCleanDatabase = async () => {
    try {
      // Chame a rota /api/clean ao selecionar "Limpar Base de dados"
      await axiosClient.delete('/api/clean');
      // Você pode adicionar código adicional aqui, como atualizar o estado após a limpeza da base de dados
    } catch (error) {
      console.error('Erro ao limpar a base de dados:', error);
    }
  };
  return (
    <AnimatePresence mode='wait'>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4"
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={sidebarVariants}
          exit="closed"
        >
          <div className="mb-4">
            <h2 className="text-2xl font-bold">
              <FontAwesomeIcon icon={faTools} className='mr-2' />
              Funções
            </h2>
          </div>
          <ul>
            <li className="mb-2">
              <Link href="/home">
                <a className="text-white hover:text-blue-400">
                  <FontAwesomeIcon icon={faHome} className='mr-2' />
                  Home
                </a>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/next">
                <a className="text-white hover:text-blue-400">
                  <FontAwesomeIcon icon={faSearch} className='mr-2' />
                  Pesquisar CNPJ
                </a>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/export">
                <a className="text-white hover:text-blue-400">
                  <FontAwesomeIcon icon={faDatabase} className='mr-2' />
                  Dados
                </a>
              </Link>
            </li>
            <li className="mb-2">
              <a
                className="text-white hover:text-blue-400"
                onClick={handleCleanDatabase}
              >
                <FontAwesomeIcon icon={faRemove} className='mr-2' />
                Limpar Base de dados
              </a>
            </li>
          </ul>
          <button
            onClick={toggleSidebar}
            className="mt-4 p-2 bg-red-500 text-white hover:bg-red-600 rounded"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
