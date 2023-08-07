var total_portabilidade;
var posicoes = [];
var terminais = [];

const prefixAmp = 463547;
const prefixFb = [
  462601, 462520, 463035, 463055, 463057, 463523, 463524, 463527, 463905,
  463211, 463022, 463341, 463520, 463060, 463901, 463197,
];
const prefixMle = [462808, 463525, 463529];
const prefixRlz = 463543;
const prefixCapa = 463552;
const prefixVto = 463227;
const prefixPb = [
  462101, 463021, 463025, 463027, 463122, 463199, 463220, 463223, 463224,
  463225, 463235, 463312, 463313, 463321, 464101, 463040,
];
const prefixPla = [462555, 463555];
const prefixDvz = [463010, 463536, 463581];
const prefixCvv = [463232, 463233, 463255];
const prefixSnx = [
  493344, 493837, 493388, 493060, 493341, 493387, 493655, 493389, 493362,
];
const prefixMuh = [463243, 463253, 463264, 463267];
const prefixPgo = [
  423026, 423027, 423028, 423029, 423086, 423087, 423088, 423089, 423227,
  423236, 423224, 423226, 423228, 423238, 423225, 423323, 423229, 423243,
  423223, 423122, 423222, 423239, 423235, 423025, 423905,
];
const prefixCsc = [
  453039, 453038, 453037, 453036, 453035, 453096, 453097, 453098, 453099,
  453226, 453306, 453326, 453220, 453040, 453323, 453222, 453223,
];
const prefixLjs = 423635;
const prefixCdq = [423638, 423662, 423682];
const prefixPho = [423686, 423677, 423665, 423665, 423664];

function escolher() {
  this.total_portabilidade = document.getElementById("total").value;

  if (total_portabilidade != 0) {
    // window.location.href="./page_tn.html"

    var inputs = "";

    for (let i = 0; i < total_portabilidade; i++) {
      inputs +=
        "<div class='imenda-input' id='input-" +
        i +
        "'>" +
        "<input placeholder='Insira o Terminal' autocomplete='off' type='text' class='input-tn' id='terminal-" +
        i +
        "'><input class='excluir' type='image' src='img/trash-bin.svg' onClick='excluir(" +
        i +
        ")'></div>";
    }

    var html =
      "<div class='centro'> <div class='imenda'>" +
      inputs +
      "</div></div><div class='botoes-div'>" +
      "<input onclick='novo()' type='image' class='botao-telefone' src='img/telephone.svg' width='45' height='45'>" +
      "<input onclick='gerarCSV()' type='image' class='botao-csv' src='img/csv.svg' width='45' height='45'></div>";

    //$("#imenda").append(html)

    $(".template").html(html);

    pupolarPosicoes();
  } else {
    alert("Insira a quantidade de numeros a portar");
  }
}

function novo() {
  window.location.href = "./index.html";
}

function excluir(id) {
  $("#input-" + id).hide(400);

  setTimeout(function () {
    $("#input-" + id).remove();
  }, 800);

  this.total_portabilidade--;

  remover = this.posicoes.splice(id, 1);

  console.log(this.posicoes);

  /*for (let i = 0; i < total_portabilidade; i++) {

        if (this.posicoes[i] == id) {
            for (let j = i; j < total_portabilidade; j++) {
                this.posicoes[j] = this.posicoes[j + 1]

            }

        }

    }*/
}

function pupolarPosicoes() {
  for (let j = 0; j < total_portabilidade; j++) {
    this.posicoes[j] = j;
  }
}

function gerarCSV() {
  if (validar()) {
    for (let i = 0; i < total_portabilidade; i++) {
      this.terminais[i] = document.getElementById(
        "terminal-" + this.posicoes[i]
      ).value;
    }

    var plano_de_discagem = gerarPlanoDeDiscagem();
    var rota = gerarRota();
    var rec_de_num = gerarRecNum();

    downloadCSV(rota, rec_de_num, plano_de_discagem);

    this.terminais = [];
  } else {
    alert("Há campos com terminais sem preencher ou errados !");
  }
}

function validar() {
  var valido = true;

  for (let i = 0; i < total_portabilidade; i++) {
    let verificar = document.getElementById(
      "terminal-" + this.posicoes[i]
    ).value;

    if (verificar.length != 10) {
      valido = false;
      $("#input-" + this.posicoes[i]).addClass("erro");
    } else {
      $("#input-" + this.posicoes[i]).removeClass("erro");
    }
  }

  return valido;
}

