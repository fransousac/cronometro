import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';


let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [numero, setNumero] = useState(0);          //criamos uma use state para alterar o numero quando o cronometro for iniciado, substituimos na parte de text style timer o {botao}
  const [botao, setBotao] = useState('Iniciar');   //criamos uma usestate para quando clicarmos em iniciar, o nome mudar para parar e substituimos la embaixo em text style iniciar por {botao}
  const [ultimo, setUltimo] = useState(null);      //criamos uma usestate para controlar a parte de onde é mostrado o ultimo tempo no cronometro, para inicialmente ficar vazio


  function iniciar(){                   //O setInterval em JavaScript é uma função que permite executar uma determinada função repetidamente, em intervalos regulares de tempo
    if(timer !== null)   {                //O clearInterval é uma função em JavaScript usada para parar a execução repetitiva de uma função que foi configurada com setInterval.
      //Aqui vai parar o timer
      clearInterval(timer);
      timer = null;                    //Aqui voltamos o timer para nulo, não terá mais nada lá
      
      setBotao('Iniciar')              //O botão sai de 'parar' para 'iniciar'
    }else{
      //Se o timer estiver nulo, começamos a girar ele
      timer = setInterval(()=>{
        ss++;

        if(ss == 60){               //Se os segundos chegarem a 60, zeramos eles e somamos mais 1 minuto, pois 60 segundos = 1 mim
          ss = 0;
          mm++;
        }

        if(mm == 60){             //Se os minutos chegarem a 60, zeramos eles e somamos mais 1 hora, pois 60 minutos = 1 hora
          mm = 0;
          hh++;
        }

        let format =
        (hh < 10 ? '0' + hh : hh) + ':'   //Aqui é uma formatação, por exemplo, se der 3 horas, o cronometro acrescentará um 0 na frente, ficando 03h00 e não apenas o 3. Caso nao seja menor, so mostraremos as horas
        + (mm < 10 ? '0' + mm : mm) + ':' //essa parte ':' é apenas para concatenar os dois pontos que separam as horas, os minutos e os segundos
        + (ss < 10 ? '0' + ss : ss);

        setNumero(format);              //Passamos toda essa formacao para a constante que muda o numero inicial do cronometro, que é a setnumero

      }, 1);
      setBotao('Parar')
    }
  }
  function limpar(){
    if(timer !== null){
      //Parar o timer!
      clearInterval(timer);
      timer = null;
    }
    setUltimo(numero);  //Antes de zerarmos o valor que é a funcao de limpar, passamos o numero que esta dentro do setNumero
    setNumero(0);
    ss = 0;
    mm = 0;
    hh = 0;
    setBotao('Iniciar');
  }

  return (
    <View style={styles.container}>
     
    <Image
    source={require('./src/crono.png')}
    />

    <Text style={styles.timer} >{numero}</Text> 

    <View style={styles.btnArea}>  
      {/* Para podermos estilizar apenas os dois botões(Iniciar e Limpar) criamos uma view e um grupo de estilos(styles.btnArea) */}      
      <TouchableOpacity style={styles.btn} onPress={iniciar}>          
        <Text style={styles.btnTexto}>{botao}</Text> 
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={limpar}>
        <Text style={styles.btnTexto}>Limpar</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.areaUltima}>
    <Text style={styles.textoCorrida}>
      { ultimo ? 'Ultimo tempo: ' + ultimo : ''}     
      {/*  Essa é uma forma de fazer uma condição em js, usando o operador ternario  (? :) ----->  condição ? valorSeVerdadeiro : valorSeFalso
      Função: Verifica se a condição é verdadeira. Se for, retorna o valor após o ?; caso contrário, retorna o valor após o :.
      *Se a condição for verdeira, retornará o valor que estiver dentro da const 'ultimo', se nao for verdadeiro retorna nulo ou vazio('')*/}
    </Text>
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef'
  },
  timer:{
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color:'#FFF'
  },
  btnArea:{
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn:{
    flex: 1,
    justifyContent: 'center',        //Justifycontent alinha no eixo vertical e alignItens alinha na horizontal
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnTexto:{
   fontSize: 20,
   fontWeight: 'bold',
   color: '#00aeef' 
  },
  areaUltima:{
   marginTop: 40, 
  },
  textoCorrida:{
    fontSize: 25,
    color: '#FFF',
    fontStyle: 'italic'
  }
});