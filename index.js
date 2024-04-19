const { OpenAIClient, AzureKeyCredential } = require ('@azure/openai');
const readline = require('readline');
require('dotenv/config');

const client = new OpenAIClient(
  process.env.GPT_ENDPOINT,
  new AzureKeyCredential(process.env.GPT_KEY)); // Cria o cliente da API do OpenAI com a chave de autenticação.

console.log("Bem vindo ao Chat");
console.log("Digite 'sair' a qualquer momento para encerrar o chat");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}); // Linha responsável por criar a interface de interação com a biblioteca readline

const getMessagefromAPI = async (message) => {
  try {
    const response = await client.getCompletions(
      process.env.GPT_MODEL,
      message,
      {
        temperature :0,
        maxTokens:50,
      },
    );
    return response.choices[0].text.trim();
  }
  catch(error){
   console.error(error);
   return 'Desculpe, um erro ocorreu';
  }
} // Método responsável por  enviar uma mensagem para a API do GPT e retornar uma resposta ao usuário.

rl.on('line', async (input) => {
  if (input.toLowerCase() === 'sair') {
    rl.close();
  } else {
    const answer = await getMessagefromAPI(input);
    console.log(`Resposta: ${answer}`);
  }
}); // Método responsável por ouvir as inputs do usuário e caso o usuário queira encerrar, encerrar o chat. Caso contrário chamar o método getMessageFromAPI

rl.on('close', () => {
  console.log('Obrigado por usar o Chat!');
  process.exit(0);
}); // Método que fecha a interface no terminal com uma mensagem final.