function gerarPlanoDeDiscagem() {
  var csvPlanoDeDisc = "";

  this.terminais.forEach(function (terminal) {
    csvPlanoDeDisc += "^9090" + terminal + "$";
    csvPlanoDeDisc += ";" + "4";
    csvPlanoDeDisc += ";;" + "10";
    csvPlanoDeDisc += ";" + "A cobrar CLIENTE" + ";";
    csvPlanoDeDisc += "\n";
    csvPlanoDeDisc += "^0(14|21|31|41|43|15|25|99)" + terminal + "$";
    csvPlanoDeDisc += ";" + "3";
    csvPlanoDeDisc += ";;" + "10";
    csvPlanoDeDisc += ";" + "LDN CLIENTE" + ";";
    csvPlanoDeDisc += "\n";
  });

  return csvPlanoDeDisc;
}

function gerarRota() {
  var csvRota = "";

  this.terminais.forEach((terminal) => {
    let i_tn = "^" + terminal + "$";

    if (terminal.substring(0, 6) == prefixAmp) {
      csvRota += "2";
      csvRota += ";" + "sbcproc01";
      csvRota += ";" + "AEE";
      csvRota += ";" + "41030";
      csvRota += ";" + i_tn;
      csvRota += ";;" + "normal";
      csvRota += ";;;" + "50";
      csvRota += ";" + "Rota  CLIENTE" + ";";
      csvRota += "\n";
    }

    prefixFb.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRota += "2";
        csvRota += ";" + "sbcproc01";
        csvRota += ";" + "FNB";
        csvRota += ";" + "41235";
        csvRota += ";" + i_tn;
        csvRota += ";;" + "normal";
        csvRota += ";;;" + "50";
        csvRota += ";" + "Rota  CLIENTE" + ";";
        csvRota += "\n";
      }
    });

    prefixMle.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRota += "2";
        csvRota += ";" + "sbcproc01";
        csvRota += ";" + "MLE";
        csvRota += ";" + "41393";
        csvRota += ";" + i_tn;
        csvRota += ";;" + "normal";
        csvRota += ";;;" + "50";
        csvRota += ";" + "Rota  CLIENTE" + ";";
        csvRota += "\n";
      }
    });

    if (terminal.substring(0, 6) == prefixRlz) {
      csvRota += "2";
      csvRota += ";" + "sbcproc01";
      csvRota += ";" + "RLZ";
      csvRota += ";" + "41536";
      csvRota += ";" + i_tn;
      csvRota += ";;" + "normal";
      csvRota += ";;;" + "50";
      csvRota += ";" + "Rota  CLIENTE" + ";";
      csvRota += "\n";
    }

    if (terminal.substring(0, 6) == prefixCapa) {
      csvRota += "2";
      csvRota += ";" + "sbcproc01";
      csvRota += ";" + "CNM";
      csvRota += ";" + "41128";
      csvRota += ";" + i_tn;
      csvRota += ";;" + "normal";
      csvRota += ";;;" + "50";
      csvRota += ";" + "Rota  CLIENTE" + ";";
      csvRota += "\n";
    }

    prefixPb.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRota += "2";
        csvRota += ";" + "sbcproc01";
        csvRota += ";" + "PBC";
        csvRota += ";" + "41469";
        csvRota += ";" + i_tn;
        csvRota += ";;" + "normal";
        csvRota += ";;;" + "50";
        csvRota += ";" + "Rota  CLIENTE" + ";";
        csvRota += "\n";
      }
    });

    prefixPla.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRota += "2";
        csvRota += ";" + "sbcproc01";
        csvRota += ";" + "PNT";
        csvRota += ";" + "41499";
        csvRota += ";" + i_tn;
        csvRota += ";;" + "normal";
        csvRota += ";;;" + "50";
        csvRota += ";" + "Rota  CLIENTE" + ";";
        csvRota += "\n";
      }
    });

    prefixDvz.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRota += "2";
        csvRota += ";" + "sbcproc01";
        csvRota += ";" + "DVZ";
        csvRota += ";" + "41192";
        csvRota += ";" + i_tn;
        csvRota += ";;" + "normal";
        csvRota += ";;;" + "50";
        csvRota += ";" + "Rota  CLIENTE" + ";";
        csvRota += "\n";
      }
    });

    prefixCvv.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRota += "2";
        csvRota += ";" + "sbcproc01";
        csvRota += ";" + "CVV";
        csvRota += ";" + "41145";
        csvRota += ";" + i_tn;
        csvRota += ";;" + "normal";
        csvRota += ";;;" + "50";
        csvRota += ";" + "Rota  CLIENTE" + ";";
        csvRota += "\n";
      }
    });

    prefixSnx.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRota += "2";
        csvRota += ";" + "sbcproc01";
        csvRota += ";" + "SNX";
        csvRota += ";" + "47175";
        csvRota += ";" + i_tn;
        csvRota += ";;" + "normal";
        csvRota += ";;;" + "50";
        csvRota += ";" + "Rota  CLIENTE" + ";";
        csvRota += "\n";
      }
    });

    prefixMuh.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRota += "2";
        csvRota += ";" + "sbcproc01";
        csvRota += ";" + "MUH";
        csvRota += ";" + "41373";
        csvRota += ";" + i_tn;
        csvRota += ";;" + "normal";
        csvRota += ";;;" + "50";
        csvRota += ";" + "Rota  CLIENTE" + ";";
        csvRota += "\n";
      }
    });

    prefixPgo.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRota += "2";
        csvRota += ";" + "sbcproc01";
        csvRota += ";" + "PGO";
        csvRota += ";" + "41502";
        csvRota += ";" + i_tn;
        csvRota += ";;" + "normal";
        csvRota += ";;;" + "50";
        csvRota += ";" + "Rota  CLIENTE" + ";";
        csvRota += "\n";
      }
    });

    prefixCsc.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRota += "2";
        csvRota += ";" + "sbcproc01";
        csvRota += ";" + "CSC";
        csvRota += ";" + "41135";
        csvRota += ";" + i_tn;
        csvRota += ";;" + "normal";
        csvRota += ";;;" + "50";
        csvRota += ";" + "Rota  CLIENTE" + ";";
        csvRota += "\n";
      }
    });

    prefixCdq.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRota += "2";
        csvRota += ";" + "sbcproc01";
        csvRota += ";" + "CDQ";
        csvRota += ";" + "41124";
        csvRota += ";" + i_tn;
        csvRota += ";;" + "normal";
        csvRota += ";;;" + "50";
        csvRota += ";" + "Rota  CLIENTE" + ";";
        csvRota += "\n";
      }
    });

    if (terminal.substring(0, 6) == prefixVto) {
      csvRota += "2";
      csvRota += ";" + "sbcproc01";
      csvRota += ";" + "VTO";
      csvRota += ";" + "41746";
      csvRota += ";" + i_tn;
      csvRota += ";;" + "normal";
      csvRota += ";;;" + "50";
      csvRota += ";" + "Rota  CLIENTE" + ";";
      csvRota += "\n";
    }

    if (terminal.substring(0, 6) == prefixLjs) {
      csvRota += "2";
      csvRota += ";" + "sbcproc01";
      csvRota += ";" + "LJS";
      csvRota += ";" + "41351";
      csvRota += ";" + i_tn;
      csvRota += ";;" + "normal";
      csvRota += ";;;" + "50";
      csvRota += ";" + "Rota  CLIENTE" + ";";
      csvRota += "\n";
    }

    prefixPho.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRota += "2";
        csvRota += ";" + "sbcproc01";
        csvRota += ";" + "PHO";
        csvRota += ";" + "41491";
        csvRota += ";" + i_tn;
        csvRota += ";;" + "normal";
        csvRota += ";;;" + "50";
        csvRota += ";" + "Rota  CLIENTE" + ";";
        csvRota += "\n";
      }
    });
  });

  return csvRota;
}

