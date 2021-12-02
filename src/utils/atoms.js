import { atom } from "recoil";

const joinDialogAtom = atom({
  key: "joinDialogAtom",
  default: false,
});

const createDialogAtom = atom({
  key: "createDialogAtom",
  default: false,
});
const addDoc = atom({
  key: "addDoc",
  default: false,
});
const menu = atom({
  key: "menu",
  default: [true, false, false, false],
});
const errorDialogAtom = atom({
  key: "errorDialogAtom",
  default: false,
});
const errorMessage = atom({
  key: "errorMessage",
  default: "",
});
const updateClassDialog = atom({
  key: "updateClassDialog",
  default: false,
});


export {
  createDialogAtom,
  joinDialogAtom,
  menu,
  errorDialogAtom,
  errorMessage,
  addDoc,
  updateClassDialog
};
