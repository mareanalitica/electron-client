import React, { useState } from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { AxiosClient } from '../service/axiosClient';
import { useRouter } from 'next/router';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

function Next() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const apiBaseUrl = 'http://localhost:4200';
  const axiosClient = new AxiosClient(apiBaseUrl);
  const router = useRouter();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const initialFormData = {
    termo: [],
    atividade_principal: [],
    natureza_juridica: [],
    uf: [],
    municipio: [],
    situacao_cadastral: 'ATIVA',
    cep: [],
    ddd: [],
    data_abertura_lte: '',
    data_abertura_gte: '',
    capital_social_lte: '',
    capital_social_gte: '',
    somente_mei: false,
    excluir_mei: false,
    com_email: false,
    incluir_atividade_secundaria: false,
    com_contato_telefonico: true,
    somente_fixo: false,
    somente_celular: false,
    somente_matriz: false,
    somente_filial: false,
  }
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const submitForm = async () => {
    const data = {
      params: {
        query: {
          termo: formData.termo,
          atividade_principal: formData.atividade_principal,
          natureza_juridica: formData.natureza_juridica,
          uf: formData.uf,
          municipio: formData.municipio,
          situacao_cadastral: 'ATIVA',
          cep: formData.cep,
          ddd: formData.ddd,
        },
        range_query: {
          data_abertura: {
            lte: formData.data_abertura_lte || null,
            gte: formData.data_abertura_gte || null,
          },
          capital_social: {
            lte: formData.capital_social_lte,
            gte: formData.capital_social_gte,
          },
        },
        extras: {
          somente_mei: formData.somente_mei,
          excluir_mei: formData.excluir_mei,
          com_email: formData.com_email,
          incluir_atividade_secundaria: formData.incluir_atividade_secundaria,
          com_contato_telefonico: formData.com_contato_telefonico,
          somente_fixo: formData.somente_fixo,
          somente_celular: formData.somente_celular,
          somente_matriz: formData.somente_matriz,
          somente_filial: formData.somente_filial,
        },
      },
      status: 'pending',
    };

    console.log(data);

    try {
      setIsLoading(true);
      await axiosClient.post('/api/search', data);
      setFormData(initialFormData);
      router.push("/export")
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Pesquisa - Mare Analitica</title>
      </Head>
      <div className="grid grid-cols-1 text-2xl w-full text-center mt-2">
        <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-6">Filtro de empresas</h1>
          <span className='mb-2'>⚡ Pesquisa por CNPJ ⚡</span>
          {isLoading ? (
            <div>
              <Player
                autoplay
                loop
                src="https://lottie.host/5e6fedbb-a447-400f-ab8e-f5db5ab985a4/iDPV5bwlhM.json"
                style={{ height: '150px', width: '150px' }}
              >
                <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
              </Player>
            </div>
          ) : (
            <div className="text-gray-700 text-center">
              {currentStep === 1 && (
                <div className='grid grid-cols-2 gap-4'>
                  <label htmlFor="termo" className="block text-white text-xl font-semibold mb-2">
                    Termo:
                  </label>
                  <input
                    type="text"
                    id="termo"
                    name="termo"
                    value={formData.termo}
                    onChange={(e) => {
                      const value = e.target.value.trim(); // Remove espaços em branco do início e do fim
                      if (value == "") {
                        handleChange('termo', []);
                      } else {
                        handleChange('termo', [value]);
                      }
                    }}
                    className="border rounded-lg px-2 py-1 w-full mb-4"
                  />
                  <label htmlFor="atividade_principal" className="block text-white text-xl font-semibold mb-2">
                    Atividade Principal:
                  </label>
                  <input
                    type="text"
                    id="atividade_principal"
                    name="atividade_principal"
                    value={formData.atividade_principal}
                    onChange={(e) => {
                      const value = e.target.value.trim(); // Remove espaços em branco do início e do fim
                      if (value == "") {
                        handleChange('atividade_principal', []);
                      } else {
                        handleChange('atividade_principal', [value]);
                      }
                    }}
                    className="border rounded-lg px-2 py-1 w-full mb-4"
                  />

                  <label htmlFor="natureza_juridica" className="block text-white text-xl font-semibold mb-2">
                    Natureza Jurídica:
                  </label>
                  <input
                    type="text"
                    id="natureza_juridica"
                    name="natureza_juridica"
                    value={formData.natureza_juridica}
                    onChange={(e) => {
                      const value = e.target.value.trim(); // Remove espaços em branco do início e do fim
                      if (value == "") {
                        handleChange('natureza_juridica', []);
                      } else {
                        handleChange('natureza_juridica', [value]);
                      }
                    }}
                    className="border rounded-lg px-2 py-1 w-full mb-4"
                  />

                  <label htmlFor="uf" className="block text-white text-xl font-semibold mb-2">
                    UF:
                  </label>
                  <input
                    type="text"
                    id="uf"
                    name="uf"
                    value={formData.uf}
                    onChange={(e) => {
                      const value = e.target.value.trim(); // Remove espaços em branco do início e do fim
                      if (value == "") {
                        handleChange('uf', []);
                      } else {
                        handleChange('uf', [value]);
                      }
                    }}
                    className="border rounded-lg px-2 py-1 w-full mb-4"
                  />

                  <label htmlFor="municipio" className="block text-white text-xl font-semibold mb-2">
                    Município:
                  </label>
                  <input
                    type="text"
                    id="municipio"
                    name="municipio"
                    value={formData.municipio}
                    onChange={(e) => {
                      const value = e.target.value.trim(); // Remove espaços em branco do início e do fim
                      if (value == "") {
                        handleChange('municipio', []);
                      } else {
                        handleChange('municipio', [value]);
                      }
                    }}
                    className="border rounded-lg px-2 py-1 w-full mb-4"
                  />
                  <button onClick={nextStep} className="bg-yellow-400 text-blue-500 hover:bg-yellow-300 hover:text-blue-600 px-6 py-3 rounded-full text-lg font-semibold">
                    Próximo
                  </button>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <label htmlFor="cep" className="block text-white text-xl font-semibold mb-2">
                    CEP:
                  </label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    value={formData.cep}
                    onChange={(e) => {
                      const value = e.target.value.trim(); // Remove espaços em branco do início e do fim
                      if (value == "") {
                        handleChange('cep', []);
                      } else {
                        handleChange('cep', [value]);
                      }
                    }}
                    className="border rounded-lg px-2 py-1 w-full mb-4"
                  />

                  <label htmlFor="ddd" className="block text-white text-xl font-semibold mb-2">
                    DDD:
                  </label>
                  <input
                    type="text"
                    id="ddd"
                    name="ddd"
                    value={formData.ddd}
                    onChange={(e) => {
                      const value = e.target.value.trim(); // Remove espaços em branco do início e do fim
                      if (value == "") {
                        handleChange('ddd', []);
                      } else {
                        handleChange('ddd', [value]);
                      }
                    }}
                    className="border rounded-lg px-2 py-1 w-full mb-4"
                  />
                  <div className="flex mb-4">
                    <div className="w-1/2 pr-2">
                      <label htmlFor="data_abertura_gte" className="text-white block text-xl font-semibold mb-2">
                        Data de Abertura (De):
                      </label>
                      <input
                        type="date"
                        id="data_abertura_gte"
                        name="data_abertura_gte"
                        value={formData.data_abertura_gte}
                        onChange={(e) => handleChange('data_abertura_gte', e.target.value)}
                        className="border rounded-lg px-2 py-1 w-full"
                      />
                    </div>
                    <div className="w-1/2 pl-2">
                      <label htmlFor="data_abertura_lte" className="text-white block text-xl font-semibold mb-2">
                        Data de Abertura (Até):
                      </label>
                      <input
                        type="date"
                        id="data_abertura_lte"
                        name="data_abertura_lte"
                        value={formData.data_abertura_gte}
                        onChange={(e) => handleChange('data_abertura_gte', e.target.value)}
                        className="border rounded-lg px-2 py-1 w-full"
                      />
                    </div>
                  </div>

                  {/* Campos para Capital Social */}
                  <div className="flex">
                    <div className="w-1/2 pr-2">
                      <label htmlFor="capital_social_gte" className="text-white block text-xl font-semibold mb-2">
                        Capital Social (Mínimo):
                      </label>
                      <input
                        type="number"
                        id="capital_social_gte"
                        name="capital_social_gte"
                        value={formData.capital_social_gte}
                        onChange={(e) => handleChange('capital_social_gte', e.target.value)}
                        className="border rounded-lg px-2 py-1 w-full"
                      />
                    </div>
                    <div className="w-1/2 pl-2">
                      <label htmlFor="capital_social_lte" className="text-white block text-xl font-semibold mb-2">
                        Capital Social (Máximo):
                      </label>
                      <input
                        type="number"
                        id="capital_social_lte"
                        name="capital_social_lte"
                        value={formData.capital_social_gte}
                        onChange={(e) => handleChange('capital_social_gte', e.target.value)}
                        className="border rounded-lg px-2 py-1 w-full"
                      />
                    </div>
                  </div>
                  <label htmlFor="capital_social_lte" className="text-white block text-sm font-semibold mb-2">
                    A limitação é uma questão de erros ao testar com valores diferentes.
                  </label>

                  {/* Adicione mais campos do segundo passo aqui */}

                  <div className='mt-2'>
                    <button onClick={prevStep} className="bg-yellow-400 text-blue-500 hover:bg-yellow-300 hover:text-blue-600 px-6 py-3 rounded-full text-lg font-semibold">
                      Anterior
                    </button>
                    <button onClick={nextStep} className="bg-green-700 text-white hover:bg-green-400 px-6 py-3 rounded-full text-lg font-semibold">
                      Próximo
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <label className="block text-white text-xl font-semibold mb-4">
                    Extras:
                  </label>
                  <div className="mb-2">
                    <input
                      type="checkbox"
                      id="somente_mei"
                      name="somente_mei"
                      checked={formData.somente_mei}
                      onChange={() => handleChange('somente_mei', !formData.somente_mei)}
                      className="mr-2"
                    />
                    <label htmlFor="somente_mei" className="text-white">
                      Somente MEI
                    </label>
                  </div>

                  <div className="mb-2">
                    <input
                      type="checkbox"
                      id="excluir_mei"
                      name="excluir_mei"
                      checked={formData.excluir_mei}
                      onChange={() => handleChange('excluir_mei', !formData.excluir_mei)}
                      className="mr-2"
                    />
                    <label htmlFor="excluir_mei" className="text-white">
                      Excluir MEI
                    </label>
                  </div>

                  <div className="mb-2">
                    <input
                      type="checkbox"
                      id="com_email"
                      name="com_email"
                      checked={formData.com_email}
                      onChange={() => handleChange('com_email', !formData.com_email)}
                      className="mr-2"
                    />
                    <label htmlFor="com_email" className="text-white">
                      Com E-mail
                    </label>
                  </div>

                  <div className="mb-2">
                    <input
                      type="checkbox"
                      id="incluir_atividade_secundaria"
                      name="incluir_atividade_secundaria"
                      checked={formData.incluir_atividade_secundaria}
                      onChange={() => handleChange('incluir_atividade_secundaria', !formData.incluir_atividade_secundaria)}
                      className="mr-2"
                    />
                    <label htmlFor="incluir_atividade_secundaria" className="text-white">
                      Incluir Atividade Secundária
                    </label>
                  </div>

                  <div className="mb-2">
                    <input
                      type="checkbox"
                      id="com_contato_telefonico"
                      name="com_contato_telefonico"
                      checked={formData.com_contato_telefonico}
                      onChange={() => handleChange('com_contato_telefonico', !formData.com_contato_telefonico)}
                      className="mr-2"
                    />
                    <label htmlFor="com_contato_telefonico" className="text-white">
                      Com Contato Telefônico
                    </label>
                  </div>

                  <div className="mb-2">
                    <input
                      type="checkbox"
                      id="somente_fixo"
                      name="somente_fixo"
                      checked={formData.somente_fixo}
                      onChange={() => handleChange('somente_fixo', !formData.somente_fixo)}
                      className="mr-2"
                    />
                    <label htmlFor="somente_fixo" className="text-white">
                      Somente Fixo
                    </label>
                  </div>

                  <div className="mb-2">
                    <input
                      type="checkbox"
                      id="somente_celular"
                      name="somente_celular"
                      checked={formData.somente_celular}
                      onChange={() => handleChange('somente_celular', !formData.somente_celular)}
                      className="mr-2"
                    />
                    <label htmlFor="somente_celular" className="text-white">
                      Somente Celular
                    </label>
                  </div>

                  <div className="mb-2">
                    <input
                      type="checkbox"
                      id="somente_matriz"
                      name="somente_matriz"
                      checked={formData.somente_matriz}
                      onChange={() => handleChange('somente_matriz', !formData.somente_matriz)}
                      className="mr-2"
                    />
                    <label htmlFor="somente_matriz" className="text-white">
                      Somente Matriz
                    </label>
                  </div>

                  <div className="mb-2">
                    <input
                      type="checkbox"
                      id="somente_filial"
                      name="somente_filial"
                      checked={formData.somente_filial}
                      onChange={() => handleChange('somente_filial', !formData.somente_filial)}
                      className="mr-2"
                    />
                    <label htmlFor="somente_filial" className="text-white">
                      Somente Filial
                    </label>
                  </div>

                  <button onClick={prevStep} className="bg-yellow-400 text-blue-500 hover:bg-yellow-300 hover:text-blue-600 px-6 py-3 rounded-full text-lg font-semibold">
                    Anterior
                  </button>
                  <button onClick={submitForm} className="bg-blue-600 text-white hover:bg-blue-400 px-6 py-3 rounded-full text-lg font-semibold">
                    <FontAwesomeIcon icon={faSearch} className='mr-2' />
                    Adicionar Consulta
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={toggleSidebar}
        className="fixed top-0 left-0 p-4 bg-gray-800 text-white"
      >
        Menu
        <FontAwesomeIcon icon={faHamburger} className='ml-2' />
      </button>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </React.Fragment>
  );
}

export default Next;
