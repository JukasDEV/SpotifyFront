import { prisma } from '@/services/database';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Primeiro, atualiza todos os registros para setar ativo como 0
    await prisma.alienigena.updateMany({
      data: {
        ativo: 0,
      },
    });

    // Busca todos os registros para obter os IDs
    const aliens = await prisma.alienigena.findMany();

    if (aliens.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: 'Nenhum alienígena encontrado' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Seleciona um ID aleatório
    const randomIndex = Math.floor(Math.random() * aliens.length);
    const randomAlienId = aliens[randomIndex].id;

    // Atualiza o registro selecionado para setar ativo como 1
    await prisma.alienigena.update({
      where: {
        id: randomAlienId,
      },
      data: {
        ativo: 1,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: 'Alienígena atualizado com sucesso', id: randomAlienId }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erro ao atualizar alienígena:', error);
    return new NextResponse(

        //@ts-ignore
      JSON.stringify({ message: 'Erro ao atualizar alienígena', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
