import { Oferta } from './shared/oferta.model'

export class OfertasService {

    public ofertas: Oferta[] = [
        {
            id: 1,
            categoria: "Artigo",
            titulo: "Macronutrientes",
            descricao_oferta: "Entende a demanda de macronutrientes",
            anunciante: "NutriWeb",
            destaque: true,
            imagens: [
                {url: "/assets/ofertas/1/img1.jpg"}
            ],
            link: "http://www.nutriweb.org.br/n0202/recomend.htm"
        },
        {
            id: 2,
            categoria: "Portal",
            titulo: "Como emagrecer",
            descricao_oferta: "Entenda como funciona o emagrecimento",
            anunciante: "MD.Saúde",
            destaque: true,
            imagens: [
                {url: "/assets/ofertas/2/img1.jpg"}
            ],
            link: "https://www.feitodeiridium.com.br/como-calcular-sua-necessidade-de-macro-e-micronutrientes/"
        },
        {
            id: 4,
            categoria: "Noticia",
            titulo: "Manutenção",
            descricao_oferta: "Emagrecer sem perder massa muscular",
            anunciante: "Estância das águas",
            destaque: true,
            imagens: [
                {url: "/assets/ofertas/3/img1.jpg"}
            ],
            link: "https://www.natue.com.br/natuelife/saiba-como-emagrecer-sem-perder-massa-muscular.html"
        }
    ]
    
    public getOfertas(): Array<Oferta> {
        return this.ofertas
    }

    public getOfertas2(): Promise<Oferta[]> {
        return new Promise((resolve, reject) => {
            //algum tipo de processamento, que ao finalizar, chama a função resolve ou a função reject
            //console.log('será que passou por aqui?')
            let deu_certo = true
            
            if(deu_certo) {
                setTimeout(() => resolve( this.ofertas ), 500)
                
            } else {
                reject({ codigo_erro: 404, mensagem_erro: 'Servidor não encontrado XYZ' })
            }
        })
        .then(( ofertas: Oferta[]) => {
            //fazer alguma tratativa
            console.log('primeiro then')
            return ofertas
        })
        .then(( ofertas: Oferta[]) => {
            //fazer uma outra tratativa
            console.log('segundo then')
            return new Promise((resolve2, reject2) => {
                setTimeout(() => { resolve2( ofertas ) },500)
            })
        })
        .then(( ofertas: Oferta[] ) => {
            console.log('terceiro then executado após 3 segundos porque estava aguardando uma promisse ser resolvida')
            return ofertas
        })
    }
}