import React, { useState, useEffect, useMemo } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import {
  Wrapper,
  Header,
  Avatar,
  Informations,
  PostOwner,
  DateOfPost,
  Description,
  CommentsSection,
  ShowCommentsButton,
  CommentCount,
} from "./styles";

import Comments from "../Comments";
import InputComment from "../InputComment";
import getTime from "../../../../funtions/getRelativeTime";

export default function CardPost({ announceID, data }) {
  const comments = useMemo(() => data.comments || [], [data.comments]);
  const [hasMore, setHasMore] = useState(comments.length > 1);
  const [listDisplay, setListDisplay] = useState([]);

  useEffect(() => {
    if (comments.length > 1) {
      setHasMore(true);
      setListDisplay([comments[comments.length - 1]]);
    } else {
      setHasMore(false);
      setListDisplay(comments);
    }
  }, [comments]);

  function handleShowAllComments() {
    setHasMore(false);
    setListDisplay(comments);
  }

  const hiddenCount = comments.length - listDisplay.length;

  return (
    <Wrapper aria-label={`Post by ${data.authorName}`}>
      <Header>
        <Avatar src={data.authorImg} alt="" aria-hidden="true" />
        <Informations>
          <PostOwner>{data.authorName}</PostOwner>
          <DateOfPost dateTime={new Date(data.date).toISOString()}>
            {getTime(data.date)}
          </DateOfPost>
        </Informations>
      </Header>

      <Description>{data.message}</Description>

      <CommentsSection aria-label="Comments">
        {hasMore && hiddenCount > 0 && (
          <ShowCommentsButton
            type="button"
            onClick={handleShowAllComments}
            aria-label={`Show ${hiddenCount} more ${hiddenCount === 1 ? "comment" : "comments"}`}
          >
            <CommentIcon style={{ fontSize: "1rem" }} aria-hidden="true" />
            Show more comments
            <CommentCount aria-hidden="true">{hiddenCount}</CommentCount>
          </ShowCommentsButton>
        )}

        {listDisplay.map((item, index) => (
          <Comments key={`${item.date}-${index}`} data={item} />
        ))}

        <InputComment announceID={announceID} />
      </CommentsSection>
    </Wrapper>
  );
}
