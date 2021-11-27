import React, { useState, useEffect } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import {
  Wrapper,
  Header,
  Avatar,
  Informations,
  PostOwner,
  DateOfPost,
  Description,
} from "./styles";

import Comments from "../Comments";
import InputComment from "../InputComment";
import getTime from "../../../../funtions/getRelativeTime";
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const comments = props.data.comments;
  const [hasMore, setHasmore] = useState(comments.length > 1);
  const [listDisplay, setListDisplay] = useState([]);
  useEffect(() => {
    if (hasMore) {
      const list = [];
      list.push(comments[comments.length - 1]);
      setListDisplay(list);
    } else {
      setListDisplay(comments);
    }
  }, [comments]);

  function handleClick() {
    setHasmore(false);
    setListDisplay(comments);
  }
  return (
    <>
      <Wrapper>
        <Header>
          <Avatar src={props.data.authorImg} />

          <Informations>
            <PostOwner>{props.data.authorName}</PostOwner>
            <DateOfPost>{getTime(props.data.date)}</DateOfPost>
          </Informations>
        </Header>

        <Description> {props.data.message} </Description>
        {hasMore && (
          <IconButton onClick={handleClick} style={{ marginLeft: "20px" }}>
            <Badge
              badgeContent={comments.length - listDisplay.length}
              color="primary"
            >
              <CommentIcon style={{ color: "#999" }} />
            </Badge>
          </IconButton>
        )}
        {listDisplay.map((item, index) => (
          <Comments key={index} data={item} />
        ))}

        <InputComment announceID={props.announceID} />
      </Wrapper>
    </>
  );
};
