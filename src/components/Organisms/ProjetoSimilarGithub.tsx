import React, { useState } from 'react'

import Card from '@/components/Atoms/Card'
import Input from '@/components/Atoms/Input'
import Label from '@/components/Atoms/Label'
import Select from '@/components/Atoms/Select'
import TextArea from '@/components/Atoms/TextArea'
import Button from '../Atoms/Button'
import { useRouter } from "next/router";
import { GoogleGenerativeAI } from '@google/generative-ai'
import Loader from '../Atoms/Loader'

interface RevisaoGithubProps {
  Objetivo: string
  Tecnologias: string
  StatusdeDesenvolvimento: string[]
  Contribuicao: string[]
  ProjetosSimilares: string[]
  Resultado: string
}

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const ProjetoSimilarGithub  = () => {

  const [urlGithub, setUrlGithub] = useState('');

  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState<RevisaoGithubProps>();

  const router = useRouter();

  function formatResponse(response: any) {

    const jsonWithoutQuotes = response.slice(3, -3)
    const removeWordJson = jsonWithoutQuotes.slice(6)
    const jsonData = JSON.parse(removeWordJson)

    return jsonData;
  }

  const genAI = new GoogleGenerativeAI(apiKey ?? "");

  const getResponse = async() => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
    const prompt = `
    ## Assistente de Projetos Open Source
  
    **Objetivo:** Analisar um projeto open source no GitHub e fornecer um resumo completo, incluindo informações relevantes para potenciais contribuidores.
    
    **Informações:**
    
    * **URL do Repositório:** ${urlGithub}
    
    **Tarefas:**
    
    1. **Analisar README:** Extraia o objetivo do projeto, principais funcionalidades e instruções de uso. 
    2. **Analisar Código:** Identifique as principais tecnologias e frameworks utilizados no projeto.
    3. **Analisar Issues:** Determine o status de desenvolvimento do projeto (ativo, inativo) e identifique possíveis problemas ou áreas para contribuição.
    4. **Sugerir Projetos Similares:**  Encontre projetos open source similares ou complementares com base na análise do projeto atual.
    
    Formato da resposta: JSON
  
    **Resultado esperado:**
    
    Um resumo do projeto com as seguintes informações:
    
    * **Objetivo:** Uma descrição clara do objetivo e propósito do projeto.
    * **Resultado:** Uma análise breve do código, destacando pontos fortes e áreas para melhoria. 
    * **Tecnologias:** Uma lista das principais tecnologias e frameworks utilizados.
    * **Status de Desenvolvimento:** Indicar se o projeto está ativo, inativo ou em manutenção.
    * **Contribuição:** Sugestões de áreas onde os contribuidores podem ajudar, como corrigir bugs, adicionar funcionalidades ou melhorar a documentação. 
    * **Projetos Similares:** Uma lista de projetos open source relacionados que podem ser de interesse para os usuários com os seus respectivos links.
    
    **Formato da resposta:
    Retorne um JSON sem caracteres especiais como * ou / por exemplo
    {
      "Objetivo": "Objetivos",
      "Resultado": "Resultado da análise"
      "Tecnologias": "Descrição das Tecnologias",
      "StatusdeDesenvolvimento": ["Status 1", "Status 2", "Status 3"],
      "Contribuicao": ["Contribuição 1", "Contribuição 2", "Contribuição 3"],
      "ProjetosSimilares": ["Nome Projeto 1 - link do projeto 1", "Projeto 2 - link do projeto 2", "Projeto 3 - link do projeto 3"]
    }
    **
    `

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  }

  const fetchData = async () => {


    const text = await getResponse();

    if (text.startsWith('```')) {
      console.log("🚀 ~ fetchData ~ text:", text)
      console.log("entrou starts with")
      const textWhithoutJson = text.slice(7, -3)
      console.log("🚀 ~ fetchData ~ textWhithoutJson:", textWhithoutJson)
      setResultText(JSON.parse(textWhithoutJson))
    } else {
      setResultText(JSON.parse(text))
    }
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
        text='Ache projetos similares no GitHub'
        fontWeight='bolder'
        textSize='two'
      />

      <form onSubmit={handleSubmit} className="mt-14">
        <div className='space-x-4'>
          <div className='flex flex-col justify-start'>
            <Label text='URL do GitHub' textSize='medium' color='text-gray-500' />
            <Input
              type='text'
              withBackground={false}
              idName='urlGithub'
              value={urlGithub}
              onChange={(e) => setUrlGithub(e.target.value)}
              placeholder='http://...'
              className='mt-1'
            />
          </div>
        </div>

        <div className='flex flex-row justify-beetween mt-6 mb-6'>
          <Button
            type='cancel'
            label='Voltar'
            onClick={backIndex}
          />
          <Button
            type='projetoSimilarGithub'
            label='Achar Projetos'
          />
        </div>
      </form>

      {loading ? (
        <div className='flex justify-center items-center mt-5'>
          <Loader />
          <br />
          <Label
            text='Analisando...'
            textSize='medium'
            color='block text-gray-500'
          />
        </div>
      ) : (

        resultText &&
        <Card backgroundColor='bg-gray-100'>
            <div className='mt-4'>
              <Label
                text={`Objetivo: `}
                textSize='medium'
                fontWeight='bolder'
                color='text-gray-500'
              />
              <Label
                text={`${resultText.Objetivo}`}
                textSize='medium'
                color='text-gray-500'
              />
              <br/>
              <Label
                text={`Tecnologias: `}
                textSize='medium'
                fontWeight='bolder'
                color='text-gray-500'
              />
              <Label
                text={`${resultText.Tecnologias}`}
                textSize='medium'
                color='text-gray-500'
              />
              <br/>
              <Label
                text={`Status de Desenvolvimento: `}
                textSize='medium'
                fontWeight='bolder'
                color='text-gray-500'
              />
              <Label
                text={`${resultText.StatusdeDesenvolvimento}`}
                textSize='medium'
                color='text-gray-500'
              />
              <br/>
              <Label
                text={`Contribuição: `}
                textSize='medium'
                fontWeight='bolder'
                color='text-gray-500'
              />
              <Label
                text={`${resultText.Contribuicao}`}
                textSize='medium'
                color='text-gray-500'
              />
              <br/>
              <Label
                text={`Projetos Similares: `}
                textSize='medium'
                fontWeight='bolder'
                color='text-gray-500'
              />
              <Label
                text={`${resultText.ProjetosSimilares}`}
                textSize='medium'
                color='text-gray-500'
              />
            </div>
        </Card>

      )}

    </Card>
  )
}

export default ProjetoSimilarGithub 