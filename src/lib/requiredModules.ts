import { webpack } from "replugged";
import Types from "../types";

export const Modules: Types.Modules = {};

Modules.loadModules = async (): Promise<void> => {
  Modules.MessageContent ??= await webpack
    .waitForModule<Types.MessageContent>(webpack.filters.bySource(".Messages.MESSAGE_EDITED,"), {
      timeout: 10000,
    })
    .catch(() => {
      throw new Error("Failed To Find MessageContent Module");
    });

  Modules.MessageContentGenertor ??= await webpack
    .waitForModule<Types.MessageContentGenertor>(
      webpack.filters.bySource(".parseAutoModerationSystemMessage,"),
      {
        timeout: 10000,
      },
    )
    .catch(() => {
      throw new Error("Failed To Find MessageContentGenertor Module");
    });
};

export default Modules;
