// module.exports = app;

// const http = require("http");
// const { handleRequest } = require("./routes/router");

// const PORT = Number(process.env.PORT) || 3000;

// http.createServer(handleRequest).listen(PORT, () => {
//   console.log(`Just Do Eat rodando em http://localhost:${PORT}`);

// Condição para rodar o app.listen apenas no seu PC, e não no Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log('Servidor rodando localmente na porta 3000');
    });
}

// Essa exportação é obrigatória para o Vercel entender seu backend
module.exports = app;
});
