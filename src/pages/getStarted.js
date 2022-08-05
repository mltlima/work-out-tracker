import React from "react";
import styled from "styled-components";

export default function GetStarted() {

    return(
        <Container>
            <CentralDiv>
                <h1>Workout Tracker</h1>
            </CentralDiv>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: blue;
`
const CentralDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50vw;
    background-color: white;
`