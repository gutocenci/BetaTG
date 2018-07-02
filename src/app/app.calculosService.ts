export class CalculosService {

    public TMB(sexo:string, idade:number, altura:number, peso:number):number{
        let tmb:number;
        if(sexo==="feminino"){
            tmb = 655 + (9.6 * peso) + (1.8 * altura) - (4.7 * idade)
        }else{
            tmb = 66 + (13.7 * peso) + (5 * altura) - (6.8 * idade)
        }
        return parseFloat(tmb.toFixed(2));
    }

    public NDC(tmb:number, fa:number):number{
        let ndc:number;
        ndc = tmb *  fa
        return parseFloat(ndc.toFixed(2));
    }

    public qtdCaloriasObj(ndc:number){
        let ganhar = ndc + 500;
        let perder = ndc - 500;
        let calorias = {
            perder: parseFloat(perder.toFixed(2)),
            ganhar: parseFloat(ganhar.toFixed(2))
        };
        return calorias;
    }

    public IMC(peso:number, altura:number, sexo:string){
        let imc = peso / altura * altura;
        let desc;
        let img;
        let risco
        if(sexo=="masculino"){
            if(imc <= 18.4){
                desc = "Abaixo do peso"
                img = "/assets/ofertas/4/img5.jpg",
                risco = "Isso pode ser apenas uma característica pessoal, mas pode, também, ser sinal de desnutrição."
            }if(imc >= 18.5 && imc <= 24.9){
                desc = "Acima do peso"
                img = "/assets/ofertas/4/img4.jpg"
                risco = "Parabéns, você está com peso normal, mas é importante que você mantenha hábitos saudáveis de vida para que continue assim."
            }if(imc >= 30 && imc <= 34.9){
                desc = "Obesidade Grau I"
                img = "/assets/ofertas/4/img3.jpg"
                risco = "Sinal de alerta! Chegou na hora de se cuidar, mesmo que seus exames sejam normais. Vamos dar início a mudanças hoje! Cuide de sua alimentação. Você precisa iniciar um acompanhamento com nutricionista e/ou endocrinologista"
            }if(imc >= 35 && imc <= 40){
                desc = "Obesidade Grau II"
                img = "/assets/ofertas/4/img2.jpg"
                risco = "Sinal vermelho! Nessas faixas de IMC o risco de doenças associadas está entre grave e muito grave. Não perca tempo! Busque ajuda profissional já!"
            }else{
                desc= " Obesidade Grau IIl"
                img = "/assets/ofertas/4/img1.jpg"
                risco = "Sinal vermelho! Nessas faixas de IMC o risco de doenças associadas está entre grave e muito grave. Não perca tempo! Busque ajuda profissional já!"
            }
    }else{
            if(imc <= 19.0){
                desc = "Abaixo do peso"
                img = "/assets/ofertas/5/img5.jpg",
                risco = "Isso pode ser apenas uma característica pessoal, mas pode, também, ser sinal de desnutrição."
            }if(imc >= 19.1 && imc <= 24.0){
                desc = "Acima do peso"
                img = "/assets/ofertas/5/img3.jpg"
                risco = "Parabéns, você está com peso normal, mas é importante que você mantenha hábitos saudáveis de vida para que continue assim."
            }if(imc >= 24.1 && imc <= 29.0){
                desc = "Obesidade Grau I"
                img = "/assets/ofertas/5/img4.jpg"
                risco = "Sinal de alerta! Chegou na hora de se cuidar, mesmo que seus exames sejam normais. Vamos dar início a mudanças hoje! Cuide de sua alimentação. Você precisa iniciar um acompanhamento com nutricionista e/ou endocrinologista"
            }if(imc >= 19.1 && imc <= 38.9){
                desc = "Obesidade Grau II"
                img = "/assets/ofertas/5/img5.jpg"
                risco = "Sinal vermelho! Nessas faixas de IMC o risco de doenças associadas está entre grave e muito grave. Não perca tempo! Busque ajuda profissional já!"
            }else{
                desc= " Obesidade Grau IIl"
                img = "/assets/ofertas/5/img1.jpg"
                risco = "Sinal vermelho! Nessas faixas de IMC o risco de doenças associadas está entre grave e muito grave. Não perca tempo! Busque ajuda profissional já!"
            }
    }

        let valImc = {
            imc : parseFloat(imc.toFixed(2)),
            desc : desc,
            img : img,
            risco : risco
        }
        return valImc
    }

    public demandaProteina(NDC){
        let proteinaMin = NDC * 0.10;
        let proteinaMax = NDC * 0.15;
        proteinaMax = parseFloat(proteinaMax.toFixed(2));
        proteinaMin = parseFloat(proteinaMin.toFixed(2));
        let proteinas = {
            proteinaMin :  parseFloat((proteinaMin / 4).toFixed(2)),
            proteinaMedia :  parseFloat((((proteinaMax + proteinaMin) / 2) / 4).toFixed(2)),
            proteinaMax :  parseFloat((proteinaMax / 4).toFixed(2)),
            demProteina:  parseFloat((((proteinaMin+proteinaMax)/2)).toFixed(2))
        };
        return proteinas
    }

    public demandaCarboidrato(NDC){
        let carboMin = NDC * 0.55;
        let carboMax = NDC * 0.75;
        carboMax = parseFloat(carboMax.toFixed(2));
        carboMin = parseFloat(carboMin.toFixed(2));
        let carboidratos = {
            carboMin : parseFloat((carboMin/4).toFixed(2)),
            carboidratoMedia : parseFloat((((carboMin + carboMax)/2) / 4).toFixed(2)),
            carboMax : parseFloat((carboMax / 4).toFixed(2)),
            demCarboidrato: parseFloat(((carboMax+carboMin)/2).toFixed(2))
        };
        return carboidratos;
    }

    public demandaGordura(NDC){
        let gorMin = NDC * 0.15;
        let gorMax = NDC * 0.30;
        gorMax = parseFloat(gorMax.toFixed(2));
        gorMin = parseFloat(gorMin.toFixed(2));
        let gorduras = {
            gorMin :  parseFloat((gorMin / 9).toFixed(2)),
            gorduraMedia :  parseFloat((((gorMin + gorMax)/2) / 9).toFixed(2)),
            gorMax :  parseFloat((gorMax / 9).toFixed(2)),
            demGordura:  parseFloat((((gorMin+gorMax)/2)).toFixed(2))
        };
        return gorduras;
    }
}