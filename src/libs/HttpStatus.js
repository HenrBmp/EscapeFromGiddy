/**
 * Classe utilitária que fornece códigos de status HTTP como constantes estáticas.
 * * Os nomes das constantes estão em português para facilitar a busca,
 * mas as descrições incluem o nome original em inglês e a definição técnica.
 * @namespace
 * @readonly
 */
export default class StatusHttp {
    // --- 1xx: Informativos ---

    /** * 100: Continuar (Continue).
     * O servidor recebeu os cabeçalhos da requisição e o cliente deve prosseguir para enviar o corpo.
     */
    static CONTINUAR = 100;

    /** * 101: Mudando Protocolos (Switching Protocols).
     * O servidor aceita a solicitação do cliente para mudar o protocolo (ex: de HTTP para WebSocket).
     */
    static MUDANDO_PROTOCOLOS = 101;

    /** * 102: Processando (Processing).
     * O servidor recebeu a requisição e está processando-a, mas nenhuma resposta está disponível ainda.
     */
    static PROCESSANDO = 102;

    // --- 2xx: Sucesso ---

    /** * 200: OK (OK).
     * A requisição foi bem-sucedida. O resultado real depende do método HTTP.
     */
    static OK = 200;

    /** * 201: Criado (Created).
     * A requisição foi bem-sucedida e um novo recurso foi criado como resultado.
     */
    static CRIADO = 201;

    /** * 202: Aceito (Accepted).
     * A requisição foi recebida, mas ainda não foi processada (comum em filas assíncronas).
     */
    static ACEITO = 202;

    /** * 204: Sem Conteúdo (No Content).
     * A requisição foi processada com sucesso, mas o servidor não retorna nenhum corpo de resposta.
     */
    static SEM_CONTEUDO = 204;

    /** * 206: Conteúdo Parcial (Partial Content).
     * Usado quando o cliente solicita apenas uma parte do recurso (comum em streaming de vídeo ou downloads pausáveis).
     */
    static CONTEUDO_PARCIAL = 206;

    // --- 3xx: Redirecionamento ---

    /** * 301: Movido Permanentemente (Moved Permanently).
     * O recurso solicitado foi movido para uma nova URL permanentemente.
     */
    static MOVIDO_PERMANENTEMENTE = 301;

    /** * 302: Encontrado (Found).
     * O recurso foi encontrado, mas está temporariamente em outra URL.
     */
    static ENCONTRADO = 302;

    /** * 304: Não Modificado (Not Modified).
     * O recurso não mudou desde a última requisição; o cliente pode usar a versão em cache.
     */
    static NAO_MODIFICADO = 304;

    /** * 307: Redirecionamento Temporário (Temporary Redirect).
     * O servidor envia o cliente para outra URL, mas exige que o método original (ex: POST) seja mantido.
     */
    static REDIRECIONAMENTO_TEMPORARIO = 307;

    /** * 308: Redirecionamento Permanente (Permanent Redirect).
     * Similar ao 301, mas exige que o método HTTP original não seja alterado.
     */
    static REDIRECIONAMENTO_PERMANENTE = 308;

    // --- 4xx: Erros do Cliente ---

    /** * 400: Requisição Inválida (Bad Request).
     * O servidor não pode processar a requisição devido a um erro do cliente (ex: sintaxe JSON inválida).
     */
    static REQUISICAO_INVALIDA = 400;

    /** * 401: Não Autorizado (Unauthorized).
     * O cliente deve se autenticar para obter a resposta solicitada.
     */
    static NAO_AUTORIZADO = 401;

    /** * 403: Proibido (Forbidden).
     * O cliente não tem direitos de acesso ao conteúdo, mesmo estando autenticado.
     */
    static PROIBIDO = 403;

    /** * 404: Não Encontrado (Not Found).
     * O servidor não pode encontrar o recurso solicitado.
     */
    static NAO_ENCONTRADO = 404;

    /** * 405: Método Não Permitido (Method Not Allowed).
     * O método de requisição é conhecido pelo servidor, mas foi desativado para este recurso.
     */
    static METODO_NAO_PERMITIDO = 405;

    /** * 408: Tempo de Requisição Esgotado (Request Timeout).
     * O servidor fechou a conexão porque a requisição demorou muito para ser enviada.
     */
    static TEMPO_DE_REQUISICAO_ESGOTADO = 408;

    /** * 409: Conflito (Conflict).
     * A requisição conflita com o estado atual do servidor (ex: tentativa de criar um usuário que já existe).
     */
    static CONFLITO = 409;

    /** * 410: Recurso Ausente (Gone).
     * O recurso solicitado não está mais disponível e não será retornado.
     */
    static RECURSO_AUSENTE = 410;

    /** * 413: Entidade de Requisição Muito Grande (Payload Too Large).
     * O corpo da requisição é maior do que os limites definidos pelo servidor.
     */
    static ENTIDADE_DE_REQUISICAO_MUITO_GRANDE = 413;

    /** * 415: Tipo de Mídia Não Suportado (Unsupported Media Type).
     * O formato de dados enviado não é suportado pelo servidor (ex: enviar XML onde se espera JSON).
     */
    static TIPO_DE_MIDIA_NAO_SUPORTADO = 415;

    /** * 422: Entidade Improcessável (Unprocessable Entity).
     * A requisição está bem formatada, mas contém erros de validação (comum em APIs de formulários).
     */
    static ENTIDADE_IMPROCESSAVEL = 422;

    /** * 429: Muitas Requisições (Too Many Requests).
     * O usuário enviou muitas requisições num curto período de tempo (limite de taxa/rate limit).
     */
    static MUITAS_REQUISICOES = 429;

    // --- 5xx: Erros do Servidor ---

    /** * 500: Erro Interno do Servidor (Internal Server Error).
     * O servidor encontrou uma situação com a qual não sabe lidar.
     */
    static ERRO_INTERNO_DO_SERVIDOR = 500;

    /** * 501: Não Implementado (Not Implemented).
     * O servidor não suporta a funcionalidade necessária para completar a requisição.
     */
    static NAO_IMPLEMENTADO = 501;

    /** * 502: Falha no Gateway (Bad Gateway).
     * O servidor, agindo como proxy, recebeu uma resposta inválida do servidor de destino.
     */
    static FALHA_NO_GATEWAY = 502;

    /** * 503: Serviço Indisponível (Service Unavailable).
     * O servidor está em manutenção ou sobrecarregado e não pode responder no momento.
     */
    static SERVICO_INDISPONIVEL = 503;

    /** * 504: Tempo Limite do Gateway Esgotado (Gateway Timeout).
     * O servidor proxy não recebeu uma resposta a tempo do servidor de origem.
     */
    static TEMPO_LIMITE_DO_GATEWAY_ESGOTADO = 504;
}
