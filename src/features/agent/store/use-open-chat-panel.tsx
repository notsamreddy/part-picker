import { atom, useAtom } from "jotai";

const chatPanelState = atom(false);

export const useOpenChatPanel = () => {
  return useAtom(chatPanelState);
};
