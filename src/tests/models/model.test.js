const { expect } = require("chai");
const sinon = require("sinon");
const { connection } = require("../../models/mysql-connection");
const UserModel = require("../../models/data.user");

describe("Users Model", () => {


  describe("Testando função getAllModel Se é EXECUTADA", () => {
   
    const returnDBGetAllModel = [[]];
   
    before(() => {
      sinon.stub(connection, "execute").resolves(returnDBGetAllModel);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Testar se a função getAllModel é executada', async () => {
      await UserModel.getAllModel();
      sinon.assert.called(connection.execute);
    });
  });


  describe("Testando função getAllModel Qdo NAO ENCONTRAR registros no DB", () => {
   
    const returnDBGetAllModel = [[]];
   
    before(() => {
      sinon.stub(connection, "execute").resolves(returnDBGetAllModel);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Testar se a função getAllModel é executada', async () => {
      await UserModel.getAllModel();
      sinon.assert.called(connection.execute);
    });

    it("Qdo NAO houver resgistros cadastrados no Data Base", async () => {
      const rowsTable = await UserModel.getAllModel();
      expect(rowsTable).to.be.an("array");
    });

    it("Retorna um Array vazio", async () => {
      const rowsTable = await UserModel.getAllModel();
      expect(rowsTable).to.be.empty;
    });

  });

  describe("Testando funcao getAllModel Qdo ENCONTRAR registros no DB ", () => {
    const returnDBGetAllModel = [
      {
        iduser: 75,
        login: "LUCENILZA",
        senha: "XÃBLÂUDA",
        usuario: "LUCENILZA TORRES DOS SANTOS",
        banco_dados: "localhost/db_estudos",
        url: "",
        celular_principal: "",
        CPF: "64201562387",
        email_principal: "",
        perfil: "ADMIN",
      },
    ];

    before(() => {
      sinon.stub(connection, "execute").resolves(returnDBGetAllModel);
    });

    after(() => {
      connection.execute.restore();
    });

    it("Qdo HOUVER registro na Base de Dados Users ", async () => {
      const rowsTable = await UserModel.getAllModel();
      expect([{ iduser: 75 }]).to.deep.include({ iduser: 75 });
    });

    it("Qdo HOUVER registro na Base de Dados Users ", async () => {
      const rowsTable = await UserModel.getAllModel();
      expect([{ iduser: 75 }]).to.deep.include({ iduser: 75 });
    });
  });
});
