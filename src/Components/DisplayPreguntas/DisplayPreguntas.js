import React from "react";
import { Header, List, Pagination } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import {
  MainContainer,
  ListaItem,
} from "../DisplayPreguntas/EstilosDisplayPreguntas";
import { Link } from "react-router-dom";

const DisplayPreguntas = ({
  preguntasAleatorias,
  onPageChange,
  total,
  page,
}) => {
  return (
    <MainContainer>
      <List>
        {preguntasAleatorias.map((pregunta) => (
          <List.Item style={ListaItem} key={pregunta.pregid}>
            <List.Icon>
              <i className="question icon"></i>
            </List.Icon>
            <List.Content>
              <Link
                key={pregunta.pregid}
                to={`/respuesta/${pregunta.pregid}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Header style={{ marginBottom: "0.5em" }}>
                  {pregunta.pregtexto}
                </Header>
              </Link>
              <List.Description>{pregunta.pregdetalle}</List.Description>
              <br />
              <Link
                to={`/categorias?catid=${pregunta.catid}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                {pregunta.catnombre}
              </Link>
            </List.Content>
          </List.Item>
        ))}
      </List>
      <div
        style={{
          display: "flex",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <Pagination
          onPageChange={onPageChange}
          pointing
          secondary
          activePage={page}
          totalPages={total}
        />
      </div>
    </MainContainer>
  );
};

export default DisplayPreguntas;
