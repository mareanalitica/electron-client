import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <React.Fragment>
      <Head>
        <title>Minerador de Dados Abertos</title>
      </Head>

      {/* Hero Section */}
      <div className="relative overflow-hidden h-screen">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

        <div className="container mx-auto h-full relative z-20 flex flex-col justify-center text-center">
          <h1 className="text-5xl font-bold text-white">
            Bem-vindo ao Minerador de Dados Abertos
          </h1>
          <p className="mt-4 text-xl text-white">
            Uma ferramenta poderosa para facilitar a mineração de dados.
          </p>
          <Link href="/next">
            <a className="mt-8 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-xl transition duration-300">
              Minerar Dados
            </a>
          </Link>
          <div className="mt-6">
            <a
              href="https://www.youtube.com/embed/Crab38C45PE?autoplay=1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl hover:text-blue-500 transition duration-300"
            >
              <FontAwesomeIcon icon={faPlayCircle} className="mr-2" />
              Assista ao Vídeo
            </a>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </React.Fragment>
  );
}

export default Home;
