var pool = require('../functions/db');
var fs = require('fs');
var brasil = require('brasil');
var Boleto = brasil.boleto.Boleto;
var Beneficiario = brasil.boleto.Beneficiario;
var Pagador = brasil.boleto.Pagador;
var Endereco = brasil.boleto.Endereco;
var Datas = brasil.boleto.Datas;
var bancos = brasil.boleto.bancos;
var Gerador = brasil.boleto.Gerador;

function BoletoIngressante() {

}

BoletoIngressante.prototype.gerarBoleto = function(cpf, nome, rg, logradouro, cep){
  var pagador = Pagador.novoPagador()
                  .comNome(nome)
                  .comRegistroNacional(rg) //ou .comCpf/.comCnpj
                  .comEndereco(Endereco.novoEndereco()
                                  .comLogradouro(logradouro)
                                  //.comBairro('Liberdade')
                                  //.comCidade('São Paulo')
                                  //.comUf('SP')
                                  .comCep(cep));

  var beneficiario = Beneficiario.novoBeneficiario()
                      .comNome('Instituto de Línguas')
                      .comRegistroNacional('19950366000150') //ou .comCpf/.comCnpj
                      .comCarteira('157')
                      .comAgencia('312')
                      //.comContaCorrente('1178') //ou .comCodigo
                      .comNossoNumero('07967777')
                      .comDigitoNossoNumero('4');

  var boleto = Boleto.novoBoleto()
                  .comDatas(Datas.novasDatas()
                      .comVencimento(25, 12, 2014)
                      .comProcessamento(1, 11, 2014)
                      .comDocumento(1, 11, 2014))
                  .comBeneficiario(beneficiario)
                  .comPagador(pagador)
                  .comBanco(new bancos.Itau())
                  .comValorBoleto(12.00) //Apenas duas casas decimais
                  .comNumeroDoDocumento(2435)
                  .comLocaisDePagamento([
                      'Pagável em qualquer banco ou casa lotérica até o vencimento',
                      'Após o vencimento pagável apenas em agências Itaú'
                  ])
    new Gerador(boleto).gerarPDF(function(err, pdf) {
      if(err) {
          throw err; //Algo deu errado!
      }

      var writeStream = fs.createWriteStream('public/documents/'+cpf+'.pdf');
      pdf.pipe(writeStream);
    });
};

module.exports = BoletoIngressante;
