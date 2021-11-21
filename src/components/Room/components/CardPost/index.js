import React from 'react';

// ICONS
// import { IoMdLink } from 'react-icons/io'

// IMPORTING STYLES
import { Wrapper , Header , Avatar , Informations, PostOwner
       , DateOfPost , Description } from './styles'

// COMPONENTS
import Comments from '../Comments'
import InputComment from '../InputComment'
import getTime from '../../../../funtions/getRelativeTime'

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {

  const comments = props.data.comments;

  return (
    <>
    <Wrapper>
      <Header>
        <Avatar src={props.data.authorImg}/>

        <Informations>

          <PostOwner>{props.data.authorName}</PostOwner>
          <DateOfPost>{getTime(props.data.date)}</DateOfPost>
        </Informations>

        {/* <ButtonCopyLink>
          <IoMdLink size={25} color="#4e4e4e" />
        </ButtonCopyLink> */}
      </Header>

      <Description> {props.data.message}  </Description>

      {comments.map( (item,index) => <Comments key={index} data={item} /> )}

      {/* <Comments />
      <Comments />
      <Comments /> */}

      <InputComment announceID={props.announceID}/>
    </Wrapper>
    </>
  );
}
