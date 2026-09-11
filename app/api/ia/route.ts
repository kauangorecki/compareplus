import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pergunta = searchParams.get("q");

  if (!pergunta) {
    return Response.json(
      { erro: "Informe uma pergunta." },
      { status: 400 }
    );
  }

  try {
    const resposta = await openai.responses.create({
      model: "gpt-5.6-luna",
      input: `Você é a IA do Compare+. Ajude o usuário a entender o produto pesquisado.

Produto pesquisado: ${pergunta}

Responda de forma curta e objetiva em português do Brasil.`,
    });

    return Response.json({
      sucesso: true,
      produto: pergunta,
      resposta: resposta.output_text,
    });
  } catch (erro) {
    console.error("Erro na IA:", erro);

    return Response.json(
      {
        sucesso: false,
        erro: "Não foi possível consultar a IA.",
      },
      { status: 500 }
    );
  }
}