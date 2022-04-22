import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RiEmotionHappyFill } from "react-icons/ri";
import { MdKeyboardBackspace } from "react-icons/md";

function PerguntaScreen() {
  const [pergunta, setPergunta] = useState([]);
  const [respostas, setRespostas] = useState([]);
  const [text, setText] = useState("");
  const params = useParams();
  const history = useNavigate();

  useEffect(() => {
    //Pegando pergunta
    axios.post("/perguntas/getOneQuestion", { id: params.id }).then((res) => {
      setPergunta(res.data[0]);
    });
    //Pegando respostas
    axios
      .post("/respostas/getRespostas", { id: params.id })
      .then((res) => {
        setRespostas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function sendRes() {
    if (!text === "") {
      let info = {
        pergunta_id: params.id,
        resposta: text,
      };
      axios.post("/respostas/saveRes", info).then((res) => {
        alert(res.data);
      });
    } else {
        alert("Escreva alguma resposta")
    }
  }
  return (
    <>
      <MdKeyboardBackspace className="back" onClick={() => history(-1)} />
      <div className="center">
        <div className="t-container">
          <h1>{pergunta.pergunta}</h1>
        </div>
        <textarea
          id="text-area-r"
          cols="30"
          rows="10"
          placeholder="Escrever uma resposta:"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button onClick={sendRes} className="btn-sendRes">
          Responder
        </button>
      </div>

      {respostas.map((resposta) => (
        <div className="resposta-screen">
          <p>{resposta.resposta}</p>
          <RiEmotionHappyFill className="thank" />
        </div>
      ))}
    </>
  );
}

export default PerguntaScreen;
