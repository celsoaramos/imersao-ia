import React, { useState } from 'react'

import Card from '@/components/Atoms/Card'
import Input from '@/components/Atoms/Input'
import Label from '@/components/Atoms/Label'
import Select from '@/components/Atoms/Select'
import TextArea from '@/components/Atoms/TextArea'
import Button from '../Atoms/Button'
import { useRouter } from "next/router";
import Loader from '../Atoms/Loader'
import { getResponse } from '../../pages/api/GenAI'
import Link from 'next/link'


const IdeiasProjeto = () => {

  const [keyWords, setKeyWords] = useState('');
  const [theme, setTheme] = useState('');
  const [publicTarget, setPublicTarget] = useState('');
  const [typeProject, setTypeProject] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState([]);

  const router = useRouter();

  const fetchData = async () => {

    const prompt = `
      Objetivo: Gerar ideias inovadoras e criativas para um novo projeto.

      Informações:

      - Palavras-chave: ${keyWords}
      - Tema: ${theme}
      - Público-alvo: ${publicTarget}
      - Tipo de Projeto: ${typeProject}
      - Descrição: ${description}

      Requisitos:

      - As ideias devem ser originais e viáveis.
      - Na resposta, inclua pelo menos 3 ideias de projetos diferentes.
      - Considere as tecnologias atuais e tendências do mercado.
      - O projeto deve ser adequado ao público-alvo especificado.
      - Inclua uma breve descrição de cada ideia, destacando suas principais funcionalidades e benefícios.
      - A resposta tem que um array em JSON

      Formato da resposta: Text

      A sua resposta DEVE seguir essa estrutura:
        [
          {
            "ideia": "Nome da ideia",
            "descrição": "Descrição da ideia",
            "funcionalidades": ["Funcionalidade 1", "Funcionalidade 2", "Funcionalidade 3"],
            "benefícios": ["Benefício 1", "Benefício 2", "Benefício 3"]
          },
          {
            "ideia": "Nome da ideia",
            "descrição": "Descrição da ideia",
            "funcionalidades": ["Funcionalidade 1", "Funcionalidade 2", "Funcionalidade 3"],
            "benefícios": ["Benefício 1", "Benefício 2", "Benefício 3"]
          },
          {
            "ideia": "Nome da ideia",
            "descrição": "Descrição da ideia",
            "funcionalidades": ["Funcionalidade 1", "Funcionalidade 2", "Funcionalidade 3"],
            "benefícios": ["Benefício 1", "Benefício 2", "Benefício 3"]
          }
        ]


      Exemplo:

      Palavras-chave: música, aprendizado, gamificação
      Tema: Educação
      Público-alvo: Crianças de 6 a 10 anos
      Tipo de Projeto: Aplicativo móvel
      Descrição: Criar uma forma divertida e interativa para as crianças aprenderem música.

      Resultado esperado:

      Uma lista de ideias de projetos que atendam aos critérios especificados.
    `

    const text = await getResponse(prompt);
    setResultText(JSON.parse(text))
    setLoading(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    fetchData();
  };

  const backIndex = () => {
    router.push('/');
  }

  return (
    <Card backgroundColor='bg-white'>
      <Label
        color='text-gray-700'
        text='Ideias de Projetos Encantadores com Gemini !'
        fontWeight='bolder'
        textSize='two'
      />

      <form className="mt-14">
        <div className='grid grid-cols-4 space-x-4'>
          <div className='flex flex-col justify-start'>
            <Label text='Escreva as palavras-chave aqui' textSize='medium' color='text-gray-500' />
            <Input
              type='text'
              withBackground={false}
              idName='keyWords'
              value={keyWords}
              onChange={(e) => setKeyWords(e.target.value)}
              placeholder='Ex: música, educação, jogos'
              className='mt-1'
            />
          </div>
          <div>
            <Label text='Qual é a vibe do projeto?' textSize='medium' color='text-gray-500' />
            <Select
              idName='theme'
              firstItem='Selecione...'
              valueFirstItem={''}
              withBackground={false}
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              options={[
                { value: 'technology', label: 'Tecnologia' },
                { value: 'health', label: 'Saúde' },
                { value: 'entertainment', label: 'Entretenimento' },
              ]}
            />
          </div>
          <div>
            <Label text='Qual vai ser o público alvo?' textSize='medium' color='text-gray-500' />
            <Select
              idName='publicTarget'
              firstItem='Selecione...'
              valueFirstItem={''}
              withBackground={false}
              value={publicTarget}
              onChange={(e) => setPublicTarget(e.target.value)}
              options={[
                { value: 'Criancas', label: 'Crianças' },
                { value: 'Adolescentes', label: 'Adolescentes' },
                { value: 'Adultos', label: 'Adultos' },
                { value: 'Profissionais', label: 'Profissionais' },
              ]}
            />
          </div>
          <div>
            <Label text='Tipo de projeto' textSize='medium' color='text-gray-500' />
            <Select
              idName='typeProject'
              firstItem='Selecione...'
              valueFirstItem={''}
              withBackground={false}
              value={typeProject}
              onChange={(e) => setTypeProject(e.target.value)}
              options={[
                { value: 'aplicativo', label: 'App' },
                { value: 'Site', label: 'Site' },
                { value: 'Jogo', label: 'Jogo' },
                { value: 'Ferramenta', label: 'Ferramenta' },
              ]}
            />
          </div>
        </div>

        <div className='mt-6'>
          <Label text='Tem uma ideia inicial ?' textSize='medium' color='text-gray-500' />
          <TextArea
            idName='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder=''
            withBackground={false}
          />
        </div>

        <div className='flex flex-row justify-beetween mt-6'>
          <Link
            href='/'
            className='block w-full max-w-xs mx-auto bg-gray-500 hover:bg-gray-700 text-white font-bold px-3 py-3 rounded-lg'
          >
            <Button
              type='cancel'
              label='Voltar'
              onClick={backIndex}
            />
          </Link>
          <Button
            type='ideiaProjeto'
            label='Gerar Ideia'
            onClick={handleSubmit}
          />
        </div>
      </form>

      {loading ? (
        <div className='flex justify-center items-center'>
          <Loader />
          <br />
          <Label
            text='Gerando ideias mirabolantes...'
            textSize='medium'
            color='block text-gray-500'
          />
        </div>
      ) : (

        resultText.length > 0 &&
        <Card backgroundColor='bg-gray-100 mt-14'>
          {resultText.map((item: any, index: number) => (
            <div key={index} className='mt-4'>
              <Label
                text={`Idéia ${index + 1}`}
                textSize='medium'
                fontWeight='bolder'
                color='block text-gray-500'
              />
              <Label
                text={`Nome da idéia: `}
                textSize='medium'
                fontWeight='bolder'
                color='text-gray-500'
              />
              <Label
                text={`${item.ideia}`}
                textSize='medium'
                color='text-gray-500'
              />
              <br />
              <Label
                text={`Descrição: `}
                textSize='medium'
                fontWeight='bolder'
                color='text-gray-500'
              />
              <Label
                text={`${item.descrição}`}
                textSize='medium'
                color='text-gray-500'
              />
              <br />
              <Label
                text={`Funcionalidades: `}
                textSize='medium'
                fontWeight='bolder'
                color='text-gray-500'
              />
              <Label
                text={`${item.funcionalidades.join(', ')}`}
                textSize='medium'
                color='text-gray-500'
              />
              <br />
              <Label
                text={`Benefícios: `}
                textSize='medium'
                fontWeight='bolder'
                color='text-gray-500'
              />
              <Label
                text={`${item.benefícios.join(', ')}`}
                textSize='medium'
                color='text-gray-500'
              />
            </div>
          ))}
        </Card>

      )}

    </Card>
  )
}

export default IdeiasProjeto