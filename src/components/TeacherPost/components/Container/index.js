import React,  { useState }  from 'react';
import styled from 'styled-components';

// COMPONENTS
import CardPost from '../CardPost/'
import NextTask from '../NextTask'

// REQUEST COMMENTS
import api from '../../../../services/posts'


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100% ;
  margin: 0 auto;
`;



// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

  const [post, setPost] = useState(api);

  const postOfIndex = post[props.id-1];

  console.log(postOfIndex);


  return (
    <>
    <Wrapper>
      <NextTask />

      {/* BUSCANDO POST COM ID_SUBJECT IGUAL AO ID PASSADO NA URL COMO PARAMETRO */}
      <div style={{width:"75%"}}>
      {postOfIndex.map((item) => (item.id_subject == props.id) ? <CardPost key={item.id_subject} data={item}/>  : "" )}
      </div>
    </Wrapper>
    </>
  );
}
