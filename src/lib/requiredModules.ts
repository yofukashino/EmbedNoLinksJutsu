import { webpack } from "replugged";
import Types from "../types";
export const MessageContent = webpack.getByProps<Types.MessageContent>("memoizeMessageProps");
export const MessageContentGenertor = webpack.getByProps<Types.MessageContentGenertor>(
  "renderAutomodMessageMarkup",
);
