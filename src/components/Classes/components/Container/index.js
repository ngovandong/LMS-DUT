/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import Card from "../Card/index";
import { createDialogAtom, joinDialogAtom } from "../../../../utils/atoms";
import { useRecoilState } from "recoil";
import {
  ContainerStyle,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  EmptyActions,
  CreateButton,
  JoinButton,
} from "./styles";

export default function Container({ classes = [] }) {
  return (
    <ContainerStyle aria-label="Your classes">
      {classes.length === 0 ? (
        <NoClass />
      ) : (
        classes.map((item) => <Card key={item.id} data={item} />)
      )}
    </ContainerStyle>
  );
}

function NoClass() {
  const [, setJoin] = useRecoilState(joinDialogAtom);
  const [, setCreate] = useRecoilState(createDialogAtom);

  return (
    <EmptyState>
      <EmptyIcon aria-hidden="true">📚</EmptyIcon>
      <EmptyTitle>No classes yet</EmptyTitle>
      <EmptyDescription>
        Create a new class or join one with a code to see your courses here.
      </EmptyDescription>
      <EmptyActions>
        <CreateButton type="button" onClick={() => setCreate(true)}>
          Create class
        </CreateButton>
        <JoinButton type="button" onClick={() => setJoin(true)}>
          Join class
        </JoinButton>
      </EmptyActions>
    </EmptyState>
  );
}
