import React from 'react'
import Card from '@/components/Atoms/Card'
import Label from '@/components/Atoms/Label'
import Link from 'next/link'

export default function Index() {
  return (

    <div className="grid grid-cols-3 w-full">
      <Link
        href={"/ideias-para-projeto"}
        className='cursor-pointer'
      >
        <div className="flex justify-center item-center">
          <Card
            key={1}
            backgroundColor='bg-[#faba26]'
            className='h-[50vh] w-[90%] flex justify-center items-center'
          >
            <Label
              text='Gerador de Idéias para Projeto'
              className='cursor-pointer text-2xl text-center'
              color='text-white'
              fontWeight='bolder'
            />
          </Card>
        </div>
      </Link>

      <Link
        href={"/duvidas-python"}
        className='cursor-pointer'
      >
        <div className="flex justify-center ">
          <Card
            backgroundColor='bg-[#f33100]'
            className='h-[50vh] w-[90%] flex justify-center items-center'
          >
            <Label
              text='Tire suas dúvidas de python'
              className='cursor-pointer text-2xl text-center'
              color='text-white'
              fontWeight='bolder'
            />
          </Card>
        </div>
      </Link>

      <Link
        href={"/projeto-similar-github"}
        className='cursor-pointer'
      >
        <div className="flex justify-center ">
          <Card
            backgroundColor='bg-[#f47556]'
            className='h-[50vh] w-[90%] flex justify-center items-center'
          >
            <Label
              text='Ache projetos similares no Github'
              className='cursor-pointer text-2xl text-center'
              color='text-white'
              fontWeight='bolder'
            />
          </Card>
        </div>
      </Link>
    </div>

  )
}
