import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.MessageContent ??=
    await webpack.waitForProps<Types.MessageContent>("memoizeMessageProps");
  Modules.MessageContentGenertor ??= await webpack.waitForProps<Types.MessageContentGenertor>(
    "renderAutomodMessageMarkup",
  );
};

export default Modules;