function gerarRecNum() {
  var csvRecNum = "";

  this.terminais.forEach((terminal) => {
    csvRecNum += "^" + terminal + "$";

    if (terminal.substring(0, 6) == prefixAmp) {
      csvRecNum += ";" + "Ampere";
      csvRecNum += ";" + "465";
      csvRecNum += ";" + "41030";
      csvRecNum += ";" + "AEE";
      csvRecNum += ";" + "55216";
      csvRecNum += ";" + "190" + ";";
      csvRecNum += "\n";
    }

    prefixFb.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRecNum += ";" + "Francisco Beltrao";
        csvRecNum += ";" + "465";
        csvRecNum += ";" + "41235";
        csvRecNum += ";" + "FNB";
        csvRecNum += ";" + "55216";
        csvRecNum += ";" + "190" + ";";
        csvRecNum += "\n";
      }
    });

    prefixMle.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRecNum += ";" + "Marmeleiro";
        csvRecNum += ";" + "465";
        csvRecNum += ";" + "41393";
        csvRecNum += ";" + "MLE";
        csvRecNum += ";" + "55216";
        csvRecNum += ";" + "190" + ";";
        csvRecNum += "\n";
      }
    });

    if (terminal.substring(0, 6) == prefixRlz) {
      csvRecNum += ";" + "Realeza";
      csvRecNum += ";" + "465";
      csvRecNum += ";" + "41536";
      csvRecNum += ";" + "RLZ";
      csvRecNum += ";" + "55216";
      csvRecNum += ";" + "190" + ";";
      csvRecNum += "\n";
    }

    if (terminal.substring(0, 6) == prefixCapa) {
      csvRecNum += ";" + "Capanema";
      csvRecNum += ";" + "465";
      csvRecNum += ";" + "41128";
      csvRecNum += ";" + "CNM";
      csvRecNum += ";" + "55216";
      csvRecNum += ";" + "190" + ";";
      csvRecNum += "\n";
    }

    prefixPb.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRecNum += ";" + "Pato Branco";
        csvRecNum += ";" + "465";
        csvRecNum += ";" + "41469";
        csvRecNum += ";" + "PBC";
        csvRecNum += ";" + "55216";
        csvRecNum += ";" + "190" + ";";
        csvRecNum += "\n";
      }
    });

    prefixPla.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRecNum += ";" + "Planalto";
        csvRecNum += ";" + "465";
        csvRecNum += ";" + "41499";
        csvRecNum += ";" + "PNT";
        csvRecNum += ";" + "55216";
        csvRecNum += ";" + "190" + ";";
        csvRecNum += "\n";
      }
    });

    prefixDvz.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRecNum += ";" + "Dois Vizinhos";
        csvRecNum += ";" + "465";
        csvRecNum += ";" + "41192";
        csvRecNum += ";" + "DVZ";
        csvRecNum += ";" + "55216";
        csvRecNum += ";" + "190" + ";";
        csvRecNum += "\n";
      }
    });

    prefixCvv.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRecNum += ";" + "Coronel Vivida";
        csvRecNum += ";" + "465";
        csvRecNum += ";" + "41145";
        csvRecNum += ";" + "CVV";
        csvRecNum += ";" + "55216";
        csvRecNum += ";" + "190" + ";";
        csvRecNum += "\n";
      }
    });

    prefixSnx.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRecNum += ";" + "Sao Lourenco do Oeste";
        csvRecNum += ";" + "497";
        csvRecNum += ";" + "47175";
        csvRecNum += ";" + "SNX";
        csvRecNum += ";" + "55216";
        csvRecNum += ";" + "C48" + ";";
        csvRecNum += "\n";
      }
    });

    prefixMuh.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRecNum += ";" + "Mangueirinha";
        csvRecNum += ";" + "462";
        csvRecNum += ";" + "41373";
        csvRecNum += ";" + "MUH";
        csvRecNum += ";" + "55216";
        csvRecNum += ";" + "190" + ";";
        csvRecNum += "\n";
      }
    });

    prefixPgo.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRecNum += ";" + "Ponta Grossa";
        csvRecNum += ";" + "422";
        csvRecNum += ";" + "41502";
        csvRecNum += ";" + "PGO";
        csvRecNum += ";" + "55216";
        csvRecNum += ";" + "190" + ";";
        csvRecNum += "\n";
      }
    });

    prefixCsc.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRecNum += ";" + "Cascavel";
        csvRecNum += ";" + "452";
        csvRecNum += ";" + "41135";
        csvRecNum += ";" + "CSC";
        csvRecNum += ";" + "55216";
        csvRecNum += ";" + "190" + ";";
        csvRecNum += "\n";
      }
    });

    prefixCdq.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRecNum += ";" + "Candoi";
        csvRecNum += ";" + "427";
        csvRecNum += ";" + "41124";
        csvRecNum += ";" + "CDQ";
        csvRecNum += ";" + "55216";
        csvRecNum += ";" + "190" + ";";
        csvRecNum += "\n";
      }
    });

    prefixPho.forEach((fix) => {
      if (terminal.substring(0, 6) == fix) {
        csvRecNum += ";" + "Pinhao";
        csvRecNum += ";" + "427";
        csvRecNum += ";" + "41491";
        csvRecNum += ";" + "PHO";
        csvRecNum += ";" + "55216";
        csvRecNum += ";" + "190" + ";";
        csvRecNum += "\n";
      }
    });

    if (terminal.substring(0, 6) == prefixVto) {
      csvRecNum += ";" + "Vitorino";
      csvRecNum += ";" + "462";
      csvRecNum += ";" + "41746";
      csvRecNum += ";" + "VTO";
      csvRecNum += ";" + "55216";
      csvRecNum += ";" + "190" + ";";
      csvRecNum += "\n";
    }

    if (terminal.substring(0, 6) == prefixLjs) {
      csvRecNum += ";" + "Laranjeiras o Sul";
      csvRecNum += ";" + "427";
      csvRecNum += ";" + "41351";
      csvRecNum += ";" + "LJS";
      csvRecNum += ";" + "55216";
      csvRecNum += ";" + "190" + ";";
      csvRecNum += "\n";
    }
  });

  return csvRecNum;
}

function downloadCSV(rota, recNum, plano) {
  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(rota);
  hiddenElement.target = "_blank";
  hiddenElement.download = "rota.csv";
  hiddenElement.click();

  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(recNum);
  hiddenElement.target = "_blank";
  hiddenElement.download = "rec_num.csv";
  hiddenElement.click();

  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(plano);
  hiddenElement.target = "_blank";
  hiddenElement.download = "plano.csv";
  hiddenElement.click();
}
